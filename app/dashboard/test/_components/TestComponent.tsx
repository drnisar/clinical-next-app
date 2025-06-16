"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import { useForm, useFieldArray } from "react-hook-form";

interface Props {
  submit: (data: FormData) => void;
}

const TestComponent = ({ submit }: Props) => {
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      drugs: [
        {
          drug_name: "",
          drug_dose: "",
          amount: "",
          drug_form: "",
          route: "",
          frequency: "",
          duration: "",
          interval: "",
          instructions: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "drugs",
  });

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data);
    submit(data);
    reset(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Flex gap="2" key={field.id} mb="2">
          <TextField.Root
            {...register(`drugs.${index}.drug_name`)}
            placeholder="Drug Name"
            size="1"
          />
          <TextField.Root
            {...register(`drugs.${index}.drug_dose`)}
            placeholder="Dose"
            size="1"
          />
          <TextField.Root
            {...register(`drugs.${index}.amount`)}
            placeholder="Amount"
            size="1"
          />
          <TextField.Root
            {...register(`drugs.${index}.drug_form`)}
            placeholder="Form"
            size="1"
          />
          <TextField.Root
            {...register(`drugs.${index}.route`)}
            placeholder="Route"
            size="1"
          />
          <TextField.Root
            {...register(`drugs.${index}.frequency`)}
            placeholder="Frequency"
            size="1"
          />
          <TextField.Root
            {...register(`drugs.${index}.duration`)}
            placeholder="Duration"
            size="1"
          />
          <TextField.Root
            {...register(`drugs.${index}.interval`)}
            placeholder="Interval"
            size="1"
          />
          <Button size="1" variant="soft" onClick={() => remove(index)}>
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
          Add Drug
        </Button>
        <Button variant="soft" size="1" type="submit">
          Submit
        </Button>
        <Button variant="soft" size="1" type="button" onClick={() => reset()}>
          Reset
        </Button>
      </Flex>
    </form>
  );
};

export default TestComponent;
