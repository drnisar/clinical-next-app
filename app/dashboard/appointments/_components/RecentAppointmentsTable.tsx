import { Appointment } from "@/generated/prisma/default";
import { Card, Heading, Table } from "@radix-ui/themes";
import React from "react";

interface Props {
  appointments: Appointment[];
  searchParams: { type: string };
}

const RecentAppointmentsTable = ({ appointments, searchParams }: Props) => {
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.type === searchParams.type
  );
  if (filteredAppointments.length === 0) {
    return null;
  }
  return (
    <Card>
      <Heading size="2">Recent Appointments (For Reference)</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Appointment Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Plan</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredAppointments.map((appointment) => (
            <Table.Row key={appointment.appointment_id}>
              <Table.Cell>
                {new Date(appointment.date_appointment).toDateString()}
              </Table.Cell>
              <Table.Cell>{appointment.plan}</Table.Cell>
              <Table.Cell>{appointment.type}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default RecentAppointmentsTable;
