import { getConsultations } from "@/app/actions/actions";
import { Flex } from "@radix-ui/themes";
import { Suspense } from "react";
import ConsultationsTable from "./_components/ConsultationsTable";
import ConsultationPageSkeleton from "./_skeletons/ConsultationPageSkeleton";

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
        </Flex>
        <ConsultationsTable consultations={consultations} />
      </Suspense>
    </>
  );
};

export default ConsultationsPage;
