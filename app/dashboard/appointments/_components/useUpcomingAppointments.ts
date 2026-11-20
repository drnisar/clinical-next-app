"use client";
import type { BookingAppointment } from "@/app/actions/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";

/** Same as BookingAppointment, with the date as it arrives over JSON. */
export type UpcomingAppointment = Omit<BookingAppointment, "date_appointment"> & {
  date_appointment: string;
};

export const UPCOMING_APPOINTMENTS_KEY = ["appointments", "upcoming"] as const;

/** Upcoming, non-cancelled appointments for the booking/reschedule calendar. */
export const useUpcomingAppointments = () =>
  useQuery({
    queryKey: UPCOMING_APPOINTMENTS_KEY,
    queryFn: async () =>
      (await axios.get<UpcomingAppointment[]>("/api/appointment/upcoming"))
        .data,
    staleTime: 30_000,
  });

/** Call after booking, rescheduling, deleting or changing a status. */
export const useRefreshUpcomingAppointments = () => {
  const queryClient = useQueryClient();
  return useCallback(
    () =>
      queryClient.invalidateQueries({ queryKey: UPCOMING_APPOINTMENTS_KEY }),
    [queryClient],
  );
};
