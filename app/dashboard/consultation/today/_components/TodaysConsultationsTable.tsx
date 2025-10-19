"use client";
import React from "react";
import { useConsultations } from "../../_components/ConsultationStore";
import { Badge, Flex, Table } from "@radix-ui/themes";
import ButtonEditPage from "../../_components/ButtonEditPage";

export const calculateAgeFromDate = (date: Date) => {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDifference = today.getMonth() - date.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < date.getDate())
  ) {
    age--;
  }
  return age;
};

const TodaysConsultationsTable = () => {
  const consultations = useConsultations();
  return (
    <>
      {consultations.consultations.length === 0 ? (
        <p>No consultations for today.</p>
      ) : (
        //
        <Table.Root size="1">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>S No</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Patient Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Age</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>MRN</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {consultations.consultations.map((consultation, index) => (
              <Table.Row key={consultation.consultation_id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  {consultation.registration.first_name}{" "}
                  {consultation.registration.last_name}
                </Table.Cell>
                <Table.Cell>
                  {consultation.registration.date_of_birth &&
                    calculateAgeFromDate(
                      consultation.registration.date_of_birth
                    )}
                </Table.Cell>
                <Table.Cell>{consultation.registration.gender}</Table.Cell>
                <Table.Cell>{consultation.registration.mr_number}</Table.Cell>
                <Table.Cell>
                  <Badge
                    color={
                      consultation.status === "COMPLETED"
                        ? "green"
                        : consultation.status === "IN_PROGRESS"
                        ? "blue"
                        : "orange"
                    }
                    variant="soft"
                  >
                    {consultation.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Flex justify="end">
                    <ButtonEditPage params={consultation.consultation_id} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};

export default TodaysConsultationsTable;
