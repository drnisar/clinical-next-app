import { Appointment, Registration } from "@/generated/prisma/default";
import { Badge, Card, Heading, Table } from "@radix-ui/themes";
import React from "react";
import {
  badgeColorForAppointments,
  DAY_COLOUR,
} from "../../_components/appConstants";

interface Props {
  appointments: ({ registration: Registration } & Appointment)[];
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
      <Heading size="2" className="mb-4 mx-auto">
        <Badge color={badgeColorForAppointments(searchParams.type)}>
          {searchParams.type}
        </Badge>{" "}
        Appointments{" "}
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Appointment Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Patient</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Plan</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredAppointments.map((appointment) => (
            <Table.Row
              key={appointment.appointment_id}
              style={{ background: DAY_COLOUR(appointment.date_appointment) }}
            >
              <Table.Cell>
                {new Date(appointment.date_appointment).toDateString()}
              </Table.Cell>
              <Table.Cell>
                {appointment.registration.first_name.toUpperCase()}{" "}
                {appointment.registration.last_name.toUpperCase()}
              </Table.Cell>
              <Table.Cell>{appointment.plan.toUpperCase()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default RecentAppointmentsTable;
