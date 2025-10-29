"use client";
import React, { useEffect } from "react";
import { Badge, Flex, Table } from "@radix-ui/themes";
import ButtonEditPage from "../../_components/ButtonEditPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Consultation } from "@/generated/prisma";
import SelectConsultationStatus from "../../_components/SelectConsultationStatus";
import { useConsultationStatus } from "../../_components/ConsultationStore";

// Updated function to handle both string and Date inputs
export const calculateAgeFromDate = (
  date: Date | string | null | undefined
) => {
  if (!date) return null;

  try {
    // Convert string to Date if necessary
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Check if date is valid
    if (isNaN(dateObj.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - dateObj.getFullYear();
    const monthDifference = today.getMonth() - dateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dateObj.getDate())
    ) {
      age--;
    }

    return age;
  } catch (error) {
    console.error("Error calculating age:", error);
    return null;
  }
};

type consultationWithRegistration = Consultation & {
  registration: {
    first_name: string;
    last_name: string;
    date_of_birth: Date | string; // Updated to handle both types
    gender: string;
    mr_number: string;
  };
};

const TodaysConsultationsTable = () => {
  const { status } = useConsultationStatus();
  const consultations = useQuery({
    queryKey: ["consultations", "today"],
    queryFn: async () => {
      const res = await axios.get<consultationWithRegistration[]>(
        "/api/consultation/today"
      );
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minute
  });

  useEffect(() => {
    console.log(consultations.data);
  }, [consultations.data]);

  if (consultations.isLoading) {
    return <p>Loading consultations...</p>;
  }

  if (consultations.error) {
    return <p>Error loading consultations. Please try again.</p>;
  }
  const filteredConsultations =
    status === "ALL"
      ? consultations.data
      : consultations.data?.filter(
          (consultation) => consultation.status === status
        );
  return (
    <>
      <SelectConsultationStatus />

      {filteredConsultations?.length === 0 ? (
        <p>No consultations for today.</p>
      ) : (
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
            {filteredConsultations?.map((consultation, index) => {
              const age = calculateAgeFromDate(
                consultation.registration.date_of_birth
              );

              return (
                <Table.Row key={consultation.consultation_id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    {consultation.registration.first_name}{" "}
                    {consultation.registration.last_name}
                  </Table.Cell>
                  <Table.Cell>{age !== null ? age : "N/A"}</Table.Cell>
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
              );
            })}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};

export default TodaysConsultationsTable;
