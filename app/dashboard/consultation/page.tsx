import React, { Suspense } from "react";
import ConsultationsTable from "./_components/ConsultationsTable";
import ConsultationPageSkeleton from "./_skeletons/ConsultationPageSkeleton";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

const ConsultationsPage = async () => {
  const consultationsFromDb = await prisma.consultation.findMany({
    orderBy: { visit_date: "desc" },
    include: { registration: true }, // Prisma includes with capital 'R'
  });

  if (!consultationsFromDb || consultationsFromDb.length === 0) {
    return <div>No consultations found</div>;
  }

  const consultationsForTable = consultationsFromDb.map((consultation) => {
    const { registration, ...restOfConsultation } = consultation;
    return {
      ...restOfConsultation,
      registration: registration ?? null,
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
