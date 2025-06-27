import React, { Suspense } from "react";
import RegistrationsTable from "./_components/RegistrationsTable";
import CreateRegistrationButton from "./_components/CreateRegistrationButton";
import RegistrationPageSkeleton from "./_components/skeletons/RegistrationsPageSkeleton";
import { getRegistrations } from "@/app/actions/actions";

const RegistrationPage = async () => {
  const registrations = await getRegistrations();
  return (
    <Suspense fallback={<RegistrationPageSkeleton />}>
      <CreateRegistrationButton />
      <RegistrationsTable registrations={registrations} />
    </Suspense>
  );
};

export default RegistrationPage;
