import React, { Suspense } from "react";
import ConsultationsTable from "./_components/ConsultationsTable";
import ConsultationPageSkeleton from "./_skeletons/ConsultationPageSkeleton";
import { getConsultations } from "@/app/actions/actions";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

const ConsultationsPage = async () => {
  const consultations = await getConsultations();
  if (!consultations || consultations.length === 0) {
    return <div>No consultations found</div>;
  }

  return (
    <>
      <Suspense fallback={<ConsultationPageSkeleton />}>
        <Flex justify={"between"}>
          <h1 className="text-2xl font-bold mb-4">Consultations</h1>
          <Link
            href="/dashboard/consultation/today"
            prefetch
            passHref
            legacyBehavior={false}
          >
            <Button size="2" color="gray" variant="soft">
              Today&#39;s Consultation
            </Button>
          </Link>
        </Flex>
        <ConsultationsTable consultations={consultations} />
      </Suspense>
    </>
  );
};

export default ConsultationsPage;
