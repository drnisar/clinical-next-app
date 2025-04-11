"use client";
import { Discharge_Medications } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import MedsAddToTemplateDialog from "./MedsAddToTemplateDialog";

type Med = Discharge_Medications;

const DischargeMedsTable = ({
  dischargeMeds,
}: {
  dischargeMeds: Discharge_Medications[];
}) => {
  const queryClient = useQueryClient();

  const deleteMed = useMutation({
    mutationFn: async (dc_meds_id: number) => {
      const response = await axios.delete("/api/admission/discharge_meds", {
        data: { dc_meds_id: dc_meds_id }, // Put the data inside the config object
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dischargeMeds"] });
    },
  });
  const removeMed = async (dc_meds_id: number) => {
    console.log(dc_meds_id);
    await deleteMed.mutateAsync(dc_meds_id);
  };
  //   if (isPending) return <div>Loading...</div>;
  //   if (meds.length === 0) return <div>No meds</div>;
  return (
    <>
      <Table.Root size="1" variant="surface">
        <Table.Body>
          {dischargeMeds &&
            dischargeMeds.map((med: Med) => (
              <Table.Row key={med.dc_meds_id}>
                <Table.Cell>{med.med_name.toUpperCase()}</Table.Cell>
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
                    onClick={() => removeMed(med.dc_meds_id)}
                  >
                    Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      {/* {dischargeMeds.length > 2 && (
        <MedsAddToTemplateDialog medsArray={dischargeMeds} />
      )} */}
    </>
  );
};

export default DischargeMedsTable;
