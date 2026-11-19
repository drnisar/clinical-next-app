import type { BookingAppointment } from "@/app/actions/actions";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Table,
  Text,
  Theme,
} from "@radix-ui/themes";
import React from "react";
import {
  badgeColorForAppointments,
  DAY_COLOUR,
} from "../../_components/appConstants";

interface Props {
  // Only the fields shown: date, type, plan and the patient's name.
  appointments: BookingAppointment[];
  searchParams: { type: string };
}

const RecentAppointmentsTable = ({ appointments, searchParams }: Props) => {
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.type === searchParams.type,
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
      {/* Cards: phones and small screens (below the sm breakpoint, 768px) */}
      <Flex
        direction="column"
        gap="2"
        display={{ initial: "flex", sm: "none" }}
      >
        {filteredAppointments.map((appointment) => (
          // Light theme so text stays dark on the pastel day colours.
          <Theme
            key={appointment.appointment_id}
            appearance="light"
            hasBackground={false}
          >
            <Box
              p="3"
              className="rounded-lg border"
              style={{ background: DAY_COLOUR(appointment.date_appointment) }}
            >
              <Flex direction="column" gap="1">
                <Flex justify="between" align="start" gap="2">
                  <Text
                    weight="bold"
                    size="2"
                    style={{ wordBreak: "break-word" }}
                  >
                    {appointment.registration.first_name.toUpperCase()}{" "}
                    {appointment.registration.last_name.toUpperCase()}
                  </Text>
                  <Text size="2" weight="medium" style={{ flexShrink: 0 }}>
                    {new Date(appointment.date_appointment).toDateString()}
                  </Text>
                </Flex>
                <Text size="2">{appointment.plan.toUpperCase()}</Text>
              </Flex>
            </Box>
          </Theme>
        ))}
      </Flex>

      {/* Table: tablets and larger */}
      <Box display={{ initial: "none", sm: "block" }}>
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
      </Box>
    </Card>
  );
};

export default RecentAppointmentsTable;
