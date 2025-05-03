import React from "react";
import prisma from "@/prisma/client";
import AdmissionDetailsForSingleAdmission from "../_components/AdmissionDetailsForSingleAdmission";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";

const AdmissionDetailPage = async ({ params }: { params: { id: string } }) => {
  const admissionId = parseInt(params.id, 10);
  if (isNaN(admissionId)) {
    return <div>Invalid Admission ID</div>;
  }

  const admission = await prisma.admission_Discharge.findUnique({
    where: { admission_id: admissionId },
    include: { Registration: true },
  });

  const ots = admission
    ? await prisma.ot.findMany({
        where: { admission_id: admission.admission_id },
        orderBy: { surgery_date: "desc" }, // Example ordering
      })
    : [];

  return (
    <>
      {admission?.Registration && (
        <RegistrationDetailsCard registration={admission.Registration} />
      )}
      <AdmissionDetailsForSingleAdmission admission={admission} ots={ots} />
    </>
  );
};

export default AdmissionDetailPage;
