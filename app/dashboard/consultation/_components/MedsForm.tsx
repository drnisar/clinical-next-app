"use client";
import { ConsultationMedications } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import {
  Box,
  Button,
  Flex,
  Grid,
  Select as RadixSelect,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import { Select } from "radix-ui";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  drugForms,
  drugRoutes,
  drugsFrequency,
  intervals,
} from "../../_components/appConstants";
import AddMedsDialog from "../../medications/_components/AddMedsDialog";
import MedsTable from "./MedsTable";
import MedsTemplateDropDown from "./MedsTemplateDropDown";

type FormData = ConsultationMedications;
type MedName = { drug_id: number; full_name: string; value: string };

const MedsForm = ({ visit_id }: { visit_id?: number }) => {
  const { register, reset, handleSubmit, control } = useForm<FormData>();

  const queryClient = useQueryClient();

  const { data: medicines } = useQuery({
    queryKey: ["medsNames"],
    queryFn: async () => {
      const response = await axios.get("/api/medicines");

      const options = response.data.map((med: { full_name: string }) => ({
        value: med.full_name,
        label: med.full_name,
      }));

      return options;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("/api/consult_med", data);
      return response.data.newMed;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meds"] });
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addMed = useCallback(
    (data: FormData) => {
      addMutation.mutate(data);
      queryClient.invalidateQueries({ queryKey: ["meds"] });
    },
    [addMutation, queryClient]
  );

  return (
    <Box mt="2">
      <Grid columns={"5"}>
        <Flex direction="column" gap="4" className="col-span-2 p-3">
          <Form onSubmit={handleSubmit(addMed)} className="col-span-2">
            <Flex gap="2" mb="5" direction={"column"}>
              <div className="hidden">
                <TextField.Root
                  size="1"
                  {...register("consult_med_id", { valueAsNumber: true })}
                />
                <TextField.Root
                  size="1"
                  defaultValue={visit_id}
                  {...register("visit_id", { valueAsNumber: true })}
                />
              </div>

              <Controller
                control={control}
                name="drug_name"
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={medicines}
                    value={medicines?.find((c: MedName) => c.value === value)}
                    onChange={(val) => onChange(val!.value)}
                  />
                )}
              />
              <Flex gap="1">
                <TextField.Root
                  size="1"
                  placeholder="Quantity"
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                />
                <Controller
                  control={control}
                  name="drug_form"
                  render={({ field: { onChange, value } }) => (
                    <RadixSelect.Root
                      onValueChange={onChange}
                      value={value || undefined}
                      size="1"
                      defaultValue="Form"
                    >
                      <RadixSelect.Trigger>
                        {value || "Form"}
                      </RadixSelect.Trigger>
                      <RadixSelect.Content>
                        {drugForms.map((form) => (
                          <RadixSelect.Item value={form.value} key={form.value}>
                            {form.label}
                          </RadixSelect.Item>
                        ))}
                      </RadixSelect.Content>
                    </RadixSelect.Root>
                  )}
                />
                <Controller
                  control={control}
                  name="frequency"
                  render={({ field: { onChange, value } }) => (
                    <RadixSelect.Root
                      onValueChange={onChange}
                      value={value || undefined}
                      size="1"
                      defaultValue="Frequency"
                    >
                      <RadixSelect.Trigger>
                        {value || "Frequency"}
                      </RadixSelect.Trigger>
                      <RadixSelect.Content>
                        {drugsFrequency.map((freq) => (
                          <RadixSelect.Item value={freq.value} key={freq.value}>
                            {freq.label}
                          </RadixSelect.Item>
                        ))}
                      </RadixSelect.Content>
                    </RadixSelect.Root>
                  )}
                />
                <Controller
                  control={control}
                  name="route"
                  render={({ field: { onChange, value } }) => (
                    <RadixSelect.Root
                      onValueChange={onChange}
                      value={value || undefined}
                      size="1"
                      defaultValue="Route"
                    >
                      <RadixSelect.Trigger>
                        {value || "Route"}
                      </RadixSelect.Trigger>
                      <RadixSelect.Content>
                        {drugRoutes.map((route) => (
                          <RadixSelect.Item
                            value={route.value}
                            key={route.value}
                          >
                            {route.label}
                          </RadixSelect.Item>
                        ))}
                      </RadixSelect.Content>
                    </RadixSelect.Root>
                  )}
                />
                <TextField.Root
                  size="1"
                  placeholder="Duration"
                  // defaultValue={0}
                  type="number"
                  {...register("duration", { valueAsNumber: true })}
                />
                <Controller
                  control={control}
                  name="interval"
                  render={({ field: { onChange, value } }) => (
                    <RadixSelect.Root
                      onValueChange={onChange}
                      value={value || undefined}
                      size="1"
                      defaultValue="Interval"
                    >
                      <RadixSelect.Trigger>
                        {value || "Interval"}
                      </RadixSelect.Trigger>
                      <RadixSelect.Content>
                        {intervals.map((interval) => (
                          <RadixSelect.Item
                            value={interval.value}
                            key={interval.value}
                          >
                            {interval.label}
                          </RadixSelect.Item>
                        ))}
                      </RadixSelect.Content>
                    </RadixSelect.Root>
                  )}
                />
              </Flex>
              <TextField.Root
                size="1"
                placeholder="instructions"
                {...register("instructions")}
              />
              <Button size="2" variant="soft" type="submit">
                Add
              </Button>
            </Flex>
          </Form>
          <Box>
            <Text color="teal">OR SELECT FROM PREDEFINED TEMPLATES BELOW</Text>
            <MedsTemplateDropDown visit_id={visit_id!} />
          </Box>
          <AddMedsDialog />
        </Flex>
        <Box className="col-span-3 p-3">
          <MedsTable visit_id={visit_id!} />
        </Box>
      </Grid>
    </Box>
  );
};

export default MedsForm;
