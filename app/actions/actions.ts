import { prisma } from "@/lib/prisma";
import { revalidatePath, unstable_cache } from "next/cache";

export const getRegistrations = unstable_cache(
  async () => {
    revalidatePath("/dashboard/registration");
    const registrations = await prisma.registration.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return registrations;
  },
  ["registrations"],
  {
    tags: ["registrations"],
    revalidate: 1, // Cache for 0 seconds
  }
);

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
