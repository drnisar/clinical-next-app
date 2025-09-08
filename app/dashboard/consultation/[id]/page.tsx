import React from "react";
import SingleConsultationDetails from "../_components/SingleConsultationDetails";
import { Box, Flex } from "@radix-ui/themes";
import ConsultantHeader from "../_components/ConsultantHeader";
import ButtonPrintPage from "../_components/ButtonPrintPage";
import ButtonEditPage from "../_components/ButtonEditPage";
import { prisma } from "@/lib/prisma";
import ConsultantFooter from "../_components/ConsultantFooter";

const SingleConsultationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
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
    where: { registration_id: registration.registration_id },
  });

  return (
    <div>
      <main className="print-container ">
        <header>
          <Flex gap="2" justify="end">
            <ButtonEditPage params={id} />
            <ButtonPrintPage />
          </Flex>
          <ConsultantHeader />
        </header>

        <Box className="">
          <SingleConsultationDetails
            registration={registration}
            medications={meds}
            consultation={consultation}
            appointment={appointment || undefined}
          />
        </Box>
      </main>
      <footer className="print:fixed print:bottom-0 print:left-0 print:w-full hidden print:block">
        <ConsultantFooter />
      </footer>
    </div>
  );
};

export default SingleConsultationPage;
