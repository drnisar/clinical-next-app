import { Consultation, Registration } from "@/generated/prisma";
import { create } from "zustand";

export type ConsultationWithRegistration = Consultation & {
  registration: Registration;
};

type ConsultationStatus = {
  status: string;
  setStatus: (status: string) => void;
};

type ConsultationsStore = {
  consultations: ConsultationWithRegistration[];
  setConsultations: (consultations: ConsultationWithRegistration[]) => void;
};

export const useConsultationStatus = create<ConsultationStatus>((set) => ({
  status: "ALL",
  setStatus: (status) => set({ status }),
}));

export const useConsultations = create<ConsultationsStore>((set) => ({
  consultations: [],
  setConsultations: (consultations) => set({ consultations }),
}));
