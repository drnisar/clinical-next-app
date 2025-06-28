import React from "react";
import ConsultationsTable from "../_components/ConsultationsTable";
import { getTodaysConsultations } from "@/app/actions/actions";
import { Flex, Button } from "@radix-ui/themes";
import Link from "next/link";

const page = async () => {
  const consultations = await getTodaysConsultations();
  return (
    <>
      <Flex justify={"between"}>
        <h1 className="text-2xl font-bold mb-4">Today&#39;s Consultations</h1>
        <Link
          href="/dashboard/consultation"
          prefetch
          passHref
          legacyBehavior={false}
        >
          <Button size="2" color="gray" variant="soft">
            Back to All Consultations
          </Button>
        </Link>
      </Flex>
      <ConsultationsTable consultations={consultations || []} />
    </>
  );
};

export default page;
