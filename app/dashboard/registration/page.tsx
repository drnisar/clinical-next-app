import React, { Suspense } from "react";
import RegistrationsTable from "./_components/RegistrationsTable";
import CreateRegistrationButton from "./_components/CreateRegistrationButton";
import RegistrationPageSkeleton from "./_components/skeletons/RegistrationsPageSkeleton";

const RegistrationPage = async () => {
  // const registrations = await getRegistrations();
  const baseURL = "https://clinical-next-app.vercel.app";
  const response = await fetch(baseURL + "/api/registration");
  const registrations = await response.json();
  return (
    <Suspense fallback={<RegistrationPageSkeleton />}>
      <CreateRegistrationButton />
      <RegistrationsTable registrations={registrations} />
    </Suspense>
  );
};

export default RegistrationPage;
