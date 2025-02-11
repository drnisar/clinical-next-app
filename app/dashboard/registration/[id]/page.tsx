import prisma from "@/prisma/client";
import React from "react";
import RegistrationDetailsCard from "../_components/RegistrationDetailsCard";
import AppointmentsForSingleRegId from "../../appointments/_components/AppointmentsForSingleRegId";
import { Box } from "@radix-ui/themes";

const RegistrationDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = await params.id;

  const registration = await prisma.registration.findUnique({
    where: { registration_id: parseInt(id) },
  });

  const appointments = await prisma.appointment.findMany({
    where: { registration_id: parseInt(id) },
    orderBy: { date_appointment: "desc" },
  });

  if (!registration) {
    return <div>Registration not found</div>;
  }

  return (
    <Box className="space-y-5">
      <RegistrationDetailsCard registration={registration} />

      <AppointmentsForSingleRegId
        appointments={appointments}
        registration_id={id}
      />
    </Box>
  );
};

export default RegistrationDetailsPage;
