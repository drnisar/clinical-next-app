"use client";
import { ConsultationMedications } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import MedsAddToTemplateDialog from "./MedsAddToTemplateDialog";

type Med = ConsultationMedications;

const MedsTable = ({ visit_id }: { visit_id: number }) => {
  const { data: meds, isPending } = useQuery({
    queryKey: ["meds"],
    queryFn: async () => {
      const response = await axios.get("/api/consult_med/" + visit_id);

      return response.data;
    },
    staleTime: 1000,
  });

  const queryClient = useQueryClient();

  const deleteMed = useMutation({
    mutationFn: async (consult_med_id: number) => {
      const response = await axios.delete(
        "/api/consult_med/" + visit_id + "?consult_med_id=" + consult_med_id
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meds"] });
    },
  });
  const removeMed = async (consult_med_id: number) => {
    console.log(consult_med_id);
    await deleteMed.mutateAsync(consult_med_id);
  };
  if (isPending) return <div>Loading...</div>;
  if (meds.length === 0) return <div>No meds</div>;
  const enhancedMeds = meds.map((med: Med) => ({ ...med, visit_id: visit_id }));
  return (
    <>
      <Table.Root size="1" variant="surface">
        <Table.Body>
          {enhancedMeds.map((med: Med) => (
            <Table.Row key={med.consult_med_id}>
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
                  onClick={() => removeMed(med.consult_med_id)}
                >
                  Remove
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {meds.length > 2 && <MedsAddToTemplateDialog medsArray={enhancedMeds} />}
    </>
  );
};

export default MedsTable;
