"use client";
import { appointmentTypeOptions } from "@/app/dashboard/_components/appConstants";
import { InputGeneric } from "@/app/dashboard/_components/FormComponents";
import { Appointment } from "@prisma/client";
import { Button, Flex, Select, TextField } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = Omit<Appointment, "registration_id" | "visit_id">;

interface Props {
  registration_id: number;
  visit_id: number;
  type: string;
}

const AppointmentForm = ({ registration_id, visit_id }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const [type, setType] = useState("");

  const queryClient = useQueryClient();
  const { mutate: addMutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("/api/appointment", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["appointment"] });
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: () => alert("Error adding appointment"),
  });

  const onSubmit = (data: FormData) => {
    const submissionData = { visit_id, registration_id, ...data };
    addMutate(submissionData);
  };

  const onReset = () => {
    setType("");
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    // setType(newValue);
                    router.push(
                      `/dashboard/consultation/edit/${visit_id}?type=${newValue}`
                    );

                    onChange(newValue);
                  }}
                  value={value}
                >
                  <Select.Trigger>{type || "Select Type"}</Select.Trigger>

                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Options</Select.Label>
                      {appointmentTypeOptions.map((option) => (
                        <Select.Item key={option.value} value={option.value}>
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

          <Button type="button" color="gray" variant="soft" onClick={onReset}>
            Reset
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default AppointmentForm;
