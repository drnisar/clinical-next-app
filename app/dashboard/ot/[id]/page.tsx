import React from "react";
import OTNotesForm from "../_components/OTNotesForm";
import prisma from "@/prisma/client";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";

const OTNotesEditPage = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;
  const ot = await prisma.ot.findUnique({
    where: {
      ot_id: Number(id),
    },
  });
  if (!ot) {
    return <div>OT Notes not found</div>;
  }
  const admission = await prisma.admission_Discharge.findUnique({
    where: {
      admission_id: ot.admission_id,
    },
  });
  if (!admission) {
    return <div>Admission not found</div>;
  }
  const registration = await prisma.registration.findUnique({
    where: {
      registration_id: admission.registration_id,
    },
  });
  if (!registration) {
    return <div>Registration not found</div>;
  }
  return (
    <>
      <RegistrationDetailsCard registration={registration} />
      <OTNotesForm ot_id={Number(id)} admission_id={ot?.admission_id} />
    </>
  );
};

export default OTNotesEditPage;
