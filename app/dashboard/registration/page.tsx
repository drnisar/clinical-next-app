import prisma from "@/prisma/client";
import React, { Suspense } from "react";
import RegistrationsTable from "./_components/RegistrationsTable";
import CreateRegistrationButton from "./_components/CreateRegistrationButton";
import { Spinner } from "@radix-ui/themes";

const RegistrationPage = async () => {
  const registrations = await prisma.registration.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <Suspense fallback={<Spinner />}>
      <CreateRegistrationButton />
      <RegistrationsTable registrations={registrations} />
    </Suspense>
  );
};

export default RegistrationPage;
