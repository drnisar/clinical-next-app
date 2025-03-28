import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const AdmissionsPage = () => {
  return (
    <>
      <Flex justify="end">
        <Link href="/dashboard/admissions/new">
          <Button>New Admission</Button>
        </Link>
      </Flex>
    </>
  );
};
export default AdmissionsPage;
