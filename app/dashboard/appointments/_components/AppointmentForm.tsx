"use client";
import { appointmentSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Appointment } from "@prisma/client";
import { Button, Select } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "radix-ui";
import { Controller, useForm } from "react-hook-form";
import { appointmentTypeOptions } from "../../_components/appConstants";
import { TextInput } from "../../_components/FormComponents";

type FormData = Omit<Appointment, "status">;

const AppointmentForm = ({ registration_id }: { registration_id: number }) => {
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
      router.push("/dashboard/registration/" + registration_id);
      router.refresh();
    },
    onError: () => {
      alert("Error adding appointment");
      console.log(errors);
    },
  });

  const onSubmit = (data: FormData) => {
    addMutation.mutate(data);
  };

  // const typeValueChange = (typeValue: string) => {
  //   router.push(
  //     "/dashboard/appointments/new?registration_id=" +
  //       registration_id +
  //       "&type=" +
  //       typeValue
  //   );
  // };
  return (
    <div>
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="border p-6 shadow-md rounded-md max-w-md mx-auto"
      >
        {/* <SelectInput
          label="Type"
          name="type"
          control={control}
          options={appointmentTypeOptions}
          errorMessage={errors.type?.message?.toString() || ""}
          placeholder="Appointment Type"
          
        /> */}

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => {
            return (
              <Select.Root
                onValueChange={(newValue) => {
                  onChange(newValue);
                  const params = new URLSearchParams(searchParams);
                  params.set("type", newValue);
                  params.set("registration_id", registration_id.toString());
                  router.push(`?${params.toString()}`);
                }}
                value={value}
              >
                <Select.Trigger placeholder={`options`} />

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

        <TextInput
          label="Appointment Date"
          name={"date_appointment"}
          type={"date"}
          placeholder={"Date"}
          errorMessage={errors.date_appointment?.message?.toString() || ""}
          register={() => register("date_appointment")}
        />
        <TextInput
          label="Appointment Plan"
          name={"plan"}
          type={"text"}
          placeholder={"Appointment Plan"}
          errorMessage={errors.plan?.message?.toString() || ""}
          register={() => register("plan")}
        />
        <TextInput
          label="Notes"
          name={"notes"}
          type={"text"}
          placeholder={"Notes"}
          errorMessage={errors.notes?.message?.toString() || ""}
          register={() => register("notes")}
        />
        <TextInput
          label="Registration ID"
          name={"registration_id"}
          type={"number"}
          placeholder={"Registration ID"}
          hidden={true}
          errorMessage={errors.notes?.message?.toString() || ""}
          register={() => register("registration_id", { valueAsNumber: true })}
          defaultValue={registration_id}
        />

        <Button type="submit">Submit</Button>
      </Form.Root>
    </div>
  );
};

export default AppointmentForm;
