import prisma from "@/prisma/client";
import React from "react";
import ConsultationForm from "../../_components/ConsultationForm";
import MedsForm from "../../_components/MedsForm";
import ButtonPrintPreview from "../../_components/ButtonPrintPreview";

const ConsultationEditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const consultation = await prisma.clinic_Visit.findUnique({
    where: {
      visit_id: parseInt(id),
    },
  });
  if (!consultation) {
    return <div>Consultation not found</div>;
  }
  return (
    <>
      <ButtonPrintPreview consultation_id={id} />
      <ConsultationForm
        registration_id={consultation?.registration_id}
        consultation={consultation}
      />
      <MedsForm visit_id={parseInt(id)} />
    </>
  );
};

export default ConsultationEditPage;
