"use client";
import { Appointment, Registration } from "@/generated/prisma";
import { Table } from "@radix-ui/themes";
import React from "react";
import { DAY_COLOUR } from "../../_components/appConstants";

interface Props {
  appointments: Appointment[];
  registrations: Registration[];
}

const ConsultationAppointmentsTable = ({
  appointments,
  registrations,
}: Props) => {
  if (!appointments?.length || !registrations?.length) {
    return <div>No appointments found</div>;
  }
  return (
    <Table.Root size="1" variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          {/* <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell> */}
          <Table.ColumnHeaderCell>Plan</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {appointments.map((appointment) => (
          <Table.Row
            key={appointment.appointment_id}
            style={{
              background: DAY_COLOUR(appointment.date_appointment) ?? "#fff",
            }}
          >
            <Table.Cell>
              {
                registrations.find(
                  (i) => i.registration_id === appointment.registration_id
                )?.first_name
              }
            </Table.Cell>
            <Table.Cell>
              {appointment.date_appointment.toString().slice(0, 10)}
            </Table.Cell>
            {/* <Table.Cell>{appointment.type}</Table.Cell> */}
            <Table.Cell>{appointment.plan} </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ConsultationAppointmentsTable;
