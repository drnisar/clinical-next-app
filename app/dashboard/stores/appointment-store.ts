import { Appointment } from "@prisma/client";
import { create } from "zustand";

// interface Props{
//     appointment: Appointment | null
// }

interface AppointmentStore {
  selectedAppointment: Appointment | null;
  update: (appointment: Appointment | null) => void;
}
export const useAppointmentStore = create<AppointmentStore>((set) => ({
  selectedAppointment: null,
  update: (appointment: Appointment | null) =>
    set({ selectedAppointment: appointment }),
  reset: () => set({ selectedAppointment: null }),
}));

interface HasAppointmentStore {
  hasAppointment: boolean;
  update: (hasAppointment: boolean) => void;
}
export const useHasAppointmentStore = create<HasAppointmentStore>((set) => ({
  hasAppointment: false,
  update: (hasAppointment: boolean) => set({ hasAppointment }),
}));
