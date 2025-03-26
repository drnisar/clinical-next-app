import React from "react";
import AppointmentForm from "../_components/AppointmentForm";
import prisma from "@/prisma/client";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import { Flex, Heading } from "@radix-ui/themes";
import RecentAppointmentsTable from "../_components/RecentAppointmentsTable";

const NewAppointmentPage = async ({
  searchParams,
}: {
  searchParams: { type: string; registration_id: string };
}) => {
  const { registration_id, type } = await searchParams;
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      date_appointment: "desc",
    },
  });

  const registration = await prisma.registration.findUnique({
    where: { registration_id: parseInt(registration_id) },
  });

  if (!registration) {
    return <div>Registration not found</div>;
  }

  return (
    <>
      <Heading size="4">Create Appointment</Heading>
      <Flex gap="4">
        <Flex direction="column" gap="4" minWidth="450px">
          <RegistrationDetailsCard registration={registration} />

          <AppointmentForm registration_id={parseInt(registration_id)} />
        </Flex>
        <RecentAppointmentsTable
          appointments={appointments}
          searchParams={{ type }}
        />
      </Flex>
    </>
  );
};

export default NewAppointmentPage;
