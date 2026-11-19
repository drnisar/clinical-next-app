"use client";
import type { Appointment } from "@/generated/prisma";
import { Table, Badge, Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import {
  badgeColorForAppointments,
  datedddDDMMMYY,
} from "../../_components/appConstants";
import AppointmentDeleteButton from "../../appointments/_components/AppointmentDeleteButton";

interface Props {
  appointmentsForRegistration: Appointment[];
}
const AppointmentsTableForSingleRegId = ({
  appointmentsForRegistration,
}: Props) => {
  return (
    <>
      {appointmentsForRegistration.length > 0 && (
        <>
          <Heading size="2" className="">
            Appointments
          </Heading>
          {/* Cards: phones and small screens (below the sm breakpoint, 768px) */}
          <Flex
            direction="column"
            gap="2"
            mt="2"
            display={{ initial: "flex", sm: "none" }}
          >
            {appointmentsForRegistration.map((appointment) => (
              <Card key={appointment.appointment_id} size="1">
                <Flex justify="between" align="center" gap="2">
                  <Flex direction="column" gap="1" style={{ minWidth: 0 }}>
                    <Flex align="center" gap="2" wrap="wrap">
                      <Text size="2" weight="bold">
                        {datedddDDMMMYY(appointment.date_appointment)}
                      </Text>
                      <Badge
                        color={badgeColorForAppointments(appointment.type)}
                      >
                        {appointment.type}
                      </Badge>
                    </Flex>
                    <Text size="2" style={{ wordBreak: "break-word" }}>
                      {appointment.plan}
                    </Text>
                  </Flex>
                  <AppointmentDeleteButton
                    appointment_id={appointment.appointment_id}
                  />
                </Flex>
              </Card>
            ))}
          </Flex>

          {/* Table: tablets and larger */}
          <Box display={{ initial: "none", sm: "block" }}>
            <Table.Root className="w-full">
              <Table.Body className="w-full ml-4">
                {appointmentsForRegistration.map((appointment) => (
                  <Table.Row key={appointment.appointment_id}>
                    <Table.Cell>
                      {/* {appointment.date_appointment.toString().slice(0, 15)} */}
                      {datedddDDMMMYY(appointment.date_appointment)}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        color={badgeColorForAppointments(appointment.type)}
                      >
                        {appointment.type}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>{appointment.plan}</Table.Cell>
                    <Table.Cell>
                      <AppointmentDeleteButton
                        appointment_id={appointment.appointment_id}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </>
      )}
    </>
  );
};

export default AppointmentsTableForSingleRegId;
