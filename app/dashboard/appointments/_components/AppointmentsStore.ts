import { Appointment, Registration } from "@/generated/prisma";
import { create } from "zustand";

type AppointmentWithRegistration = Appointment & { registration: Registration };

type AppointmentsStore = {
  type: string;
  setType: (type: string) => void;
  appointments: AppointmentWithRegistration[];
  setAppointments: (appointments: AppointmentWithRegistration[]) => void;
};

export const useAppointmentsStore = create<AppointmentsStore>((set) => ({
  type: "",
  setType: (type) => set({ type }),
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
}));
