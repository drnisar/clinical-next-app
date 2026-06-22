import React from "react";
import HMISAllNotes from "../consultation/_components/HMISAllNotes";
import RegistrationDetailsCard from "../registration/_components/RegistrationDetailsCard";
import { getRegistrationById } from "@/app/actions/actions";
import { Heading } from "@radix-ui/themes";

interface Props {
  searchParams: {
    mrn: string;
    registration_id: string;
  };
}

const HMISPage = async ({ searchParams }: Props) => {
  const { mrn, registration_id } = searchParams;

  const registration = await getRegistrationById(registration_id);
  if (!registration) return null;
  return (
    <>
      <RegistrationDetailsCard registration={registration} />
      <Heading size="4">HMIS Notes</Heading>
      <HMISAllNotes mrn={mrn} />
    </>
  );
};

export default HMISPage;
