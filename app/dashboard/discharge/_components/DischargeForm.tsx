"use client";

import { Admission_Discharge } from "@prisma/client";
import { Button, Flex, Select, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import {
  dischargeModes,
  dischargeStatuses,
} from "../../_components/appConstants";
import { InputGeneric } from "../../_components/FormComponents";
import { useState } from "react";

type discharge = Admission_Discharge;

interface Props {
  admission: Admission_Discharge;
}

const DischargeForm = ({ admission }: Props) => {
  const { control, register, handleSubmit } = useForm<discharge>();

  const addMutation = useMutation({
    mutationKey: ["discharge"],
    mutationFn: async (data: discharge) => {
      const response = await axios.patch(
        "/api/admission/" + admission.admission_id,
        data
      );
      return response.data;
      //   console.log(data);
    },
  });
  const onSubmit = (data: discharge) => {
    // console.log("sumission datat", data);
    addMutation.mutate(data);
  };
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {!showForm && <div>{JSON.stringify(admission)}</div>}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap="5">
            <InputGeneric
              name="status"
              label="Discharge Status"
              errorMessage=""
            >
              <Controller
                name="status"
                control={control}
                defaultValue={admission?.status}
                render={({ field: { value, onChange } }) => (
                  <Select.Root onValueChange={onChange} value={value || ""}>
                    <Select.Trigger placeholder="Select Discharge Status">
                      {value || ""}
                    </Select.Trigger>
                    <Select.Content>
                      {dischargeStatuses.map((status) => (
                        <Select.Item key={status.value} value={status.value}>
                          {status.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </InputGeneric>
            <InputGeneric
              name="discharge_mode"
              label="Discharge Mode"
              errorMessage=""
            >
              <Controller
                name="discharge_mode"
                control={control}
                defaultValue={admission.discharge_mode}
                render={({ field: { value, onChange } }) => (
                  <Select.Root onValueChange={onChange} value={value || ""}>
                    <Select.Trigger placeholder="Select Discharge Status">
                      {value || ""}
                    </Select.Trigger>
                    <Select.Content>
                      {dischargeModes.map((mode) => (
                        <Select.Item key={mode.value} value={mode.value}>
                          {mode.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </InputGeneric>
          </Flex>
          <InputGeneric
            name="discharge_date"
            label="Discharge Date"
            errorMessage=""
          >
            <TextField.Root
              type="datetime-local"
              defaultValue="23/03/2025, 10:33 PM"
              {...register("discharge_date", { valueAsDate: true })}
            />
          </InputGeneric>
          <Button variant="soft" type="submit">
            Save
          </Button>
        </form>
      )}
      <Button onClick={() => setShowForm(!showForm)} variant="ghost">
        {showForm ? "Close" : "Edit"}
      </Button>
    </>
  );
};

export default DischargeForm;
