"use client";
import { appointmentTypeOptions } from "@/app/dashboard/_components/appConstants";
import { InputGeneric } from "@/app/dashboard/_components/FormComponents";
import { Appointment } from "@/generated/prisma";
import { Button, Flex, Select, TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = Omit<Appointment, "registration_id" | "visit_id">;

interface Props {
  registration_id: string;
  consultation_id?: string;
  type: string;
}

const AppointmentForm = ({ registration_id, consultation_id }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [isPending, setIsPending] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const queryType = params.get("type") || "";

  const onSubmit = async (data: FormData) => {
    try {
      setIsPending(true);
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registration_id, ...data }),
      });

      if (!response.ok) {
        throw new Error("Error adding appointment");
      }
      reset();
      router.refresh();
    } catch (error) {
      console.error("Error adding appointment:", error);
    } finally {
      setIsPending(false);
    }
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
                      `/dashboard/consultation/edit/${consultation_id}?type=${encodeURIComponent(
                        newValue
                      )}`
                    );

                    onChange(newValue);
                  }}
                  value={value}
                >
                  <Select.Trigger>{queryType || "Select Type"}</Select.Trigger>

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

          <Button
            type="button"
            color="gray"
            variant="soft"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default AppointmentForm;
