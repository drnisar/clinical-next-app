import prisma from "@/prisma/client";
import React from "react";
import RegistrationDetailsCard from "../_components/RegistrationDetailsCard";
import AppointmentsForSingleRegId from "../../appointments/_components/AppointmentsForSingleRegId";
import { Box } from "@radix-ui/themes";
import ConsultationsForSingleRegId from "../../consultation/_components/ConsultationsForSingleRegId";

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

  const consultations = await prisma.clinic_Visit.findMany({
    where: { registration_id: parseInt(id) },
  });

  if (!registration) {
    return <div>Registration not found</div>;
  }

  return (
    <Box className="space-y-5">
      <RegistrationDetailsCard registration_id={id} />

      <AppointmentsForSingleRegId
        appointments={appointments}
        registration_id={id}
      />
      <ConsultationsForSingleRegId
        clinicVisits={consultations}
        registration_id={id}
      />
    </Box>
  );
};

export default RegistrationDetailsPage;
