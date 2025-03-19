"use client";
import { Box, Button, Flex, Select, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { appointmentTypeOptions } from "../../_components/appConstants";
import { Appointment } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { InputGeneric } from "../../_components/FormComponents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ConsultationAppointmentsTable from "./ConsultationAppointmentsTable";
import AppointmentsForSingleRegId from "../../appointments/_components/AppointmentsForSingleRegId";

type FormData = Omit<Appointment, "registration_id">;

const ConsultationAppointmentForm = ({
  registration_id,
}: {
  registration_id: number;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [type, setType] = useState("");
  const [date, setDate] = useState("");

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

  const onSubmit = (data: FormData) => {
    const submissionData = { registration_id, ...data };
    addMutate(submissionData);
  };

  const onReset = () => {
    setDate("");
    setType("");
    reset();
  };
  return (
    <>
      <Flex>
        <Flex gap="2" direction="column" p="5">
          <Box>
            <AppointmentsForSingleRegId
              appointments={appointmentsData}
              registration_id={registration_id.toString()}
            />
          </Box>
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
                onChange={(e) => setDate(e.target.value)}
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
        </Flex>
        <ConsultationAppointmentsTable
          appointments={
            (appointmentsData &&
              appointmentsData.filter((appointment: FormData) => {
                const appointmentType = type;
                const appointmentDate = date;

                if (!appointmentType || !appointmentDate) return false;

                const isSameType = appointment.type === appointmentType;
                const isSameDate =
                  new Date(appointment.date_appointment)
                    .toISOString()
                    .split("T")[0] ===
                  new Date(appointmentDate).toISOString().split("T")[0];

                return isSameType && isSameDate;
              })) ||
            []
          }
          registrations={registrationsData}
        />
      </Flex>
    </>
  );
};

export default ConsultationAppointmentForm;
