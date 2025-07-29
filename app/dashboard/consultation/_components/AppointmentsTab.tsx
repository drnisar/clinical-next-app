"use client";
import { Appointment, Registration } from "@/generated/prisma";
import { Badge, Table } from "@radix-ui/themes";
import AppointmentDeleteButton from "../../appointments/_components/AppointmentDeleteButton";
import CreateAppointmentDialog from "../../appointments/_components/CreateAppointmentDialog";
import { badgeColorForAppointments } from "../../_components/appConstants";

interface Props {
  registration_id: string;
  consultation_id: string;
  type: string;
  appointments: ({ registration: Registration } & Appointment)[];
}

const AppointmentsTab = ({ registration_id, type, appointments }: Props) => {
  const appointmentsForRegistration = appointments.filter(
    (appointment) => appointment.registration_id === registration_id
  );
  console.log("Appointments for registration:", appointmentsForRegistration);
  return (
    <>
      {appointmentsForRegistration.length > 0 && (
        <Table.Root size="1" className="w-full">
          {/* <h2>Appointments for Registration ID: {registration_id}</h2> */}
          <Table.Body>
            {appointmentsForRegistration.map((appointment) => (
              <Table.Row key={appointment.appointment_id}>
                <Table.Cell>
                  {appointment.date_appointment.toString().slice(0, 10)}
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
      )}
      <div className="mt-4 flex justify-end">
        <CreateAppointmentDialog
          appointments={appointments}
          searchParams={{ type }}
          registration_id={registration_id}
          type={type}
        />
      </div>
    </>
  );
};

export default AppointmentsTab;
