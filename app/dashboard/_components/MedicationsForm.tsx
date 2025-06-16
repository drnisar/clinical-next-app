"use client";
import toast, { Toaster } from "react-hot-toast";
import { Medication } from "@/generated/prisma";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SelectInput } from "./FormComponents";
import {
  drugForms,
  drugRoutes,
  drugsFrequency,
  intervals,
} from "./appConstants";
import { useRouter } from "next/navigation";

interface Props {
  slug: string; // /api/consultation/[id]
  id: string;
  //   defDrugs?: Medication[];
}

const MedicationsForm = ({ id, slug }: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    data: medicationsData,
    isSuccess,
    isError,
    error,
    isPending: loadingMedications,
  } = useQuery({
    queryKey: ["medications", id],
    queryFn: async () => {
      const response = await axios.get(`${slug}/${id}`);
      return response.data.medications ?? [];
    },
  });

  //   const router = useRouter();

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      drugs: medicationsData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "drugs",
  });

  useEffect(() => {
    if (isSuccess && medicationsData) {
      console.log("Fetched Medications:", medicationsData);
      reset({ drugs: medicationsData });
    }
    if (isError) {
      console.error("Error fetching medications:", error);
    }
  }, [isSuccess, medicationsData, reset, isError, error]);
  type Medications = Medication[];

  const mutation = useMutation({
    mutationFn: async (data: { medications: Medications }) =>
      await axios.patch(`${slug}/${id}`, data),
    onSuccess: (response) => {
      toast.success("Medications updated successfully");

      const updatedMedications =
        response?.data?.consultation?.medications || [];
      reset({ drugs: updatedMedications });
      queryClient.invalidateQueries({
        queryKey: ["medications", id],
      });
    },
    onError: (error) => {
      console.error("Error updating drugs:", error);
      toast.error("Failed to update drugs. Please try again.");
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const formattedData = { medications: data.drugs };
    console.log("Submitted Data:", formattedData);

    mutation.mutate(formattedData);
    router.refresh();
  };

  return (
    <>
      <Toaster />
      {mutation.isPending || (loadingMedications && <p>Loading...</p>)}
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Flex gap="2" key={field.id} my="2" className="flex-1">
            <TextField.Root
              {...register(`drugs.${index}.drug_name`)}
              placeholder="Drug Name"
              size="1"
              className="uppercase"
            />
            <TextField.Root
              {...register(`drugs.${index}.drug_dose`)}
              placeholder="Dose"
              size="1"
              className="w-20"
            />
            <TextField.Root
              type="number"
              {...register(`drugs.${index}.amount`, {
                valueAsNumber: true,
              })}
              placeholder="Amount"
              size="1"
              className="w-20"
            />

            <SelectInput
              //   label={""}
              name={`drugs.${index}.drug_form`}
              options={drugForms}
              control={control}
              size="1"
              className="min-w-20"
              placeholder="Form"
            />

            <SelectInput
              //   label={""}
              name={`drugs.${index}.route`}
              options={drugRoutes}
              control={control}
              size="1"
              className="w-20"
              placeholder="Route"
            />
            <SelectInput
              //   label={""}
              name={`drugs.${index}.frequency`}
              options={drugsFrequency}
              control={control}
              size="1"
              className="w-20"
              placeholder="Frequency"
            />
            <TextField.Root
              type="number"
              {...register(`drugs.${index}.duration`, {
                valueAsNumber: true,
              })}
              placeholder="Duration"
              size="1"
              className="w-20"
            />
            <SelectInput
              //   label={""}
              name={`drugs.${index}.interval`}
              options={intervals}
              control={control}
              size="1"
              className="min-w-20"
              placeholder="Interval"
            />
            <Button
              size="1"
              variant="soft"
              onClick={() => remove(index)}
              type="button"
            >
              Remove
            </Button>
          </Flex>
        ))}
        <Flex gap="2" mt="2">
          <Button
            type="button"
            variant="soft"
            color="green"
            size="1"
            onClick={() =>
              append({
                drug_name: "",
                drug_dose: "",
                amount: "",
                drug_form: "",
                route: "",
                frequency: "",
                duration: "",
                interval: "",
                instructions: "",
              })
            }
          >
            Add Medication
          </Button>
          <Button variant="soft" size="1" type="button" onClick={() => reset()}>
            Reset
          </Button>
        </Flex>
        <Flex direction={"column"} gap="2" mt="4">
          {mutation.isPending && <p>Saving...</p>}
          {mutation.isError && <p>Error updating medications.</p>}
          {mutation.isSuccess && <p>Medications updated successfully!</p>}
          <Button
            variant="soft"
            color="red"
            type="submit"
            disabled={mutation.isPending}
            className="max-w-[100px]"
          >
            {mutation.isPending ? "Saving..." : "Save Medications"}
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default MedicationsForm;
