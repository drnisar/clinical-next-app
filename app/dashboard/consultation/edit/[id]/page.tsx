import React from "react";
import ButtonPrintPreview from "../../_components/ButtonPrintPreview";
import RegistrationDetailsCard from "@/app/dashboard/registration/_components/RegistrationDetailsCard";
import { Flex, Tabs } from "@radix-ui/themes";
import ConsultationTabs from "../../_components/ConsultationTabs";
import AppointmentsTab from "../../_components/AppointmentsTab";
import MedicationsForm from "@/app/dashboard/_components/MedicationsForm";
import {
  getConsultationById,
  getRegistrationById,
} from "@/app/actions/actions";
import InstructionsArray from "../../_components/InstructionsArray";

const ConsultationEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string }>;
}) => {
  const { id } = await params;
  const { type } = await searchParams;

  const consultation = await getConsultationById(id);
  if (!consultation) {
    return <div>Consultation not found</div>;
  }
  const registration = await getRegistrationById(consultation?.registration_id);
  if (!registration) {
    return <div>Registration not found</div>;
  }

  return (
    <>
      <Flex justify="end">
        <ButtonPrintPreview consultation_id={id} />
      </Flex>
      <RegistrationDetailsCard registration={consultation?.registration} />

      <Tabs.Root defaultValue="consultation">
        <Tabs.List>
          <Tabs.Trigger value="consultation">Consultation</Tabs.Trigger>
          <Tabs.Trigger value="medications">Medications</Tabs.Trigger>
          <Tabs.Trigger value="instructions">Instructions</Tabs.Trigger>
          <Tabs.Trigger value="appointment">Appointment</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="consultation">
          <ConsultationTabs consultation_id={consultation.consultation_id} />
        </Tabs.Content>
        <Tabs.Content value="medications">
          <MedicationsForm
            slug="/api/consultation"
            id={consultation.consultation_id}
            medications={consultation.medications || []}
          />
        </Tabs.Content>
        <Tabs.Content value="instructions">
          <InstructionsArray
            consultation={consultation}
            slug="/api/consultation"
          />
        </Tabs.Content>
        <Tabs.Content value="appointment">
          <AppointmentsTab
            registration_id={registration.registration_id}
            consultation_id={consultation.consultation_id}
            type={type}
          />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default ConsultationEditPage;
