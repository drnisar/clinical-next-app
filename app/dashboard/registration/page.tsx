import React, { Suspense } from "react";
import RegistrationsTable from "./_components/RegistrationsTable";
import CreateRegistrationButton from "./_components/CreateRegistrationButton";
import RegistrationPageSkeleton from "./_components/skeletons/RegistrationsPageSkeleton";
import { prisma } from "@/lib/prisma"; // Adjust the import path as necessary

const RegistrationPage = async () => {
  const registrations = await prisma.registration.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return (
    <Suspense fallback={<RegistrationPageSkeleton />}>
      <CreateRegistrationButton />
      <RegistrationsTable registrations={registrations} />
    </Suspense>
  );
};

export default RegistrationPage;
