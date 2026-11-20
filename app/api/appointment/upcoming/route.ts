import { getUpcomingAppointmentsForBooking } from "@/app/actions/actions";
import { NextResponse } from "next/server";

/**
 * Upcoming (from today, Pakistan time), non-cancelled appointments for the
 * booking and reschedule calendars: date, type, plan, status and the
 * patient's name only.
 */
export const GET = async () => {
  try {
    return NextResponse.json(await getUpcomingAppointmentsForBooking());
  } catch (error) {
    console.error("Error fetching upcoming appointments", error);
    return NextResponse.json(
      { message: "Error fetching appointments" },
      { status: 500 }
    );
  }
};
