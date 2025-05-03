import prisma from "@/prisma/client";
import React, { Suspense } from "react";
import ConsultationsTable from "./_components/ConsultationsTable";
import ConsultationPageSkeleton from "./_skeletons/ConsultationPageSkeleton";

const ConsultationsPage = async () => {
  const consultationsFromDb = await prisma.clinic_Visit.findMany({
    orderBy: { visit_date: "desc" },
    include: { Registration: true }, // Prisma includes with capital 'R'
  });

  if (!consultationsFromDb || consultationsFromDb.length === 0) {
    return <div>No consultations found</div>;
  }

  const consultationsForTable = consultationsFromDb.map((consultation) => {
    const { Registration, ...restOfConsultation } = consultation;
    return {
      ...restOfConsultation,
      registration: Registration ?? null,
    };
  });

  return (
    <>
      <Suspense fallback={<ConsultationPageSkeleton />}>
        <ConsultationsTable consultations={consultationsForTable} />
      </Suspense>
    </>
  );
};

export default ConsultationsPage;
