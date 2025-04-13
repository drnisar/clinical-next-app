"use client";
import { Box, Flex, Spinner, Tabs } from "@radix-ui/themes";
import React from "react";
import DischargeForm from "./DischargeForm";
// import { Admission_Discharge } from "@prisma/client";
import {
  DiagnosticProcedures,
  DischargeSummary,
  HospitalInvestigations,
  Instructions,
  MedicalRest,
  TherapeuticProcudures,
} from "./DischargeNotes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DischargeMedsTab from "./DischargeMedsTab";

const DischargeTabs = ({ admission_id }: { admission_id: number }) => {
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
  if (isPending) return <Spinner size={"3"} />;
  if (isError) return <div>Error fetching admission</div>;

  return (
    <>
      <DischargeForm admission={admission} />
      <Tabs.Root orientation="vertical" defaultValue="Status">
        <Flex className="min-h-[200px]">
          <Box className="w-1/6 bg-teal-50">
            <Tabs.List className="flex md:flex-col md:items-start">
              <Tabs.Trigger value="Hospital Stay Summary">
                {" "}
                Hospital Stay Summary
              </Tabs.Trigger>
              <Tabs.Trigger value="Investigations Done in Hospital">
                {" "}
                Investigations in Hospital
              </Tabs.Trigger>
              <Tabs.Trigger value="Diagnostic Procedures">
                {" "}
                Diagnostic Procedures
              </Tabs.Trigger>
              <Tabs.Trigger value="Therapeutic Procedures">
                {" "}
                Therapeutic Procedures
              </Tabs.Trigger>
              <Tabs.Trigger value="Medications"> Medications</Tabs.Trigger>
              <Tabs.Trigger value="Instructions"> Instructions</Tabs.Trigger>
              <Tabs.Trigger value="Medical Rest"> Medical Rest</Tabs.Trigger>
              <Tabs.Trigger value="Follow up Appointment">
                {" "}
                Follow up Appointment
              </Tabs.Trigger>
            </Tabs.List>
          </Box>
          <Box className="w-4/5 pl-4 min-h-[500px] ">
            <Tabs.Content value="Hospital Stay Summary">
              <DischargeSummary
                defaultValue={admission.discharge_summary || ""}
                admission_id={admission.admission_id}
              />
            </Tabs.Content>
            <Tabs.Content value="Investigations Done in Hospital">
              <HospitalInvestigations
                defaultValue={admission.hospital_investigations || ""}
                admission_id={admission.admission_id}
              />
            </Tabs.Content>
            <Tabs.Content value="Diagnostic Procedures">
              <DiagnosticProcedures
                defaultValue={admission.diagnostic_procedures || ""}
                admission_id={admission.admission_id}
              />
            </Tabs.Content>
            <Tabs.Content value="Therapeutic Procedures">
              <TherapeuticProcudures
                defaultValue={admission.therapeutic_procedures || ""}
                admission_id={admission.admission_id}
              />
            </Tabs.Content>
            <Tabs.Content value="Medications">
              <DischargeMedsTab
                // defaultValue={admission.therapeutic_procedures || ""}
                admission_id={admission.admission_id}
              />
            </Tabs.Content>
            <Tabs.Content value="Instructions">
              <Instructions
                defaultValue={admission.instructions || ""}
                admission_id={admission.admission_id}
              />
            </Tabs.Content>
            <Tabs.Content value="Medical Rest">
              <MedicalRest
                defaultValue={admission.medical_leave || ""}
                admission_id={admission.admission_id}
              />
            </Tabs.Content>
          </Box>
        </Flex>
      </Tabs.Root>
    </>
  );
};

export default DischargeTabs;
