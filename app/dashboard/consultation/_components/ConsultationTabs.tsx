"use client";
import { Consultation, MedsTemplate } from "@/generated/prisma";
import { Flex, Tabs } from "@radix-ui/themes";
import MedicationsForm from "../../_components/MedicationsForm";
import AppointmentsTab from "./AppointmentsTab";
import ConsultationExaminationForm from "./ConsultationExaminationForm";
import ConsultationInvestigationsForm from "./ConsultationInvestigationsForm";
import InstructionsArray from "./InstructionsArray";
import ConsultationHistoryForm from "./ConsultationHistoryForm";
import ConsultationDiagnosisForm from "./ConsultationDiagnosisForm";
import ConsultationPlanForm from "./ConsultationPlanForm";

interface Props {
  consultation: Consultation;
  type: string;
  templates: MedsTemplate[];
}

type Instruction = {
  instruction: string;
};
const ConsultationTabs = ({ consultation, type, templates }: Props) => {
  return (
    <>
      <Flex gap={"8"}>
        <Tabs.Root defaultValue="history">
          <Tabs.List>
            <Flex direction={"column"}>
              <Flex>
                <Tabs.Trigger value="history">History</Tabs.Trigger>
                <Tabs.Trigger value="examinations">Examinations</Tabs.Trigger>
                <Tabs.Trigger value="investigations">
                  Investigations
                </Tabs.Trigger>
                <Tabs.Trigger value="diagnosis">Diagnosis</Tabs.Trigger>
                <Tabs.Trigger value="plan">Plan</Tabs.Trigger>
                <Tabs.Trigger value="medications">Medications</Tabs.Trigger>
              </Flex>
              <Flex>
                <Tabs.Trigger value="instructions">Instructions</Tabs.Trigger>
                <Tabs.Trigger value="appointment">Appointment</Tabs.Trigger>
              </Flex>
            </Flex>
          </Tabs.List>
          <Tabs.Content value="history">
            <ConsultationHistoryForm
              defaultValue={consultation.history || ""}
              consultation_id={consultation.consultation_id}
              registration_id={consultation.registration_id}
              slug={"/api/consultation"}
            />
          </Tabs.Content>
          <Tabs.Content value="examinations">
            <ConsultationExaminationForm
              examinations={consultation.examination}
              slug="/api/consultation"
              id={consultation.consultation_id}
            />
          </Tabs.Content>
          <Tabs.Content value="investigations">
            <ConsultationInvestigationsForm
              investigations={consultation.investigations}
              slug="/api/consultation"
              id={consultation.consultation_id}
            />
          </Tabs.Content>
          <Tabs.Content value="diagnosis">
            <ConsultationDiagnosisForm
              defaultValue={consultation.diagnosis || ""}
              consultation_id={consultation.consultation_id}
              registration_id={consultation.registration_id}
              slug="/api/consultation"
            />
          </Tabs.Content>
          <Tabs.Content value="plan">
            <ConsultationPlanForm
              defaultValue={consultation.plan || ""}
              consultation_id={consultation.consultation_id}
              registration_id={consultation.registration_id}
              slug="/api/consultation"
            />
          </Tabs.Content>
          <Tabs.Content value="medications">
            <MedicationsForm
              slug="/api/consultation"
              id={consultation.consultation_id}
              medications={consultation.medications || []}
              templates={templates}
            />
          </Tabs.Content>
          <Tabs.Content value="instructions">
            <InstructionsArray
              instructions={
                Array.isArray(consultation.instructions)
                  ? (consultation.instructions as Instruction[])
                  : []
              }
              id={consultation.consultation_id}
              slug="/api/consultation"
            />
          </Tabs.Content>
          <Tabs.Content value="appointment">
            <AppointmentsTab
              registration_id={consultation.registration_id}
              consultation_id={consultation.consultation_id}
              type={type}
            />
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </>
  );
};

export default ConsultationTabs;
