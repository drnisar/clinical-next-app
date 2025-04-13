"use client";
import { Registration } from "@prisma/client";
import { Button, Flex, Spinner, Table } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";

interface Props {
  registrations: Registration[];
}

const RegistrationsTable = ({ registrations }: Props) => {
  const [isNavigatingEdit, setIsNavigatingEdit] = useState(false);
  const [isNavigatingView, setIsNavigatingView] = useState(false);
  return (
    <>
      <div>Registrations Table</div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone Number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>MR Number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Registered Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {registrations.map((registration) => (
            <Table.Row key={registration.registration_id}>
              <Table.Cell>{registration.first_name}</Table.Cell>
              <Table.Cell>{registration.last_name}</Table.Cell>
              <Table.Cell>{registration.gender}</Table.Cell>
              <Table.Cell>{registration.phone_number}</Table.Cell>
              <Table.Cell>{registration.mr_number}</Table.Cell>
              <Table.Cell>
                {new Date(registration.createdAt).toDateString()}
              </Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  <Link
                    href={`/dashboard/registration/${registration.registration_id}`}
                    prefetch={true}
                  >
                    <Button
                      size={"1"}
                      color="grass"
                      variant="soft"
                      disabled={isNavigatingView}
                      onClick={() => {
                        setIsNavigatingView(true);
                      }}
                    >
                      {isNavigatingView ? <Spinner /> : "View"}
                    </Button>
                  </Link>
                  <Link
                    href={`/dashboard/registration/edit/${registration.registration_id}`}
                    prefetch={true}
                  >
                    <Button
                      size={"1"}
                      color="blue"
                      variant="soft"
                      disabled={isNavigatingEdit}
                      onClick={() => {
                        setIsNavigatingEdit(true);
                      }}
                    >
                      {isNavigatingEdit ? <Spinner /> : "Edit"}
                    </Button>
                  </Link>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default RegistrationsTable;
