import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

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
      visit_date: "asc",
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

export const getConsultationById = unstable_cache(
  async (id: string) => {
    const consultation = await prisma.consultation.findUnique({
      where: {
        consultation_id: id,
      },
      include: {
        registration: true, // Include registration details
      },
    });
    return consultation;
  },
  ["consultation-by-id"],
  { tags: ["consultation", "consultation-by-id"], revalidate: 3600 }
);

export const getMedsTemplates = async () => {
  const templates = await prisma.medsTemplate.findMany();
  return templates;
};

export // Create a custom date conversion hook
const useDateHandling = () => {
  const formatDateForInput = (date: Date | string | null): string => {
    if (!date) return "";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) return "";
      return dateObj.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const parseInputDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  return { formatDateForInput, parseInputDate };
};

export const getAppointmentTypes = async () => {
  try {
    const appointmentTypes = await prisma.appointmentType.findMany();
    return appointmentTypes;
  } catch (error) {
    console.error("Error fetching appointment types:", error);
    return [];
  }
};

export const getDrugs = unstable_cache(
  async () => {
    console.log("Fetching drugs...");
    return await prisma.genericName.findMany({
      include: {
        brandNames: true,
      },
    });
  },
  ["drugs"],
  {
    tags: ["drugs"],
    revalidate: 60,
  }
);
