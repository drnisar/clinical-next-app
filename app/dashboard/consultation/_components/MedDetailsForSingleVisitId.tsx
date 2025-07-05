import { Table } from "@radix-ui/themes";
import React from "react";
import { translate } from "@/app/dashboard/_components/appConstants";
import { Medication } from "@/generated/prisma";

interface Props {
  meds: Medication[];
}

const MedDetailsForSingleVisitId = ({ meds }: Props) => {
  return (
    <div>
      <Table.Root>
        <Table.Body>
          {meds.map((med, index) => (
            <Table.Row key={med.drug_name}>
              <Table.Cell>{index + 1}.</Table.Cell>
              <Table.Cell>
                {med.drug_name.toUpperCase() + " "}
                {med.drug_dose && med.drug_dose + " "}

                {med.drug_form?.toUpperCase()}
              </Table.Cell>
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
              <Table.Cell>{med.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default MedDetailsForSingleVisitId;
