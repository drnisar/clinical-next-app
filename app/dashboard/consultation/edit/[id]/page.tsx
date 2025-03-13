import prisma from "@/prisma/client";
import React from "react";
import ConsultationForm from "../../_components/ConsultationForm";
import MedsForm from "../../_components/MedsForm";
import ButtonPrintPreview from "../../_components/ButtonPrintPreview";
// import { Tabs } from "radix-ui";
import RegistrationDetailsCard from "@/app/dashboard/registration/_components/RegistrationDetailsCard";
import { Flex, Tabs } from "@radix-ui/themes";
import ConsultationInstructionsForm from "../../_components/ConsultationInstructionsForm";

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
      <Flex justify="end">
        <ButtonPrintPreview consultation_id={id} />
      </Flex>
      <RegistrationDetailsCard
        registration_id={consultation.registration_id.toString()}
      />

      <Tabs.Root defaultValue="consultation">
        <Tabs.List>
          <Tabs.Trigger value="consultation">Consultation</Tabs.Trigger>
          <Tabs.Trigger value="medications">Medications</Tabs.Trigger>
          <Tabs.Trigger value="instructions">Instructions</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="consultation">
          <Tabs.List>
            <Tabs.Trigger value="sub tab">sub tab</Tabs.Trigger>
            <Tabs.Content value="sub tab">SUB TAB</Tabs.Content>
          </Tabs.List>
          <ConsultationForm
            registration_id={consultation?.registration_id}
            consultation={consultation}
          />
        </Tabs.Content>
        <Tabs.Content value="medications">
          <MedsForm visit_id={parseInt(id)} />
        </Tabs.Content>
        <Tabs.Content value="instructions">
          <ConsultationInstructionsForm
            consultation={consultation}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
      </Tabs.Root>
      {/* <ConsultationForm
        registration_id={consultation?.registration_id}
        consultation={consultation}
      />
      <MedsForm visit_id={parseInt(id)} /> */}
    </>
  );
};

export default ConsultationEditPage;
