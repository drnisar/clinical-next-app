"use client";
import { appointmentSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Select } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "radix-ui";
import { Controller, useForm } from "react-hook-form";
import { appointmentTypeOptions } from "../../_components/appConstants";
import { TextInput } from "../../_components/FormComponents";
import { Appointment } from "@/generated/prisma";

type FormData = Omit<Appointment, "status">;

const AppointmentForm = ({
  registration_id,
  successFn,
}: {
  registration_id: string;
  successFn: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(appointmentSchema) });

  const addMutation = useMutation({
    mutationFn: (data: FormData) => axios.post("/api/appointment", data),
    onSuccess: () => {
      alert("Appointment added successfully");
      successFn();
      // router.push("/dashboard/registration/" + registration_id);
      router.refresh();
    },
    onError: () => {
      alert("Error adding appointment");
      console.log(errors);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(" Subbmittting Form Data:", data);
    // alert("Submitting Form Data: ");
    addMutation.mutate(data);
  };

  return (
    <div>
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="border p-6 shadow-md rounded-md w-full mx-auto"
      >
        <Flex gap="3" align="baseline" className="items-baseline flex-wrap">
          <div className="min-w-0 flex-1">
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-3 leading-none">
                    Type
                  </label>
                  <Select.Root
                    onValueChange={(newValue) => {
                      onChange(newValue);
                      const params = new URLSearchParams(searchParams);
                      params.set("type", newValue);
                      params.set("registration_id", registration_id);
                      router.replace(`?${params}`, { scroll: false });
                    }}
                    value={value}
                  >
                    <Select.Trigger placeholder="Select type" />
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
                </div>
              )}
            />
          </div>

          <div className="min-w-0 flex-1">
            <TextInput
              label="Date"
              name="date_appointment"
              type="date"
              placeholder="Date"
              errorMessage={errors.date_appointment?.message?.toString() || ""}
              register={() => register("date_appointment")}
            />
          </div>

          <div className="min-w-0 flex-1">
            <TextInput
              label="Plan"
              name="plan"
              type="text"
              placeholder="Appointment Plan"
              errorMessage={errors.plan?.message?.toString() || ""}
              register={() => register("plan")}
            />
          </div>

          <div className="min-w-0 flex-1">
            <TextInput
              label="Notes"
              name="notes"
              type="text"
              placeholder="Notes"
              errorMessage={errors.notes?.message?.toString() || ""}
              register={() => register("notes")}
            />
          </div>

          <div className="flex items-end flex-col ">
            <label className="mb-3"></label>
            <Button type="submit" disabled={addMutation.isPending}>
              {addMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>

          <TextInput
            label="Registration ID"
            name="registration_id"
            type="text"
            placeholder="Registration ID"
            hidden={true}
            errorMessage=""
            register={() => register("registration_id")}
            defaultValue={registration_id}
          />
        </Flex>
      </Form.Root>
    </div>
  );
};

export default AppointmentForm;
