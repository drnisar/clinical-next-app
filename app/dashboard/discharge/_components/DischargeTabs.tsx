"use client";
import { Box, Flex, Tabs } from "@radix-ui/themes";
import { useState } from "react";
import DischargeForm from "./DischargeForm";
// import { Admission_Discharge } from "@prisma/client";
import { Admission_Discharge, MedsTemplate } from "@/generated/prisma";
import MedicationsForm from "../../_components/MedicationsForm";
import InstructionsArray from "../../consultation/_components/InstructionsArray";
import {
  Diagnosis,
  DiagnosticProcedures,
  DischargeSummary,
  HospitalInvestigations,
  MedicalRest,
  // TherapeuticProcudures,
} from "./DischargeNotes";
import { TherapeuticProceduresTab } from "../_tabs/TherapeuticProceduresTab";
// import OTNotesForDischargeSlip from "../../ot/_components/OTNotesForDischargeSlip";

const tabValues = [
  "Diagnosis / es",
  "Hospital Stay Summary",
  "Investigations Done in Hospital",
  "Diagnostic Procedures",
  "Therapeutic Procedures",
  "Medications",
  "Instructions",
  "Medical Rest",
  "Follow up Appointment", // Assuming this tab will have content later
];

type Instruction = {
  instruction: string;
};
interface Props {
  admission: Admission_Discharge;
  templates: MedsTemplate[];
  otNotes?: string;
}

const DischargeTabs = ({ admission, templates }: Props) => {
  const [activeTab, setActiveTab] = useState(tabValues[0]);

  const handleSaveSuccess = () => {
    const currentIndex = tabValues.indexOf(activeTab);
    if (currentIndex < tabValues.length - 1) {
      const nextTab = tabValues[currentIndex + 1];
      setActiveTab(nextTab); // Switch to the next tab
    }
  };

  return (
    <>
      <DischargeForm admission={admission} />
      <Tabs.Root
        orientation="vertical"
        defaultValue="Status"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <Flex className="min-h-[200px]">
          <Box className="w-1/6 bg-teal-50 dark:bg-transparent">
            <Tabs.List className="flex md:flex-col md:items-start">
              {tabValues.map((value) => (
                <Tabs.Trigger value={value} key={value}>
                  {value}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Box>
          <Box className="w-4/5 pl-4 min-h-[500px] ">
            <Tabs.Content value="Diagnosis / es">
              <Diagnosis
                defaultValue={admission.diagnosis || ""}
                admission_id={admission.admission_id}
                onSave={handleSaveSuccess}
              />
            </Tabs.Content>
            <Tabs.Content value="Hospital Stay Summary">
              <DischargeSummary
                defaultValue={admission.discharge_summary || ""}
                admission_id={admission.admission_id}
                onSave={handleSaveSuccess}
              />
            </Tabs.Content>
            <Tabs.Content value="Investigations Done in Hospital">
              <HospitalInvestigations
                defaultValue={admission.hospital_investigations || ""}
                admission_id={admission.admission_id}
                onSave={handleSaveSuccess}
              />
            </Tabs.Content>
            <Tabs.Content value="Diagnostic Procedures">
              <DiagnosticProcedures
                defaultValue={admission.diagnostic_procedures || ""}
                admission_id={admission.admission_id}
                onSave={handleSaveSuccess}
              />
            </Tabs.Content>
            <Tabs.Content value="Therapeutic Procedures">
              <TherapeuticProceduresTab
                defaultValue={admission.therapeutic_procedures || ""}
                admission_id={admission.admission_id}
                onSave={handleSaveSuccess}
              />
              {/* <OTNotesForDischargeSlip otNotesArray={otNotesArray ?? []} /> */}
            </Tabs.Content>
            <Tabs.Content value="Medications">
              <MedicationsForm
                medications={admission.medications}
                slug="/api/admission"
                id={admission.admission_id}
                templates={templates || []}
              />
            </Tabs.Content>
            <Tabs.Content value="Instructions">
              <InstructionsArray
                instructions={admission.instructions as Instruction[]}
                slug="/api/admission"
                id={admission.admission_id}
              />
            </Tabs.Content>
            <Tabs.Content value="Medical Rest">
              <MedicalRest
                defaultValue={admission.medical_leave || ""}
                admission_id={admission.admission_id}
                onSave={handleSaveSuccess}
              />
            </Tabs.Content>
          </Box>
        </Flex>
      </Tabs.Root>
    </>
  );
};

export default DischargeTabs;
