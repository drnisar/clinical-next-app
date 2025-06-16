import React from "react";
import AppointmentForm from "../_components/AppointmentForm";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import { Box, Flex, Heading } from "@radix-ui/themes";
import RecentAppointmentsTable from "../_components/RecentAppointmentsTable";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

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
    where: { registration_id: registration_id },
  });

  if (!registration) {
    return <div>Registration not found</div>;
  }
  console.log("Registration ID:", registration_id);

  return (
    <>
      <Heading size="4">Create Appointment</Heading>
      <Flex gap="4" direction={"column"}>
        <RegistrationDetailsCard registration={registration} />
        <Flex gap="4">
          <Box minWidth={"450px"}>
            <AppointmentForm registration_id={registration_id} />
          </Box>
          <Box flexGrow={"1"}>
            <RecentAppointmentsTable
              appointments={appointments}
              searchParams={{ type }}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default NewAppointmentPage;
