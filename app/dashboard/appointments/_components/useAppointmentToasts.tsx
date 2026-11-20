"use client";
import { APPOINTMENT_STATUSES } from "@/lib/appointmentStatus";
import { ymdPKT } from "@/lib/dates";
import { Button, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useRefreshUpcomingAppointments } from "./useUpcomingAppointments";

/** How long the Undo button stays available. */
const UNDO_MS = 8000;

const dayLabel = (date: Date | string) =>
  new Date(`${ymdPKT(date)}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
  });

/** What an appointment looked like before a change, for undoing it. */
export interface AppointmentSnapshot {
  appointment_id: string;
  date_appointment: Date | string;
  status: string;
  plan: string;
}

/**
 * Success toasts with an Undo button for booking and rescheduling. The
 * Toaster lives in the root layout, so a toast shown just before navigating
 * (e.g. back from the new-appointment page) stays on screen.
 */
export const useAppointmentToasts = () => {
  const router = useRouter();
  const refreshUpcoming = useRefreshUpcomingAppointments();

  const showUndoable = useCallback(
    (message: string, undo: () => Promise<unknown>, undoneMessage: string) => {
      toast.success(
        (t) => (
          <Flex align="center" gap="3">
            <Text size="2">{message}</Text>
            <Button
              size="1"
              variant="soft"
              onClick={async () => {
                toast.dismiss(t.id);
                const id = toast.loading("Undoing…");
                try {
                  await undo();
                  refreshUpcoming();
                  router.refresh();
                  toast.success(undoneMessage, { id });
                } catch {
                  toast.error("Couldn't undo. Please fix it by hand.", { id });
                }
              }}
            >
              Undo
            </Button>
          </Flex>
        ),
        { duration: UNDO_MS },
      );
    },
    [refreshUpcoming, router],
  );

  /** After a booking: Undo deletes the new appointment. */
  const bookedToast = useCallback(
    (
      created: { appointment_id: string; date_appointment: Date | string },
      patientName?: string,
    ) =>
      showUndoable(
        `Booked for ${dayLabel(created.date_appointment)}${patientName ? ` – ${patientName}` : ""}`,
        () => axios.delete(`/api/appointment/${created.appointment_id}`),
        "Booking undone",
      ),
    [showUndoable],
  );

  /** After a reschedule: Undo puts back the old date, status and plan. */
  const rescheduledToast = useCallback(
    (before: AppointmentSnapshot, newDate: string) =>
      showUndoable(
        `Rescheduled to ${dayLabel(newDate)}`,
        () =>
          axios.patch(`/api/appointment/${before.appointment_id}`, {
            date_appointment: ymdPKT(before.date_appointment),
            ...(before.plan && { plan: before.plan }),
            // Legacy statuses outside the list can't be sent back; the
            // date change then leaves it as PENDING.
            ...((APPOINTMENT_STATUSES as readonly string[]).includes(
              before.status,
            ) && { status: before.status }),
          }),
        `Moved back to ${dayLabel(before.date_appointment)}`,
      ),
    [showUndoable],
  );

  return { bookedToast, rescheduledToast };
};
