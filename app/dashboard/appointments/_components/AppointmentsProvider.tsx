import React, { createContext } from "react";
import { useAppointmentsStore } from "./AppointmentsStore";
import { Appointment } from "@/generated/prisma/index.d 2";
type AppointmentWithRegistration = Appointment & {
  registration: {
    first_name: string;
    last_name: string;
    phone_number: string;
    type: string;
  };
};

// Create the AppointmentsContext
export const AppointmentsContext = createContext<AppointmentWithRegistration[]>(
  []
);

interface Props {
  children: React.ReactNode;
  appointments: AppointmentWithRegistration[];
}
const AppointmentsProvider = ({ children, appointments }: Props) => {
  const { type } = useAppointmentsStore();
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.registration.type === type
  );

  return (
    <AppointmentsContext.Provider value={filteredAppointments}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentsProvider;
