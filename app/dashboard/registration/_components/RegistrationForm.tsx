"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Registration } from "@prisma/client";
import { Button, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { genderOptions } from "../../_components/appConstants";
import { InputGeneric, SelectInput } from "../../_components/FormComponents";
import RegistrationSuccessDialog from "./RegistrationSuccessDialog";
import { useState } from "react";

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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validation),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [regId, setRegId] = useState<number>();

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return axios.post("/api/registration", data);
    },
    onSuccess: (response) => {
      toast.success("Registration Successful", {
        duration: 4000,
        position: "top-center",
      });
      setIsDialogOpen(true);
      setRegId(response.data.registration_id);
      // alert("Registration Successful");
      // router.push("/dashboard/registration");
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
      setIsDialogOpen(true);
      setRegId(registration?.registration_id);
      // router.push("/dashboard/registration");
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
      <RegistrationSuccessDialog isDialogOpen={isDialogOpen} id={regId} />
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="border p-6 shadow-md rounded-md max-w-md mx-auto"
      >
        <InputGeneric
          name={"first_name"}
          label={"First Name"}
          errorMessage={""}
        >
          <TextField.Root
            type="text"
            {...register("first_name")}
            defaultValue={registration?.first_name}
          />
        </InputGeneric>
        <InputGeneric name={"last_name"} label={"Last Name"} errorMessage={""}>
          <TextField.Root
            type="text"
            {...register("last_name")}
            defaultValue={registration?.last_name}
          />
        </InputGeneric>

        <SelectInput
          label="Gender"
          name="gender"
          control={control}
          options={genderOptions}
          errorMessage={errors.gender?.message?.toString() || ""}
          placeholder="Select Gender"
          defaultValue={registration?.gender || ""}
        />

        <InputGeneric
          name={"phone_number"}
          label={"Phone Number"}
          errorMessage={""}
        >
          <TextField.Root
            type="text"
            {...register("phone_number")}
            defaultValue={registration?.phone_number || ""}
          />
        </InputGeneric>

        <InputGeneric name={"mr_number"} label={"MR Number"} errorMessage={""}>
          <TextField.Root
            type="text"
            {...register("mr_number")}
            defaultValue={registration?.mr_number || ""}
          />
        </InputGeneric>
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
