import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { startOfTodayPKT, todayRangePKT } from "@/lib/dates";

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
export const getRegistrationByMRN = async (mrn: string) => {
  const registration = await prisma.registration.findFirst({
    where: {
      mr_number: mrn,
    },
    // include: {
    //   Appointment: true,
    //   Consultation: true,
    //   Admission_Discharge: true,
    //   OT: true,
    // },
  });
  return registration;
};

/**
 * All appointments for the appointments list, newest first, with only the
 * patient fields the list shows (name, and phone/gender for the Contact card),
 * so MRNs, dates of birth and addresses don't reach the browser.
 */
export const getAppointments = async () =>
  prisma.appointment.findMany({
    orderBy: { date_appointment: "desc" },
    include: {
      registration: {
        select: {
          first_name: true,
          last_name: true,
          gender: true,
          code: true,
          phone_number: true,
        },
      },
    },
  });

export type AppointmentListItem = Awaited<
  ReturnType<typeof getAppointments>
>[number];

/** One patient's appointments, newest first. */
export const getAppointmentsForRegistration = async (registrationId: string) =>
  prisma.appointment.findMany({
    where: { registration_id: registrationId },
    orderBy: { date_appointment: "desc" },
  });

/**
 * Upcoming appointments (from today, Pakistan time) for the booking dialog,
 * which shows how busy each day is. Only the fields it displays: no phone
 * numbers, MRNs or dates of birth of other patients.
 */
export const getUpcomingAppointmentsForBooking = async () =>
  prisma.appointment.findMany({
    where: { date_appointment: { gte: startOfTodayPKT() } },
    orderBy: { date_appointment: "asc" },
    select: {
      appointment_id: true,
      date_appointment: true,
      type: true,
      plan: true,
      registration: { select: { first_name: true, last_name: true } },
    },
  });

export type BookingAppointment = Awaited<
  ReturnType<typeof getUpcomingAppointmentsForBooking>
>[number];

/** A patient's earlier consultations (excluding the current one), newest first. */
export const getConsultationHistory = async (
  registrationId: string,
  excludeConsultationId: string,
) =>
  prisma.consultation.findMany({
    where: {
      registration_id: registrationId,
      NOT: { consultation_id: excludeConsultationId },
    },
    orderBy: { visit_date: "desc" },
    take: 10,
    select: {
      consultation_id: true,
      visit_date: true,
      status: true,
      diagnosis: true,
      plan: true,
      medications: true,
    },
  });

export type ConsultationHistoryItem = Awaited<
  ReturnType<typeof getConsultationHistory>
>[number];

export const getNextTenAppointments = async () => {
  const nextTenAppointments = await prisma.appointment.findMany({
    where: {
      date_appointment: {
        gte: startOfTodayPKT(), // From today (Pakistan), including earlier today
      },
    },
    orderBy: {
      date_appointment: "asc", // Order by appointment date ascending
    },
    take: 10, // Limit to the next 10 appointments
    include: {
      registration: true, // Include registration details
    },
  });
  return nextTenAppointments;
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
  // Today in Pakistan, not the server's (UTC on Vercel) day.
  const { start, end } = todayRangePKT();
  const consultations = await prisma.consultation.findMany({
    where: {
      visit_date: {
        gte: start,
        lt: end,
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
  { tags: ["consultation", "consultation-by-id"], revalidate: 3600 },
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
  },
);
