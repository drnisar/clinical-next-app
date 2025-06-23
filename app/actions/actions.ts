import { prisma } from "@/lib/prisma";

export const getRegistrations = async () => {
  const registrations = await prisma.registration.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return registrations;
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
