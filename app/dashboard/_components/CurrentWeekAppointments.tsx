"use client";
import type { Appointment, Registration } from "@/generated/prisma";
import { Heading, Strong, Table } from "@radix-ui/themes";
import ContactCard from "./ui/ContactCard";
import DialogComponent from "./ui/DialogComponent";
import { dateDDMMMYY, dateInUrdu } from "./appConstants";

type AppointmentWithRegistration = Appointment & { registration: Registration };

interface Props {
  appointments: AppointmentWithRegistration[];
}
const CurrentWeekAppointments = ({ appointments }: Props) => {
  return (
    <>
      <Heading size="2" className="mb-4">
        {" "}
        Upcoming Appointments{" "}
      </Heading>
      <Table.Root>
        {/* <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Registration ID</Table.HeaderCell>
          </Table.Row>
        </Table.Header> */}
        <Table.Body>
          {appointments.map((appointment: AppointmentWithRegistration) => (
            <Table.Row key={appointment.appointment_id}>
              <Table.Cell>
                {dateDDMMMYY(appointment.date_appointment)}
              </Table.Cell>
              <Table.Cell>
                <Strong>
                  {appointment.registration.first_name}{" "}
                  {appointment.registration.last_name}
                </Strong>
              </Table.Cell>
              <Table.Cell>{appointment.registration.mr_number}</Table.Cell>
              <Table.Cell>{appointment.plan}</Table.Cell>
              <Table.Cell>
                {/* <a
                  href={`tel:${appointment.registration.code}${appointment.registration.phone_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {appointment.registration.code}
                  {appointment.registration.phone_number}
                </a> */}

                {/* <Dialog.Root>
                  <Dialog.Trigger>
                    <Button>Contact</Button>
                  </Dialog.Trigger>
                  <Dialog.Content>
                    <Card>
                      <Flex direction="column" gap="2">
                        <Heading size="3">Contact Details</Heading>
                        <Strong>Phone:</Strong>
                        <a
                          href={`tel:${appointment.registration.code}${appointment.registration.phone_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {appointment.registration.code}
                          {appointment.registration.phone_number}
                        </a>
                      </Flex>
                    </Card>
                  </Dialog.Content>
                </Dialog.Root> */}
                <DialogComponent
                  triggerButtonSize="small"
                  triggerButtonVariant="outline"
                  triggerButtonText={"Contact"}
                  titleText={"Contact Details"}
                  content={
                    <ContactCard
                      phoneNumber={`${appointment.registration.code}${appointment.registration.phone_number}`}
                      appointmentDateEnglish={dateDDMMMYY(
                        appointment.date_appointment,
                      )}
                      appointmentDateUrdu={dateInUrdu(
                        appointment.date_appointment,
                      )}
                    />
                  }
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default CurrentWeekAppointments;
