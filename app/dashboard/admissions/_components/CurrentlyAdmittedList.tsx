"use client";
import { Admission_Discharge, Registration } from "@prisma/client";
import { Badge, Table } from "@radix-ui/themes";

type Admission = Admission_Discharge & { Registration: Registration };

interface Props {
  admissions: Admission[];
}

const CurrentlyAdmittedList = ({ admissions }: Props) => {
  const badgeColor = (admissionMode: string) => {
    switch (admissionMode) {
      case "SEHAT CARD":
        return "green";
      case "IBP":
        return "blue";
      case "EMERGENCY":
        return "red";
      default:
        return "gray";
    }
  };
  return (
    <>
      <Table.Root>
        <Table.Body>
          {admissions.length > 0 &&
            admissions.map((admission: Admission) => (
              <Table.Row key={admission.admission_id}>
                <Table.Cell>
                  {admission.Registration?.first_name}{" "}
                  {admission.Registration?.last_name}
                </Table.Cell>
                <Table.Cell>{admission.Registration?.gender}</Table.Cell>
                <Table.Cell>{admission.Registration?.mr_number}</Table.Cell>
                <Table.Cell>
                  {admission.admission_date?.toLocaleDateString("en-gb")}
                </Table.Cell>
                <Table.Cell>
                  {admission.ward} {admission.bed_number}
                </Table.Cell>
                <Table.Cell>
                  <Badge color={badgeColor(admission.admission_mode!)}>
                    {admission.admission_mode}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{admission.admission_plan}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default CurrentlyAdmittedList;
