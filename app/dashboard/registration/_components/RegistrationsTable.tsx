"use client";
import { Registration } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  registrations: Registration[];
}

const RegistrationsTable = ({ registrations }: Props) => {
  const router = useRouter();
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
                {new Date(registration.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                {/* <Link
                  href={`/dashboard/registration/edit/${registration.registration_id}`}
                >
                  Edit
                </Link> */}
                <Button
                  size={"1"}
                  color="yellow"
                  onClick={() =>
                    router.push(
                      `/dashboard/registration/edit/${registration.registration_id}`
                    )
                  }
                >
                  Edit
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default RegistrationsTable;
