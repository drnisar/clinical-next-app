import React from "react";
import SingleConsultationDetails from "../_components/SingleConsultationDetails";
import { Box, Flex } from "@radix-ui/themes";
import ConsultantHeader from "../_components/ConsultantHeader";
import ButtonPrintPage from "../_components/ButtonPrintPage";
import ButtonEditPage from "../_components/ButtonEditPage";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

const SingleConsultationPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = await params.id;
  const consultation = await prisma.consultation.findUnique({
    where: { consultation_id: id },
  });
  if (!consultation) {
    return <div>Consultation not found</div>;
  }

  const meds = consultation.medications;
  if (!meds) {
    return <div>Medications not found</div>;
  }

  const registration = await prisma.registration.findUnique({
    where: { registration_id: consultation.registration_id },
  });

  if (!registration) {
    return <div>Registration not found</div>;
  }

  const appointment = await prisma.appointment.findFirst({
    where: { appointment_id: id },
  });

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
        <SingleConsultationDetails
          registration={registration}
          medications={meds}
          consultation={consultation}
          appointment={appointment || null}
        />
      </Box>
    </main>
  );
};

export default SingleConsultationPage;
