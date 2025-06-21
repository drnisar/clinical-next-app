import React from "react";
import AdmissionForm from "../_components/AdmissionForm";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import prisma from "@/prisma/client";

const NewAdmissionPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ registration_id: string }>;
}) => {
  const { registration_id } = await searchParams;
  const registration = await prisma.registration.findUnique({
    where: { registration_id: registration_id },
  });
  if (!registration) {
    return <div>Registration not found</div>;
  }
  return (
    <>
      <RegistrationDetailsCard registration={registration} />
      <AdmissionForm registration_id={registration.registration_id} />
    </>
  );
};

export default NewAdmissionPage;
