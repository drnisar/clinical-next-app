"use client";
import React from "react";
import { Badge, Box, Button, Card, Flex, Table, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ButtonEditPage from "../../_components/ButtonEditPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Consultation } from "@/generated/prisma";
import SelectConsultationStatus from "../../_components/SelectConsultationStatus";
import { useConsultationStatus } from "../../_components/ConsultationStore";

// Updated function to handle both string and Date inputs
export const calculateAgeFromDate = (
  date: Date | string | null | undefined,
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

const statusColor = (status: string) =>
  status === "COMPLETED"
    ? "green"
    : status === "IN_PROGRESS"
      ? "blue"
      : "orange";

const TodaysConsultationsTable = () => {
  const { status, setStatus } = useConsultationStatus();
  const consultations = useQuery({
    queryKey: ["consultations", "today"],
    queryFn: async () => {
      const res = await axios.get<consultationWithRegistration[]>(
        "/api/consultation/today",
      );
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60,
  });

  if (consultations.isLoading) {
    return <p>Loading consultations...</p>;
  }

  if (consultations.error) {
    return (
      <Flex direction="column" align="center" gap="3" py="6">
        <Text color="red">Couldn&apos;t load today&apos;s patients.</Text>
        <Button variant="soft" onClick={() => consultations.refetch()}>
          Try again
        </Button>
      </Flex>
    );
  }

  if (!consultations.data?.length) {
    return (
      <Card size="3">
        <Flex direction="column" align="center" gap="3" py="4">
          <Text size="4" weight="bold">
            No patients in today&apos;s clinic yet
          </Text>
          <Text size="2" color="gray" align="center">
            Find a registered patient and add them to today&apos;s queue from
            their page, or register a new patient.
          </Text>
          <Flex gap="3" wrap="wrap" justify="center">
            <Button asChild>
              <Link href="/dashboard/registration">
                <MagnifyingGlassIcon /> Find a patient
              </Link>
            </Button>
            <Button asChild variant="soft">
              <Link href="/dashboard/registration/new">
                <PlusIcon /> Register new patient
              </Link>
            </Button>
          </Flex>
        </Flex>
      </Card>
    );
  }
  const filteredConsultations =
    status === "ALL"
      ? consultations.data
      : consultations.data?.filter(
          (consultation) => consultation.status === status,
        );
  return (
    <>
      <SelectConsultationStatus />

      {filteredConsultations?.length === 0 ? (
        <Flex direction="column" align="center" gap="2" py="5">
          <Text color="gray">
            No {status.toLowerCase().replace("_", " ")} patients today.
          </Text>
          <Button size="1" variant="soft" onClick={() => setStatus("ALL")}>
            Show all
          </Button>
        </Flex>
      ) : (
        <>
          {/* Cards: phones and small screens (below the sm breakpoint, 768px) */}
          <Flex
            direction="column"
            gap="2"
            mt="3"
            display={{ initial: "flex", sm: "none" }}
          >
            {filteredConsultations?.map((consultation, index) => {
              const {
                first_name,
                last_name,
                gender,
                mr_number,
                date_of_birth,
              } = consultation.registration;
              const age = calculateAgeFromDate(date_of_birth);
              return (
                <Card key={consultation.consultation_id} size="1">
                  <Flex direction="column" gap="2">
                    <Flex justify="between" align="start" gap="2">
                      <Text
                        weight="bold"
                        size="3"
                        style={{ wordBreak: "break-word" }}
                      >
                        {index + 1}. {first_name} {last_name}
                      </Text>
                      <Badge
                        color={statusColor(consultation.status)}
                        variant="soft"
                        style={{ flexShrink: 0 }}
                      >
                        {consultation.status}
                      </Badge>
                    </Flex>
                    <Flex justify="between" align="center" gap="2" wrap="wrap">
                      <Text size="2" color="gray">
                        {age !== null ? `${age} yrs` : "Age N/A"} · {gender} ·
                        MRN {mr_number}
                      </Text>
                      <ButtonEditPage params={consultation.consultation_id} />
                    </Flex>
                  </Flex>
                </Card>
              );
            })}
          </Flex>

          {/* Table: tablets and larger */}
          <Box display={{ initial: "none", sm: "block" }}>
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
                    consultation.registration.date_of_birth,
                  );

                  return (
                    <Table.Row key={consultation.consultation_id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>
                        {consultation.registration.first_name}{" "}
                        {consultation.registration.last_name}
                      </Table.Cell>
                      <Table.Cell>{age !== null ? age : "N/A"}</Table.Cell>
                      <Table.Cell>
                        {consultation.registration.gender}
                      </Table.Cell>
                      <Table.Cell>
                        {consultation.registration.mr_number}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          color={statusColor(consultation.status)}
                          variant="soft"
                        >
                          {consultation.status}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Flex justify="end">
                          <ButtonEditPage
                            params={consultation.consultation_id}
                          />
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Root>
          </Box>
        </>
      )}
    </>
  );
};

export default TodaysConsultationsTable;
