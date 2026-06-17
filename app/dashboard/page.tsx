import React from "react";
import CurrentWeekAppointments from "./_components/CurrentWeekAppointments";
import { prisma } from "@/lib/prisma";

const DashboardPage = async () => {
  const appointments = await prisma.appointment.findMany({
    include: {
      registration: true,
    },
    where: {
      date_appointment: {
        gte: new Date(), // Fetch appointments from today onwards
      },
    },
    orderBy: {
      date_appointment: "asc", // Order by appointment date ascending
    },
    take: 10, // Limit to the next 10 appointments
  });
  return (
    <>
      <CurrentWeekAppointments appointments={appointments} />
    </>
  );
};

export default DashboardPage;
