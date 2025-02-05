import prisma from "@/prisma/client";
import React from "react";
import RegistrationsTable from "./_components/RegistrationsTable";
import CreateRegistrationButton from "./_components/CreateRegistrationButton";

const RegistrationPage = async () => {
  const registrations = await prisma.registration.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <CreateRegistrationButton />
      <RegistrationsTable registrations={registrations} />
    </div>
  );
};

export default RegistrationPage;
