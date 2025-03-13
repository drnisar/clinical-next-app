import { Heading } from "@radix-ui/themes";
import React from "react";
import MedsEntryForm from "./_components/MedsEntryForm";

const MedicationsPage = () => {
  return (
    <>
      <Heading>Medications</Heading>
      <MedsEntryForm />
    </>
  );
};

export default MedicationsPage;
