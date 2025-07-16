"use client";
import { Examination } from "@/generated/prisma";
import { Flex, TextField } from "@radix-ui/themes";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { examinationTypes } from "../../_components/appConstants";
import ButtonAddToFieldsArray from "../../_components/ui/ButtonAddToFieldsArray";
import ButtonRemoveFromFieldsArray from "../../_components/ui/ButtonRemoveFromFieldsArray";
import ButtonSaveNotes from "./ButtonSaveNotes";

interface Props {
  examinations: Examination[];
  id: string; // consultation id
  slug: string; // /api/consultation/[id]
}

const ConsultationExaminationForm = ({ examinations, id, slug }: Props) => {
  const { register, control, getValues } = useForm({
    defaultValues: examinations
      ? { examinations }
      : { examinations: [{ examination: "", findings: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "examinations",
  });

  const getCurrentFormData = () => {
    const currentData = getValues("examinations");
    return { examination: currentData };
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {fields.map((field, index) => (
          <Flex key={field.id} gap="2" mb="2" className="items-center">
            <select
              {...register(`examinations.${index}.examination`)}
              className="w-[200px] h-5.5 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:purple-500 focus:border-purple-500 bg-white"
              defaultValue={field.examination}
            >
              <option value="">Select Examination</option>
              {examinationTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <TextField.Root
              size="1"
              type="text"
              {...register(`examinations.${index}.findings`)}
              placeholder="Result"
              className="flex-1 p-2 border rounded"
            />
            <ButtonRemoveFromFieldsArray onClick={() => remove(index)} />
          </Flex>
        ))}
      </form>

      <Flex direction="column" gap="2" className="mt-4">
        <ButtonAddToFieldsArray
          onClick={() => {
            append({
              examination: "",
              findings: "",
            });
          }}
          buttonText="Add Examination"
        />
        <ButtonSaveNotes fieldData={getCurrentFormData()} id={id} slug={slug} />
      </Flex>
    </>
  );
};

export default ConsultationExaminationForm;
