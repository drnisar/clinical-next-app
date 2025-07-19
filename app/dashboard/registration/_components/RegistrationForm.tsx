"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Registration } from "@/generated/prisma";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Form } from "radix-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  calculateAge,
  calculateDateOfBirth,
  genderOptions,
  // mr_intermediate, // Removed if not used
  // mr_type, // Removed if not used
  refineMRN,
} from "../../_components/appConstants";
import { InputGeneric, SelectInput } from "../../_components/FormComponents";
import RegistrationSuccessDialog from "./RegistrationSuccessDialog";
import { usePathname, useRouter } from "next/navigation";

const validation = z.object({
  first_name: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  last_name: z.string().min(3),
  gender: z.string().nonempty("please select"),
  phone_number: z.string().optional(),
  code: z.string().min(1),
  mr_number: z.string().min(3), // Keep basic validation
  date_of_birth: z.string().optional(), // Optional field for date of birth
  age: z.string().optional(),
});

type FormData = z.infer<typeof validation>;

const RegistrationForm = ({
  registration,
}: {
  registration?: Registration;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [reg, setReg] = useState<Registration | null>(registration || null);

  const initialAge = registration?.date_of_birth
    ? calculateAge(registration.date_of_birth.toISOString().split("T")[0])
    : "";
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError, // <-- Import setError
    clearErrors, // <-- Import clearErrors
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validation),
    defaultValues: {
      first_name: registration?.first_name || "",
      last_name: registration?.last_name || "",
      gender: registration?.gender || "",
      code: registration?.code || "+92",
      phone_number: registration?.phone_number || "0000000000",
      mr_number: registration?.mr_number || "",
      date_of_birth: registration?.date_of_birth
        ? registration.date_of_birth.toISOString().split("T")[0]
        : "",
      age: initialAge, // Optional field for age, calculated from date_of_birth
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [regId, setRegId] = useState<string>("");

  // const watchedDateOfBirth = watch("date_of_birth");
  // const watchedAge = watch("age");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return axios.post("/api/registration", data);
    },
    onSuccess: (response) => {
      toast.success("Registration Successful", {
        duration: 4000,
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      queryClient.invalidateQueries({ queryKey: ["registration"] });
      router.refresh();
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
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      queryClient.invalidateQueries({
        queryKey: ["registration", registration?.registration_id],
      });
      router.refresh();
      setIsDialogOpen(true);
      setRegId(response.data.registration_id);
      setReg(response.data); // Update local state with updated registration data
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { age, ...submissionData } = data;
    try {
      if (registration) {
        editMutation.mutate(submissionData); // Ensure editMutation is used for updates
      } else mutation.mutate(submissionData);
    } catch (error) {
      console.error(error);
    }
  };

  const searchByField = async (mrNumber: string) => {
    if (!mrNumber?.trim()) {
      toast.error("Please enter a valid MRN");
      return;
    }

    try {
      const response = await axios.get(`/api/registration/search/${mrNumber}`);

      // if (
      //   response.data &&
      //   Array.isArray(response.data) &&
      //   response.data.length > 0
      // ) {
      const regData = response.data[0] as Registration;

      if (!regData?.registration_id) {
        toast.error("Invalid registration data received");
        return;
      }

      console.log("Registration found:", regData);
      if (pathname === "/dashboard/registration/new") {
        // Only show success message if on the new registration page
        // Show success message first
        toast.success("Registration already exists", {
          duration: 2000,
        });

        // Navigate after a short delay
        setTimeout(() => {
          const targetPath = `/dashboard/registration/${regData.registration_id}`;
          console.log("Navigating to:", targetPath);
          // router.push(targetPath);
          setIsDialogOpen(true);
          setRegId(regData.registration_id);
          setReg(regData); // Update local state with found registration data
          // Reset form values to the found registration dat
        }, 1000);
      }
    } catch (error) {
      console.error("Search error:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error fetching registration"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
      reset();
    }
  };

  return (
    <>
      <RegistrationSuccessDialog
        isDialogOpen={isDialogOpen}
        id={regId}
        regDataForDialog={{
          first_name: reg?.first_name + " " + reg?.last_name || "",
          mr_number: reg?.mr_number || "",
        }}
      />
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="border p-6 shadow-md rounded-md max-w-md mx-auto"
      >
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
                // toast.success(JSON.stringify(refinedValue));
                searchByField(refinedValue);
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
        <InputGeneric
          name={"first_name"}
          label={"First Name"}
          errorMessage={errors.first_name?.message || ""}
        >
          <TextField.Root
            type="text"
            {...register("first_name")}
            className="uppercase"
          />
        </InputGeneric>
        <InputGeneric name={"last_name"} label={"Last Name"} errorMessage={""}>
          <TextField.Root
            type="text"
            {...register("last_name")}
            className="uppercase"
          />
        </InputGeneric>
        <Flex gap="2">
          <InputGeneric
            name={"date_of_birth"}
            label={"Date of Birth"}
            errorMessage={""}
          >
            <TextField.Root
              type="date"
              {...register("date_of_birth")}
              onChange={(e) => {
                const newDateOfBirth = e.target.value;
                setValue("date_of_birth", newDateOfBirth);
                if (newDateOfBirth) {
                  const calculatedAge = calculateAge(newDateOfBirth);
                  setValue("age", calculatedAge);
                } else {
                  setValue("age", ""); // Clear age if date of birth is empty
                }
              }}
            />
          </InputGeneric>

          <InputGeneric
            name={"age"}
            label={"Age (Years)"}
            errorMessage={errors.age?.message || ""}
          >
            <TextField.Root
              type="number"
              placeholder="Enter age in years"
              {...register("age")}
              onChange={(e) => {
                const newAge = e.target.value;
                setValue("age", newAge);

                // Auto-calculate and update date of birth when age changes
                if (
                  newAge &&
                  !isNaN(Number(newAge)) &&
                  Number(newAge) >= 0 &&
                  Number(newAge) <= 120
                ) {
                  const calculatedDOB = calculateDateOfBirth(newAge);
                  setValue("date_of_birth", calculatedDOB);
                } else if (!newAge) {
                  // Clear date of birth if age is cleared
                  setValue("date_of_birth", "");
                }
              }}
              onBlur={(e) => {
                const age = e.target.value;
                if (
                  age &&
                  (isNaN(Number(age)) || Number(age) < 0 || Number(age) > 120)
                ) {
                  setError("age", {
                    type: "manual",
                    message: "Please enter a valid age between 0 and 120",
                  });
                } else {
                  clearErrors("age");
                }
              }}
            />
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
        </Flex>

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
        <Flex justify="end" mt="4" gap="2">
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
          <Button
            type="button"
            disabled={mutation.isPending || editMutation.isPending}
            color="gray"
            onClick={() => reset()}
          >
            Clear Form
          </Button>
        </Flex>
      </Form.Root>
    </>
  );
};

export default RegistrationForm;
