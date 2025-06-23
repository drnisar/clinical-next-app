import React, { Suspense } from "react";
import ConsultationsTable from "./_components/ConsultationsTable";
import ConsultationPageSkeleton from "./_skeletons/ConsultationPageSkeleton";
import { getConsultations } from "@/app/actions/actions";

const ConsultationsPage = async () => {
  const consultations = await getConsultations();
  if (!consultations || consultations.length === 0) {
    return <div>No consultations found</div>;
  }

  return (
    <>
      <Suspense fallback={<ConsultationPageSkeleton />}>
        <ConsultationsTable consultations={consultations} />
      </Suspense>
    </>
  );
};

export default ConsultationsPage;
