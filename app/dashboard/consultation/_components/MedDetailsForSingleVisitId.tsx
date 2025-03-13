import { ConsultationMedications } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import { translate } from "@/app/dashboard/_components/appConstants";

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
              <Table.Cell>{med.drug_name.toUpperCase()}</Table.Cell>
              <Table.Cell className="text-right">
                {translate(med.interval)}
              </Table.Cell>
              <Table.Cell>{med.duration}</Table.Cell>
              <Table.Cell className="text-right">
                {translate(med.frequency)}
              </Table.Cell>
              <Table.Cell className="text-right">
                {translate(med.route)}
              </Table.Cell>
              <Table.Cell className="text-right">
                {translate(med.drug_form)}
              </Table.Cell>
              <Table.Cell>{med.quantity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default MedDetailsForSingleVisitId;
