import { prisma } from "@/lib/prisma";

export const getRegistrations = async () => {
  const registrations = await prisma.registration.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return registrations;
};

export const getRegistrationById = async (id: string) => {
  const registration = await prisma.registration.findUnique({
    where: {
      registration_id: id,
    },
    include: {
      Appointment: true,
      Consultation: true,
      Admission_Discharge: true,
      OT: true,
    },
  });
  return registration;
};

export const getAppointments = async () => {
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      date_appointment: "desc",
    },
    include: {
      registration: true, // Include registration details
    },
  });
  return appointments;
};

export const getConsultations = async () => {
  const consultations = await prisma.consultation.findMany({
    orderBy: {
      visit_date: "desc",
    },
    include: {
      registration: true, // Include registration details
    },
  });
  return consultations;
};

export const getTodaysConsultations = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  const consultations = await prisma.consultation.findMany({
    where: {
      visit_date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      visit_date: "desc",
    },
    include: {
      registration: true, // Include registration details
    },
  });
  return consultations;
};

export const getAdmissions = async () => {
  const admissions = await prisma.admission_Discharge.findMany({
    where: {
      status: "ADMITTED", // Only get currently admitted patients
    },
    orderBy: {
      admission_date: "desc",
    },
    include: {
      registration: true, // Include registration details
    },
  });
  return admissions;
};

export const getConsultationById = async (id: string) => {
  const consultation = await prisma.consultation.findUnique({
    where: {
      consultation_id: id,
    },
    include: {
      registration: true, // Include registration details
    },
  });
  return consultation;
};
