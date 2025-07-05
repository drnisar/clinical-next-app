"use client";
import { Medication } from "@/generated/prisma";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useFieldArray, useForm } from "react-hook-form";
import ButtonSaveNotes from "../consultation/_components/ButtonSaveNotes";
import { SelectInput } from "./FormComponents";
import {
  drugForms,
  drugRoutes,
  drugsFrequency,
  intervals,
} from "./appConstants";

interface Props {
  slug: string; // /api/consultation/[id]
  id: string;
  medications: Medication[];
  //   defDrugs?: Medication[];
}

const MedicationsForm = ({ id, slug, medications }: Props) => {
  const { control, register, getValues } = useForm({
    defaultValues: {
      drugs: medications,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "drugs",
  });

  const getCurrentFormData = () => {
    const currentData = getValues("drugs");
    console.log("Current Form Data:", currentData);
    return { medications: currentData };
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {fields.map((field, index) => (
          <Flex gap="2" key={field.id} my="2" className="flex-1 align-middle">
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

            <Cross2Icon
              onClick={() => remove(index)}
              className="w-5 h-5 font-bold text-red-500 bg-none align-middle items-center cursor-pointer"
            />
          </Flex>
        ))}
        <Flex gap="2" mt="2" direction="column">
          <Button
            type="button"
            variant="ghost"
            color="green"
            onClick={() =>
              append({
                drug_name: "",
                drug_dose: "",
                amount: 1,
                drug_form: "",
                route: "",
                frequency: "",
                duration: 0,
                interval: "",
                instructions: "",
              })
            }
          >
            <PlusIcon /> Add Medication
          </Button>

          <ButtonSaveNotes
            fieldData={getCurrentFormData()}
            id={id}
            slug={slug}
            // className="w-full max-w-none"
          />
        </Flex>
      </form>
    </>
  );
};

export default MedicationsForm;
