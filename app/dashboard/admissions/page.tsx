import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import CurrentlyAdmittedList from "./_components/CurrentlyAdmittedList";
import prisma from "@/prisma/client";

const AdmissionsPage = async () => {
  const admissions = await prisma.admission_Discharge.findMany({
    where: { status: "ADMITTED" },
    include: { Registration: true },
  });
  if (!admissions) {
    return <div>No admissions found</div>;
  }
  return (
    <>
      <Flex justify="end">
        <Link href="/dashboard/admissions/new">
          <Button>New Admission</Button>
        </Link>
      </Flex>
      <CurrentlyAdmittedList admissions={admissions} />
    </>
  );
};
export default AdmissionsPage;
