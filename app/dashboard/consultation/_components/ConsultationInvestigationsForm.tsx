"use client";
import { Investigation } from "@/generated/prisma";
import { Flex, TextField } from "@radix-ui/themes";
import { useFieldArray, useForm } from "react-hook-form";
import ButtonAddToFieldsArray from "../../_components/ui/ButtonAddToFieldsArray";
import ButtonRemoveFromFieldsArray from "../../_components/ui/ButtonRemoveFromFieldsArray";
import ButtonSaveNotes from "./ButtonSaveNotes";
import { investigationsArray } from "../../_components/appConstants";

type Investigations = Investigation[];
interface Props {
  investigations: Investigations;
  slug: string; // /api/consultation/[id]
  id: string; // consultation id
}
const ConsultationInvestigationsForm = ({
  investigations,
  slug,
  id,
}: Props) => {
  const { control, register, getValues } = useForm<{
    investigations: Investigations;
  }>({
    defaultValues: {
      investigations: investigations,
    },
  });
  const { fields, append, remove } = useFieldArray<{
    investigations: Investigations;
  }>({
    control: control,
    name: "investigations",
  });

  const getCurrentFormData = () => {
    const currentData = getValues("investigations");
    console.log("Current Form Data:", currentData);
    return { investigations: currentData };
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {fields.map((field, index) => (
          <Flex key={field.id} gap="2" mb="2" className="items-center">
            <select
              {...register(`investigations.${index}.investigation`)}
              className="w-[200px] h-6 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:purple-500 focus:border-purple-500 bg-white"
            >
              <option value="">Select Investigation</option>
              {investigationsArray.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <TextField.Root
              size="1"
              type="text"
              {...register(`investigations.${index}.result`)}
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
              investigation: "",
              result: "",
            });
          }}
          buttonText="Add Investigation"
        />
        <ButtonSaveNotes fieldData={getCurrentFormData()} id={id} slug={slug} />
      </Flex>
    </>
  );
};

export default ConsultationInvestigationsForm;
