"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { InputGeneric } from "../../_components/FormComponents";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { CrossCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import ButtonSaveNotes from "./ButtonSaveNotes";

type Instruction = {
  instruction: string;
};
interface Props {
  instructions: Instruction[];
  slug: string;
  id: string;
}

const InstructionsArray = ({ instructions, slug, id }: Props) => {
  const { register, getValues, control } = useForm<{
    instructions: Instruction[];
  }>({
    defaultValues: {
      instructions: instructions
        ? (instructions as Instruction[])
        : [{ instruction: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "instructions",
  });

  const getCurrentFormData = () => {
    const currentData = getValues("instructions");
    console.log("Current Form Data:", currentData);
    return { instructions: currentData };
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {fields.map((field, index) => (
          <Flex
            key={field.id}
            gap="2"
            align="center"
            width={"100%"}
            justify="between"
          >
            <InputGeneric
              name="instructions"
              label={""}
              errorMessage={""}
              key={field.id}
              className="flex-1"
            >
              <TextField.Root
                key={field.id}
                type="text"
                {...register(`instructions.${index}.instruction`)}
              />
            </InputGeneric>
            <Button type="button" variant="ghost" onClick={() => remove(index)}>
              <CrossCircledIcon className="w-6 h-6 font-bold text-red-500" />
            </Button>
          </Flex>
        ))}
        <Flex direction="column" gap="2" mt="2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => append({ instruction: "" })}
            className="max-w-[100px] px-2"
          >
            <PlusCircledIcon className="w-6 h-6 font-bold text-emerald-500 " />
            Add Instruction
          </Button>

          <ButtonSaveNotes
            fieldData={getCurrentFormData()}
            id={id}
            slug={slug}
          />
        </Flex>
      </form>
    </>
  );
};

export default InstructionsArray;
