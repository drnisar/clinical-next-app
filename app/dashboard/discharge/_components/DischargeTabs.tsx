"use client";
import { Box, Flex, Spinner, Tabs } from "@radix-ui/themes";
import React, { useState } from "react";
import DischargeForm from "./DischargeForm";
// import { Admission_Discharge } from "@prisma/client";
import {
  Diagnosis,
  DiagnosticProcedures,
  DischargeSummary,
  HospitalInvestigations,
  Instructions,
  MedicalRest,
  TherapeuticProcudures,
} from "./DischargeNotes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MedicationsForm from "../../_components/MedicationsForm";

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

const DischargeTabs = ({ admission_id }: { admission_id: string }) => {
  const [activeTab, setActiveTab] = useState(tabValues[0]);
  const {
    data: admission,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admission"],
    queryFn: async () => {
      const response = await axios.get("/api/admission/" + admission_id);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSaveSuccess = () => {
    // alert("alerted");
    const currentIndex = tabValues.indexOf(activeTab);
    if (currentIndex < tabValues.length - 1) {
      // Check if not the last tab
      const nextTab = tabValues[currentIndex + 1];
      setActiveTab(nextTab); // Switch to the next tab
    }
  };
  if (isPending) return <Spinner size={"3"} />;
  if (isError) return <div>Error fetching admission</div>;

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
              <TherapeuticProcudures
                defaultValue={admission.therapeutic_procedures || ""}
                admission_id={admission.admission_id}
                onSave={handleSaveSuccess}
              />
            </Tabs.Content>
            <Tabs.Content value="Medications">
              {/* <DischargeMedsTab
                // defaultValue={admission.therapeutic_procedures || ""}
                admission_id={admission.admission_id}
              /> */}
              <MedicationsForm
                medications={admission.medications}
                slug="/api/admission"
                id={admission.admission_id}
              />
            </Tabs.Content>
            <Tabs.Content value="Instructions">
              <Instructions
                defaultValue={admission.instructions || ""}
                admission_id={admission.admission_id}
                onSave={handleSaveSuccess}
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
