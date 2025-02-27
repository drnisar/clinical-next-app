import { ConsultationMedications } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";

interface medsArray {
  meds: ConsultationMedications[];
}

const MedDetailsForSingleVisitId = ({ meds }: medsArray) => {
  return (
    <div>
      <Table.Root>
        <Table.Body>
          {meds.map((med) => (
            <Table.Row key={med.consult_med_id}>
              <Table.Cell>{med.drug_name}</Table.Cell>
              <Table.Cell>{med.frequency}</Table.Cell>
              <Table.Cell>{med.duration}</Table.Cell>
              <Table.Cell>{med.interval}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default MedDetailsForSingleVisitId;
