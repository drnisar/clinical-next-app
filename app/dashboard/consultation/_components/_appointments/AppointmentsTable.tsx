"use client";
import { Appointment, Registration } from "@/generated/prisma";
import { Heading, Table } from "@radix-ui/themes";

interface Props {
  type: string;
  appointments: ({ registration: Registration } & Appointment)[];
}

const AppointmentsTable = ({ type, appointments }: Props) => {
  const filteredAppointments =
    appointments?.filter((appointment) => appointment.type === type) || [];
  return (
    <div>
      {filteredAppointments.length > 0 && (
        <Heading size="2">{type} Appointments</Heading>
      )}
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
          {filteredAppointments &&
            filteredAppointments.map((appointment) => (
              <Table.Row key={appointment.appointment_id}>
                <Table.Cell>
                  {appointment.registration.first_name +
                    " " +
                    appointment.registration.last_name}
                </Table.Cell>
                <Table.Cell>
                  {appointment.date_appointment.toString().slice(0, 10)}
                </Table.Cell>
                <Table.Cell>{appointment.plan} </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default AppointmentsTable;
