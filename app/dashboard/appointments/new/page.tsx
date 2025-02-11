import React from "react";
import AppointmentForm from "../_components/AppointmentForm";
import prisma from "@/prisma/client";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import { Flex, Heading } from "@radix-ui/themes";
import RecentAppointmentsTable from "../_components/RecentAppointmentsTable";

const NewAppointmentPage = async ({
  searchParams,
}: {
  searchParams: { registration_id: string };
}) => {
  const { registration_id } = await searchParams;

  const registration = await prisma.registration.findUnique({
    where: { registration_id: parseInt(registration_id) },
  });

  const appointments = await prisma.appointment.findMany({
    orderBy: {
      date_appointment: "desc",
    },
  });

  return (
    <>
      <Heading size="4">Create Appointment</Heading>
      <Flex gap="4">
        <Flex direction="column" gap="4" minWidth="450px">
          {registration && (
            <RegistrationDetailsCard registration={registration} />
          )}
          <AppointmentForm registration_id={parseInt(registration_id)} />
        </Flex>
        <RecentAppointmentsTable appointments={appointments} />
      </Flex>
    </>
  );
};

export default NewAppointmentPage;
