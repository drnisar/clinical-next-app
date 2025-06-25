"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Registration } from "@/generated/prisma";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Form } from "radix-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  code: z.string().min(1),
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
    defaultValues: {
      first_name: registration?.first_name || "",
      last_name: registration?.last_name || "",
      gender: registration?.gender || "",
      code: registration?.code || "+92",
      phone_number: registration?.phone_number || "",
      mr_number: registration?.mr_number || "",
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [regId, setRegId] = useState<number>(0);

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
    onSuccess: (response) => {
      toast.success("Registration Updated", {
        duration: 4000,
        position: "top-center",
      });
      setIsDialogOpen(true);
      setRegId(response.data.registration_id);
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
    try {
      if (registration) {
        editMutation.mutate(data); // Ensure editMutation is used for updates
      } else mutation.mutate(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <RegistrationSuccessDialog isDialogOpen={isDialogOpen} id={regId} />
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="border p-6 shadow-md rounded-md max-w-md mx-auto"
      >
        <InputGeneric
          name={"first_name"}
          label={"First Name"}
          errorMessage={errors.first_name?.message || ""}
        >
          <TextField.Root type="text" {...register("first_name")} />
        </InputGeneric>
        <InputGeneric name={"last_name"} label={"Last Name"} errorMessage={""}>
          <TextField.Root type="text" {...register("last_name")} />
        </InputGeneric>

        <SelectInput
          label="Gender"
          name="gender"
          control={control}
          options={genderOptions}
          errorMessage={errors.gender?.message?.toString() || ""}
          placeholder="Select Gender"
          // defaultValue prop removed, use defaultValues in useForm
        />
        <Flex gap="2">
          <SelectInput
            label="Code"
            name="code"
            control={control}
            options={[
              { value: "+92", label: "+92" },
              { value: "+93", label: "+93" },
            ]}
            errorMessage={""}
            placeholder="Select Code"
          />
          <InputGeneric
            name={"phone_number"}
            label={"Phone Number"}
            errorMessage={errors.phone_number?.message || ""}
          >
            <TextField.Root
              type="text"
              {...register("phone_number")}
              onBlur={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                const refinedPhone = value.replace(/^0+/, ""); // Remove leading zeros;
                setValue("phone_number", refinedPhone, {
                  shouldValidate: true,
                });
              }}
            />
          </InputGeneric>
        </Flex>

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
              } catch (error: unknown) {
                // Set error message from refineMRN function
                if (error instanceof Error) {
                  setError("mr_number", {
                    type: "custom",
                    message: error.message || "Invalid MRN format",
                  });
                } else {
                  setError("mr_number", {
                    type: "custom",
                    message: "An unknown error occurred",
                  });
                }
              }
            }}
            // Clear custom error when user starts typing again
            onChange={() => {
              if (errors.mr_number?.type === "custom") {
                clearErrors("mr_number");
              }
              // Allow default RHF change handling to proceed
            }}
          />
        </InputGeneric>

        <Button
          type="submit"
          disabled={mutation.isPending || editMutation.isPending}
        >
          {mutation.isPending || editMutation.isPending
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
