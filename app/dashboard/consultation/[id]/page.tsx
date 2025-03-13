import React from "react";
import SingleConsultationDetails from "../_components/SingleConsultationDetails";
import prisma from "@/prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import ConsultantHeader from "../_components/ConsultantHeader";
import ButtonPrintPage from "../_components/ButtonPrintPage";
import ButtonEditPage from "../_components/ButtonEditPage";

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
    <main>
      <header>
        <Flex gap="2" justify="end">
          <ButtonEditPage params={id} />
          <ButtonPrintPage />
        </Flex>
        <ConsultantHeader />
      </header>

      <Box>
        <SingleConsultationDetails meds={meds} consultation={consultation} />
      </Box>
    </main>
  );
};

export default SingleConsultationPage;
