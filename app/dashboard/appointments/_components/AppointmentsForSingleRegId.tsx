import { Appointment } from "@prisma/client";
import { Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import React from "react";
import AppointmentDeleteButton from "./AppointmentDeleteButton";

interface Appointments {
  appointments: Appointment[];
  registration_id: string;
}

const AppointmentsForSingleRegId = ({
  appointments,
  registration_id,
}: Appointments) => {
  return (
    <Card>
      <Flex justify="between">
        <Heading size="2">
          Appointments {appointments.length === 0 && `(No appointments found)`}
        </Heading>
        <Link
          href={`/dashboard/appointments/new?registration_id=${registration_id}`}
          className="btn btn-primary items-end"
        >
          Create New Appointment
        </Link>
      </Flex>

      {appointments.map((appointment) => (
        <Flex
          justify="between"
          key={appointment.appointment_id}
          className="border-b py-2"
        >
          <Flex gap="3" justify="between">
            {new Date(appointment.date_appointment).toLocaleDateString("en-gb")}
            <Flex direction="column">
              <Flex gap="3">
                <Text weight="bold">Plan</Text>
                <Text color="gray">{appointment.plan}</Text>
              </Flex>
              <Flex gap="3">
                <Text weight="bold">Status</Text>
                <Text color="gray">{appointment.status}</Text>
              </Flex>
              <Flex gap="3">
                <Text weight="bold">Notes</Text>
                <Text color="gray">{appointment.notes}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            <AppointmentDeleteButton
              appointment_id={appointment.appointment_id}
            />
          </Flex>
        </Flex>
      ))}
    </Card>
  );
};

export default AppointmentsForSingleRegId;
