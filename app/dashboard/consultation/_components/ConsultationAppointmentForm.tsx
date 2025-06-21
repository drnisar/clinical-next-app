"use client";
import { Box, Button, Flex, Select, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { appointmentTypeOptions } from "../../_components/appConstants";
import { Appointment } from "@/generated/prisma";
import { Form } from "@radix-ui/react-form";
import { InputGeneric } from "../../_components/FormComponents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ConsultationAppointmentsTable from "./ConsultationAppointmentsTable";

type FormData = Omit<Appointment, "registration_id" | "visit_id">;

const ConsultationAppointmentForm = ({
  registration_id,
  visit_id,
}: {
  registration_id: number;
  visit_id: number;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [type, setType] = useState("");

  //   const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: addMutate, isPending } = useMutation({
    mutationFn: async (data: FormData) =>
      await axios.post("/api/appointment", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      reset();
    },
    onError: () => alert("Error adding appointment"),
  });

  const { data: appointmentsData } = useQuery({
    queryKey: ["appointments", registration_id],
    queryFn: async () => {
      const response = await axios.get(`/api/appointment`);
      return response.data;
    },
  });

  const { data: registrationsData } = useQuery({
    queryKey: ["registrations", registration_id],
    queryFn: async () => {
      const response = await axios.get(`/api/registration`);
      return response.data;
    },
  });

  const filteredAppointments = appointmentsData?.filter(
    (appointment: Appointment) => appointment.type === type
  );

  const onSubmit = (data: FormData) => {
    const submissionData = { visit_id, registration_id, ...data };
    addMutate(submissionData);
    // console.log(submissionData);
  };

  const onReset = () => {
    setType("");
    reset();
  };
  return (
    <>
      <Flex justify="between">
        <Flex gap="2" p="5">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputGeneric
              name="type"
              label="Type"
              errorMessage={(errors && errors.type?.message) || ""}
            >
              <Controller
                control={control}
                name="type"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Select.Root
                      onValueChange={(newValue) => {
                        setType(newValue);
                        onChange(newValue);
                      }}
                      value={value}
                    >
                      <Select.Trigger placeholder={`options`} />

                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Options</Select.Label>
                          {appointmentTypeOptions.map((option) => (
                            <Select.Item
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  );
                }}
              />
            </InputGeneric>
            <InputGeneric
              name={"date_appointment"}
              label={"Date"}
              errorMessage={(errors && errors.date_appointment?.message) || ""}
            >
              <TextField.Root
                type="date"
                {...register("date_appointment")}
                className="w-full"
              />
            </InputGeneric>
            <InputGeneric
              name="plan"
              label="Plan"
              errorMessage={(errors && errors.plan?.message) || ""}
            >
              <TextField.Root {...register("plan")} />
            </InputGeneric>
            <InputGeneric
              name="Notes"
              label="Notes"
              errorMessage={(errors && errors.notes?.message) || ""}
            >
              <TextField.Root {...register("notes")} />
            </InputGeneric>
            <Flex gap="4">
              <Button
                type="submit"
                color="blue"
                variant="soft"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>

              <Button
                type="button"
                color="gray"
                variant="soft"
                onClick={onReset}
              >
                Reset
              </Button>
            </Flex>
          </Form>
          <Box>{/* <DataListAppointmentSingleVisitId /> */}</Box>
        </Flex>
        <ConsultationAppointmentsTable
          appointments={filteredAppointments}
          registrations={registrationsData}
        />
      </Flex>
    </>
  );
};

export default ConsultationAppointmentForm;
