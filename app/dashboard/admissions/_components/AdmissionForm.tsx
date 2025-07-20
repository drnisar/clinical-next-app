"use client";
import {
  Box,
  Button,
  Flex,
  Select,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { InputGeneric } from "../../_components/FormComponents";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { admissionModes } from "../../_components/appConstants";
import { Admission_Discharge } from "@/generated/prisma";
import toast from "react-hot-toast";

type admission = Admission_Discharge;

interface Props {
  registration_id: string;
  onSuccess?: () => void;
}

const AdmissionForm = ({ registration_id, onSuccess }: Props) => {
  const { register, control, handleSubmit } = useForm<admission>();

  const router = useRouter();

  const addMutation = useMutation({
    mutationFn: async (data: admission) =>
      await axios.post("/api/admission", data),
    onMutate: () => {
      toast.success("Admission details added successfully");
      onSuccess?.();
      router.push(`/dashboard/registration/${registration_id}`);
    },
    // onSuccess: (response)=>{
    //   toast.success("Admission details added successfully");
    //   onSuccess?.(response.data);
    //   router.push(`/dashboard/registration/${registration_id}`);
    // }
  });

  const onSubmit = async (data: admission) => {
    const submissionData = { ...data, registration_id, status: "admitted" };
    console.log(submissionData);
    addMutation.mutate(submissionData);
  };
  return (
    <Box maxWidth="500px" m="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={addMutation.isPending}>
          <InputGeneric
            name={""}
            label={"Admission Date and Time"}
            errorMessage={""}
          >
            <TextField.Root
              type="datetime-local"
              {...register("admission_date", { valueAsDate: true })}
            />
          </InputGeneric>
          <Flex gap="5">
            <InputGeneric
              name="admission_mode"
              label="Admission Mode"
              errorMessage=""
              className="min-w-[200px]"
            >
              <Controller
                name="admission_mode"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select.Root onValueChange={onChange} value={value || ""}>
                    <Select.Trigger placeholder="Select Admission Mode">
                      {value || "Select Admission Mode"}
                    </Select.Trigger>
                    <Select.Content>
                      {admissionModes.map((mode) => (
                        <Select.Item key={mode.value} value={mode.value}>
                          {mode.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </InputGeneric>
            <InputGeneric name="bed_number" label="Bed Number" errorMessage="">
              <TextField.Root
                type="number"
                {...register("bed_number", { valueAsNumber: true })}
              />
            </InputGeneric>
            <InputGeneric name="ward" label="Ward" errorMessage="">
              <TextField.Root type="text" {...register("ward")} />
            </InputGeneric>
          </Flex>
          <InputGeneric
            name="admission_plan"
            label="Admission Plan"
            errorMessage=""
          >
            <TextField.Root type="text" {...register("admission_plan")} />
          </InputGeneric>
          <InputGeneric name={""} label={""} errorMessage={""}>
            <Button type="submit" disabled={addMutation.isPending}>
              {addMutation.isPending ? <Spinner /> : "Submit"}
            </Button>
          </InputGeneric>
        </fieldset>
      </form>
    </Box>
  );
};

export default AdmissionForm;
