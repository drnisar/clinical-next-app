import React from "react";
import SingleConsultationDetails from "../_components/SingleConsultationDetails";
import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";

const SingleConsultationPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = await params.id;
  const consultation = await prisma.clinic_Visit.findUnique({
    where: { visit_id: parseInt(id) },
  });
  if (!consultation) {
    return <div>Consultation not found</div>;
  }

  const meds = await prisma.consultationMedications.findMany({
    where: { visit_id: parseInt(id) },
  });
  if (!meds) {
    return <div>Medications not found</div>;
  }
  return (
    <Box p="5">
      <SingleConsultationDetails meds={meds} consultation={consultation} />
    </Box>
  );
};

export default SingleConsultationPage;
