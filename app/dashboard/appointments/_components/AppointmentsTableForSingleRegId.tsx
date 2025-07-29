"use client";
import { Appointment, Registration } from "@/generated/prisma";
import { Table, Badge, Heading } from "@radix-ui/themes";
import {
  badgeColorForAppointments,
  datedddDDMMMYY,
} from "../../_components/appConstants";
import AppointmentDeleteButton from "../../appointments/_components/AppointmentDeleteButton";

interface Props {
  appointmentsForRegistration: ({ registration: Registration } & Appointment)[];
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
          <Table.Root className="w-full">
            <Table.Body className="w-full ml-4">
              {appointmentsForRegistration.map((appointment) => (
                <Table.Row key={appointment.appointment_id}>
                  <Table.Cell>
                    {/* {appointment.date_appointment.toString().slice(0, 15)} */}
                    {datedddDDMMMYY(appointment.date_appointment)}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={badgeColorForAppointments(appointment.type)}>
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
        </>
      )}
    </>
  );
};

export default AppointmentsTableForSingleRegId;
