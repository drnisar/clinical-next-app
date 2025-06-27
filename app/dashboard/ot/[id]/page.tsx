import React from "react";
import OTNotesForm from "../_components/OTNotesForm";
import { prisma } from "@/lib/prisma";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import OTNotesDetails from "../_components/OTNotesDetails";

const OTNotesEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const ot = await prisma.oT.findUnique({
    where: {
      ot_id: id,
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

      {ot.finalize === 1 ? (
        <OTNotesDetails ot={ot} />
      ) : (
        <OTNotesForm ot_id={id} admission_id={ot?.admission_id} />
      )}
    </>
  );
};

export default OTNotesEditPage;
