import { Table } from "@radix-ui/themes";

type Appointment = {
  plan: string;
  date_appointment: Date;
  appointment_id: number;
  status: string;
  notes: string | null;
  type: string;
  Registration: {
    first_name: string;
    last_name: string;
    gender: string;
  };
};

interface Props {
  appointments: Appointment[];
}

const AppointmentsTable = ({ appointments }: Props) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>S. No</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Plan</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Notes</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {appointments.map((appointment, index) => (
          <Table.Row key={appointment.appointment_id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{appointment.Registration.first_name}</Table.Cell>
            <Table.Cell>{appointment.Registration.last_name}</Table.Cell>
            <Table.Cell>{appointment.plan}</Table.Cell>
            <Table.Cell>
              {new Date(appointment.date_appointment).toDateString()}
            </Table.Cell>
            <Table.Cell>{appointment.status}</Table.Cell>
            <Table.Cell>{appointment.type}</Table.Cell>
            <Table.Cell>{appointment.notes}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default AppointmentsTable;
