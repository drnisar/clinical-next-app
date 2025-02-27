"use client";
import { ConsultationMedications } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import {
  Box,
  Button,
  Card,
  Flex,
  Table,
  TextField,
  Select,
} from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import { Select } from "radix-ui";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  drugForms,
  drugRoutes,
  drugsFrequency,
  intervals,
} from "../../_components/appConstants";

type FormData = ConsultationMedications;
const MedsForm = ({ visit_id }: { visit_id?: number }) => {
  const { register, reset, handleSubmit, control } = useForm<FormData>();

  const queryClient = useQueryClient();

  const { data: meds } = useQuery({
    queryKey: ["meds"],
    queryFn: async () => {
      const response = await axios.get("/api/consult_med/" + visit_id);
      return response.data;
    },
    staleTime: 1000,
  });
  const [medsArray, setMedsArray] = useState<FormData[]>([]);

  const addMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("/api/consult_med", data);
      return response.data.newMed;
    },
    onSuccess: (newMedWithId) => {
      setMedsArray((prev) => [...prev, newMedWithId]);
      queryClient.invalidateQueries({ queryKey: ["meds", visit_id] });
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteMed = useMutation({
    mutationFn: async (consult_med_id: string) => {
      await axios.delete(
        `/api/consult_med/${visit_id}?consult_med_id=${consult_med_id}`
      );
      setMedsArray(
        medsArray.filter(
          (med) => med.consult_med_id !== parseInt(consult_med_id)
        )
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["meds", visit_id] }),
    onError: (error) => {
      console.log(error);
    },
  });

  const addMed = useCallback(
    (data: FormData) => {
      addMutation.mutate(data);
      queryClient.invalidateQueries({ queryKey: ["meds"] });
    },
    [addMutation, visit_id]
  );

  const removeMed = useCallback(
    (consult_med_id: string) => {
      deleteMed.mutate(consult_med_id);
    },
    [deleteMed]
  );

  useEffect(() => {
    if (meds) {
      setMedsArray(meds);
    }
  }, [meds]);

  return (
    <Card mt="2">
      <Form onSubmit={handleSubmit(addMed)}>
        <Flex gap="2" mb="5">
          <Box className="invisible">
            <TextField.Root
              size="1"
              hidden
              {...register("consult_med_id", { valueAsNumber: true })}
            />
            <TextField.Root
              size="1"
              hidden
              defaultValue={visit_id}
              {...register("visit_id", { valueAsNumber: true })}
            />
          </Box>
          <TextField.Root
            size="1"
            {...register("drug_name")}
            placeholder="Drug Name"
          />
          <TextField.Root
            size="1"
            placeholder="Quantity"
            type="number"
            defaultValue={0}
            {...register("quantity", { valueAsNumber: true })}
          />
          <Controller
            control={control}
            name="drug_form"
            render={({ field: { onChange, value } }) => (
              <Select.Root
                onValueChange={onChange}
                value={value || undefined}
                size="1"
                defaultValue="Form"
              >
                <Select.Trigger>{value || "Form"}</Select.Trigger>
                <Select.Content>
                  {drugForms.map((form) => (
                    <Select.Item value={form.value} key={form.value}>
                      {form.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />

          <Controller
            control={control}
            name="frequency"
            render={({ field: { onChange, value } }) => (
              <Select.Root
                onValueChange={onChange}
                value={value || undefined}
                size="1"
                defaultValue="Frequency"
              >
                <Select.Trigger>{value || "Frequency"}</Select.Trigger>

                <Select.Content>
                  {drugsFrequency.map((freq) => (
                    <Select.Item value={freq.value} key={freq.value}>
                      {freq.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
          <Controller
            control={control}
            name="route"
            render={({ field: { onChange, value } }) => (
              <Select.Root
                onValueChange={onChange}
                value={value || undefined}
                size="1"
                defaultValue="Route"
              >
                <Select.Trigger>{value || "Route"}</Select.Trigger>
                <Select.Content>
                  {drugRoutes.map((route) => (
                    <Select.Item value={route.value} key={route.value}>
                      {route.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
          <TextField.Root
            size="1"
            placeholder="Duration"
            defaultValue={0}
            type="number"
            {...register("duration", { valueAsNumber: true })}
          />
          <Controller
            control={control}
            name="interval"
            render={({ field: { onChange, value } }) => (
              <Select.Root
                onValueChange={onChange}
                value={value || undefined}
                size="1"
                defaultValue="Interval"
              >
                <Select.Trigger>{value || "Interval"}</Select.Trigger>
                <Select.Content>
                  {intervals.map((interval) => (
                    <Select.Item value={interval.value} key={interval.value}>
                      {interval.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />

          {/* <TextField.Root
            size="1"
            placeholder="interval"
            {...register("interval")}
          /> */}
          <TextField.Root
            size="1"
            placeholder="instructions"
            {...register("instructions")}
          />

          <Button size="2" variant="ghost" type="submit">
            Add
          </Button>
        </Flex>
      </Form>
      <Table.Root size="1" variant="surface">
        {/* <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S.No</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell hidden>Med_id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell hidden>Visit_id</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell>Medication</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Form</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Frequency</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Route</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Duration</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Interval</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Instructions</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header> */}
        <Table.Body>
          {medsArray.length !== 0 ? (
            medsArray.map((med: FormData, index: number) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}. </Table.Cell>
                <Table.Cell hidden>{med.consult_med_id.toString()}</Table.Cell>
                <Table.Cell hidden>{med.visit_id?.toString()}</Table.Cell>
                <Table.Cell>{med.drug_name.toUpperCase()}</Table.Cell>
                <Table.Cell>{med.quantity?.toString()}</Table.Cell>
                <Table.Cell>{med.drug_form}</Table.Cell>
                <Table.Cell>{med.frequency}</Table.Cell>
                <Table.Cell>{med.route}</Table.Cell>
                <Table.Cell>{med.duration?.toString()}</Table.Cell>
                <Table.Cell>{med.interval}</Table.Cell>
                <Table.Cell>{med.instructions}</Table.Cell>
                <Table.Cell>
                  <Button
                    size="2"
                    variant="ghost"
                    onClick={() => removeMed(med.consult_med_id.toString())}
                  >
                    Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell>No Medications</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default MedsForm;
