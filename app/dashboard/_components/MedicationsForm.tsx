"use client";
import { Medication, MedsTemplate } from "@/generated/prisma";
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
import AddToMedsTemplateDialog from "./AddToMedsTemplateDialog";
import MedsTemplateSelectionDialog from "./MedsTemplateSelectionDialog";
import { useCallback } from "react";

interface Props {
  slug: string; // /api/consultation/[id]
  id: string;
  medications: Medication[];
  templates: MedsTemplate[];
  //   defDrugs?: Medication[];
}

const MedicationsForm = ({ id, slug, medications, templates }: Props) => {
  const { control, register, getValues, watch, reset } = useForm({
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
    return { medications: currentData };
  };

  const { drugs: drugsArray } = watch();

  const handleTemplateSelect = useCallback((templates: MedsTemplate[]) => {
    if (!templates || templates.length === 0) return;
    // For example, use the first template in the array
    const template = templates[0];
    if (!template || !template.meds || template.meds.length === 0) return;
    console.log("Selected Template:", template.meds);
    reset({
      drugs: template.meds.map((drug) => ({
        drug_name: drug.drug_name,
        drug_dose: drug.drug_dose,
        amount: drug.amount,
        drug_form: drug.drug_form,
        route: drug.route,
        frequency: drug.frequency,
        duration: drug.duration,
        interval: drug.interval,
        instructions: drug.instructions || "",
      })),
    });
  }, []);

  return (
    <>
      <MedsTemplateSelectionDialog
        templates={templates}
        onTemplateSelect={handleTemplateSelect}
      />
      <form onSubmit={(e) => e.preventDefault()}>
        {fields.map((field, index) => (
          <Flex
            gap="2"
            key={field.id}
            my="2"
            className="flex-1 align-middle flex-col md:flex-row items-start justify-between medications-table"
          >
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
          <AddToMedsTemplateDialog drugsArray={drugsArray} />
        </Flex>
      </form>
    </>
  );
};

export default MedicationsForm;
