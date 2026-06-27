import React from "react";
import HMISAllNotes from "../consultation/_components/HMISAllNotes";
import RegistrationDetailsCard from "../registration/_components/RegistrationDetailsCard";
import { getRegistrationByMRN } from "@/app/actions/actions";
import { Heading } from "@radix-ui/themes";

interface Props {
  searchParams: Promise<{
    mrn: string;
  }>;
}

const HMISPage = async ({ searchParams }: Props) => {
  const { mrn } = await searchParams;

  // const registration = await getRegistrationById(registration_id);
  // if (!registration) return null;

  const registrationByMRN = await getRegistrationByMRN(mrn);

  // if (!registrationByMRN) return null;

  return (
    <>
      {registrationByMRN && (
        <RegistrationDetailsCard registration={registrationByMRN} />
      )}
      <Heading size="4">HMIS Notes {mrn}</Heading>
      <HMISAllNotes mrn={mrn} />
    </>
  );
};

export default HMISPage;
