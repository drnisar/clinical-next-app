import React from "react";
import prisma from "@/prisma/client";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import AdmissionDetailsForSingleAdmission from "../_components/AdmissionDetailsForSingleAdmission";

const SingleAdmissionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const admission = await prisma.admission_Discharge
    .findUnique({
      where: { admission_id: parseInt(id) },
    })
    .catch((error) => {
      console.error("Error fetching admission:", error);
      return null;
    });
  if (!admission) {
    return <div>No admission found</div>;
  }
  const registration = await prisma.registration.findUnique({
    where: { registration_id: admission.registration_id },
  });
  if (!registration) {
    return <div>No registration found</div>;
  }

  return (
    <>
      <RegistrationDetailsCard registration={registration} />
      <AdmissionDetailsForSingleAdmission params={{ id: parseInt(id) }} />
    </>
  );
};

export default SingleAdmissionPage;
