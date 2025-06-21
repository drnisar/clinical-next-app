import React from "react";
import RegistrationDetailsCard from "../_components/RegistrationDetailsCard";
import AppointmentsForSingleRegId from "../../appointments/_components/AppointmentsForSingleRegId";
import { Box } from "@radix-ui/themes";
import ConsultationsForSingleRegId from "../../consultation/_components/ConsultationsForSingleRegId";
import AdmissionsForSingleRegId from "../../admissions/_components/AdmissionsForSingleRegId";
import { PrismaClient } from "@/generated/prisma";
import SurgicalProceduresForSingleReg from "../../ot/_components/SurgicalProceduresForSingleReg";

const prisma = new PrismaClient();
const RegistrationDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = await params.id;

  const registration = await prisma.registration.findUnique({
    where: { registration_id: id },
  });

  const appointments = await prisma.appointment.findMany({
    where: { registration_id: id },
    orderBy: { date_appointment: "desc" },
  });

  const consultations = await prisma.consultation.findMany({
    where: { registration_id: id },
  });

  // if (!registration) {
  //   return <div>Registration not found</div>;
  // }

  const admissions = await prisma.admission_Discharge.findMany({
    where: { registration_id: id },
    orderBy: { admission_id: "desc" },
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
      <ConsultationsForSingleRegId
        consultations={consultations}
        registration_id={id}
      />

      <AdmissionsForSingleRegId admissions={admissions} registration_id={id} />
      <SurgicalProceduresForSingleReg registration_id={id} />
    </Box>
  );
};

export default RegistrationDetailsPage;
