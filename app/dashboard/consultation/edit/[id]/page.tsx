import prisma from "@/prisma/client";
import React from "react";
import MedsForm from "../../_components/MedsForm";
import ButtonPrintPreview from "../../_components/ButtonPrintPreview";
import RegistrationDetailsCard from "@/app/dashboard/registration/_components/RegistrationDetailsCard";
import { Flex, Tabs } from "@radix-ui/themes";
import ConsultationTabs from "../../_components/ConsultationTabs";
import { Instructions } from "../../_components/ConsultationNotes";
import AppointmentsTab from "../../_components/AppointmentsTab";

const ConsultationEditPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { type: string };
}) => {
  const { id } = await params;
  const consultation = await prisma.clinic_Visit.findUnique({
    where: {
      visit_id: parseInt(id),
    },
  });

  const registration = await prisma.registration.findUnique({
    where: {
      registration_id: consultation?.registration_id,
    },
  });

  if (!registration) {
    return <div>Registration not found</div>;
  }

  if (!consultation) {
    return <div>Consultation not found</div>;
  }
  return (
    <>
      <Flex justify="end">
        <ButtonPrintPreview consultation_id={id} />
      </Flex>
      <RegistrationDetailsCard registration={registration} />

      <Tabs.Root defaultValue="consultation">
        <Tabs.List>
          <Tabs.Trigger value="consultation">Consultation</Tabs.Trigger>
          <Tabs.Trigger value="medications">Medications</Tabs.Trigger>
          <Tabs.Trigger value="instructions">Instructions</Tabs.Trigger>
          <Tabs.Trigger value="appointment">Appointment</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="consultation">
          <ConsultationTabs visit_id={parseInt(id)} />
        </Tabs.Content>
        <Tabs.Content value="medications">
          <MedsForm visit_id={parseInt(id)} />
        </Tabs.Content>
        <Tabs.Content value="instructions">
          <Instructions
            defaultValue={consultation.instructions || ""}
            visit_id={consultation.visit_id}
            registration_id={consultation.registration_id}
          />
        </Tabs.Content>
        <Tabs.Content value="appointment">
          <AppointmentsTab
            registration_id={registration.registration_id}
            visit_id={parseInt(id)}
            type={searchParams.type}
          />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default ConsultationEditPage;
