import React from "react";
import prisma from "@/prisma/client";
import AdmissionDetailsForSingleAdmission from "../_components/AdmissionDetailsForSingleAdmission";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";

const AdmissionDetailPage = async ({ params }: { params: { id: string } }) => {
  const admissionId = params.id;

  const admission = await prisma.admission_Discharge.findUnique({
    where: { admission_id: admissionId },
    include: { registration: true },
  });

  const ots = await prisma.oT.findMany({
    where: { admission_id: admissionId },
  });

  return (
    <>
      {admission?.registration && (
        <RegistrationDetailsCard registration={admission.registration} />
      )}
      <AdmissionDetailsForSingleAdmission admission={admission} ots={ots} />
    </>
  );
};

export default AdmissionDetailPage;
