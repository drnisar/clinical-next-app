"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { SelectInput, TextInput } from "../../_components/FormComponents";
import { Registration } from "@prisma/client";
import { genderOptions } from "../../_components/appConstants";

const validation = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  gender: z.string().nonempty("please select"),
  phone_number: z.string().min(10),
  mr_number: z.string().min(3),
});

type FormData = z.infer<typeof validation>;

const RegistrationForm = ({
  registration,
}: {
  registration?: Registration;
}) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validation),
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return axios.post("/api/registration", data);
    },
    onSuccess: () => {
      toast.success("Registration Successful", {
        duration: 4000,
        position: "top-center",
      });
      // alert("Registration Successful");
      router.push("/dashboard/registration");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: FormData) => {
      return axios.patch(
        `/api/registration/${registration?.registration_id}`,
        data
      );
    },
    onSuccess: () => {
      toast.success("Registration Updated", {
        duration: 4000,
        position: "top-center",
      });
      router.push("/dashboard/registration");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    },
  });

  const onSubmit = (data: FormData) => {
    if (registration) editMutation.mutate(data);
    else mutation.mutate(data);
  };
  return (
    <>
      <Toaster />
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="border p-6 shadow-md rounded-md max-w-md mx-auto"
      >
        <TextInput
          label={"First Name"}
          name={"first_name"}
          type={"text"}
          register={register}
          errorMessage={errors.first_name?.message?.toString() || ""}
          placeholder={"First Name"}
          defaultValue={registration?.first_name}
        />
        <TextInput
          label={"Last Name"}
          name={"last_name"}
          type={"text"}
          register={register}
          errorMessage={errors.last_name?.message?.toString() || ""}
          placeholder={"Last Name"}
          defaultValue={registration?.last_name}
        />
        <SelectInput
          label="Gender"
          name="gender"
          control={control}
          options={genderOptions}
          errorMessage={errors.gender?.message?.toString() || ""}
          placeholder="Select Gender"
          defaultValue={registration?.gender || ""}
        />

        <TextInput
          label={"Phone Number"}
          name={"phone_number"}
          type={"text"}
          placeholder={"Enter Phone Number"}
          errorMessage={errors.phone_number?.message?.toString() || ""}
          register={register}
          defaultValue={registration?.phone_number || ""}
        />

        <TextInput
          label="MR Number"
          name="mr_number"
          type="text"
          placeholder="Enter MR Number"
          register={register}
          errorMessage={errors.mr_number?.message?.toString() || ""}
          defaultValue={registration?.mr_number || ""}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
            ? "Submitting ..."
            : registration
            ? "Update"
            : "Submit"}
        </Button>
      </Form.Root>
    </>
  );
};

export default RegistrationForm;
