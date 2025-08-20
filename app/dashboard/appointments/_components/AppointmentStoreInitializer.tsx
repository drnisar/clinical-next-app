"use client";
import { useEffect } from "react";
import { useAppointmentsStore } from "./AppointmentsStore";
import { Appointment, Registration } from "@/generated/prisma";

type AppointmentWithRegistration = Appointment & { registration: Registration };

interface Props {
  appointmentsWithRegistration: AppointmentWithRegistration[];
}

const AppointmentStoreInitializer = ({
  appointmentsWithRegistration,
}: Props) => {
  const { type, setType, setAppointments } = useAppointmentsStore();
  useEffect(() => {
    setType(type);
    setAppointments(
      type
        ? appointmentsWithRegistration.filter(
            (appointment) => appointment.type === type
          )
        : appointmentsWithRegistration
    );
  }, [type, setType, setAppointments, appointmentsWithRegistration]);
  return null;
};

export default AppointmentStoreInitializer;
