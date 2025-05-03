"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Registration } from "@prisma/client";
import { Button, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Form } from "radix-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import {
  genderOptions,
  // mr_intermediate, // Removed if not used
  // mr_type, // Removed if not used
  refineMRN,
} from "../../_components/appConstants";
import { InputGeneric, SelectInput } from "../../_components/FormComponents";
import RegistrationSuccessDialog from "./RegistrationSuccessDialog";

const validation = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  gender: z.string().nonempty("please select"),
  phone_number: z.string().min(10),
  mr_number: z.string().min(3), // Keep basic validation
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
    setValue,
    setError, // <-- Import setError
    clearErrors, // <-- Import clearErrors
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validation),
  });

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
    // Optionally re-validate MRN on submit in case it wasn't blurred
    try {
      if (data.mr_number) {
        // Only refine if there's a value
        const refined = refineMRN(data.mr_number);
        // If refineMRN modifies the value, update it before submitting
        if (refined !== data.mr_number) {
          data.mr_number = refined; // Mutate data directly before sending
        }
      }
      clearErrors("mr_number"); // Clear any previous errors before submitting
      if (registration) {
        editMutation.mutate(data); // Ensure editMutation is used for updates
      } else mutation.mutate(data);
    } catch (error: any) {
      setError("mr_number", {
        type: "custom",
        message: error.message || "Invalid MRN format",
      });
      toast.error(error.message || "Invalid MRN format"); // Show toast as well
    }
  };

  return (
    <>
      <Toaster />
      <RegistrationSuccessDialog isDialogOpen={} id={0} />
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="border p-6 shadow-md rounded-md max-w-md mx-auto"
      >
        {/* <TextInput
          label={"First Name"}
          name={"first_name"}
          type={"text"}
          register={register}
          errorMessage={errors.first_name?.message?.toString() || ""}
          placeholder={"First Name"}
          defaultValue={registration?.first_name}
        /> */}
        <InputGeneric
          name={"first_name"}
          label={"First Name"}
          errorMessage={errors.first_name?.message || ""}
        >
          <TextField.Root type="text" {...register("first_name")} />
        </InputGeneric>
        <InputGeneric name={"last_name"} label={"Last Name"} errorMessage={""}>
          <TextField.Root
            type="text"
            {...register("last_name")}
            defaultValue={registration?.last_name}
          />
        </InputGeneric>
        {/* <TextInput
          label={"Last Name"}
          name={"last_name"}
          type={"text"}
          register={register}
          errorMessage={errors.last_name?.message?.toString() || ""}
          placeholder={"Last Name"}
          defaultValue={registration?.last_name}
        /> */}
        <SelectInput
          label="Gender"
          name="gender"
          control={control}
          options={genderOptions}
          errorMessage={errors.gender?.message?.toString() || ""}
          placeholder="Select Gender"
          // defaultValue prop removed, use defaultValues in useForm
        />

        <InputGeneric
          name={"phone_number"}
          label={"Phone Number"}
          errorMessage={errors.phone_number?.message || ""}
        >
          <TextField.Root type="text" {...register("phone_number")} />
        </InputGeneric>

        <InputGeneric
          name={"mr_number"}
          label={"Medical Record Number"}
          errorMessage={errors.mr_number?.message?.toString() || ""}
        >
          <TextField.Root
            type="text"
            // Register the field
            {...register("mr_number")}
            // Handle blur event for validation/refinement
            onBlur={(e) => {
              const value = e.target.value;
              if (!value) {
                // If field is empty, clear errors and value
                clearErrors("mr_number");
                setValue("mr_number", "");
                return;
              }
              try {
                const refinedValue = refineMRN(value);
                // Set the potentially refined value
                setValue("mr_number", refinedValue, { shouldValidate: true }); // Trigger validation
                // Clear any previous custom errors if refinement succeeds
                clearErrors("mr_number");
              } catch (error: any) {
                // Set error message from refineMRN function
                setError("mr_number", {
                  type: "custom",
                  message: error.message || "Invalid MRN format",
                });
              }
            }}
            // Clear custom error when user starts typing again
            onChange={(e) => {
              if (errors.mr_number?.type === "custom") {
                clearErrors("mr_number");
              }
              // Allow default RHF change handling to proceed
            }}
          />
        </InputGeneric>

        {/* <TextInput
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
        /> */}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
            ? "Submitting ..."
            : registration
            ? "Update Registration"
            : "Create Registration"}
        </Button>
      </Form.Root>
    </>
  );
};

export default RegistrationForm;
