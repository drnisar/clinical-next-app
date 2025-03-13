"use client";
import { Button, Card, Select, TextField } from "@radix-ui/themes";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { InputGeneric } from "../../_components/FormComponents";
import {
  drugsFormForMedsEntry,
  drugUnitsForMedEntry,
} from "../../_components/appConstants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface MedicationFormData {
  trade_name: string;
  generic_name?: string;
  drug_form: string;
  strength: string;
  unit: string;
}
interface Props {
  setOpen: (open: boolean) => void;
}
const MedsEntryForm = ({ setOpen }: Props) => {
  const { register, handleSubmit, control, reset } =
    useForm<MedicationFormData>();

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async (data: MedicationFormData & { full_name: string }) =>
      await axios.post("/api/medicines", data),
    onSuccess: () => {
      setOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["medsNames"] });
      // queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
    onError: (error) => {
      console.log("Error adding medication", error);
    },
  });

  const onSubmit = (data: MedicationFormData) => {
    const { trade_name, generic_name, drug_form, strength, unit } = data;
    const full_name = (
      trade_name +
      (generic_name && ` (${generic_name})`) +
      ` ${strength} ${unit} ${drug_form}`
    ).toUpperCase();
    const newData = { full_name, ...data };
    addMutation.mutate(newData);
  };
  return (
    <Card className="max-w-sm p-4">
      <h1>Medication Entry Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGeneric
          name={"trade_name"}
          label={"Trade Name"}
          errorMessage={""}
        >
          <TextField.Root
            placeholder="Trade Name"
            {...register("trade_name")}
          />
        </InputGeneric>
        <InputGeneric
          name={"generic_name"}
          label={"Generic Name"}
          errorMessage={""}
        >
          <TextField.Root
            placeholder="Generic Name"
            {...register("generic_name")}
          />
        </InputGeneric>
        <InputGeneric name={"drug_form"} label={"Drug Form"} errorMessage={""}>
          <Controller
            name="drug_form"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select.Root onValueChange={onChange} value={value || ""}>
                <Select.Trigger>{value || "Drug Form Options"}</Select.Trigger>
                <Select.Content>
                  {drugsFormForMedsEntry.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
        </InputGeneric>
        <InputGeneric name={"strength"} label={"Strength"} errorMessage={""}>
          <TextField.Root placeholder="Strength" {...register("strength")} />
        </InputGeneric>
        <InputGeneric
          name={"unit"}
          label={"Unit (e.g. mg, ml)"}
          errorMessage={""}
        >
          <Controller
            name="unit"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select.Root onValueChange={onChange} value={value || ""}>
                <Select.Trigger>{value || "Unit"}</Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Options</Select.Label>
                    {drugUnitsForMedEntry.map((option) => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            )}
          />
        </InputGeneric>
        <Button type="submit" className="btn btn-primary">
          Add
        </Button>
      </form>
    </Card>
  );
};

export default MedsEntryForm;
