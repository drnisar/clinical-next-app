import { prisma } from "@/lib/prisma";
import { todayRangePKT } from "@/lib/dates";
import type { AppointmentStatus } from "@/lib/appointmentStatus";

/** Statuses that a consultation moves to COMPLETED. NO_SHOW and CANCELLED
 * are set by staff on purpose, so they are left alone. */
const OPEN_STATUSES: AppointmentStatus[] = ["PENDING", "ARRIVED"];

/**
 * Mark the patient's open appointments on the consultation's visit day
 * (Pakistan time) as COMPLETED. Returns how many were updated.
 */
export const completeAppointmentsForVisit = async (
  registrationId: string,
  visitDate: Date | string,
): Promise<number> => {
  const visit = new Date(visitDate);
  if (isNaN(visit.getTime())) return 0;
  const { start, end } = todayRangePKT(visit.getTime());

  const { count } = await prisma.appointment.updateMany({
    where: {
      registration_id: registrationId,
      date_appointment: { gte: start, lt: end },
      status: { in: OPEN_STATUSES },
    },
    data: { status: "COMPLETED" satisfies AppointmentStatus },
  });
  return count;
};
