"use client";
import { Admission_Discharge } from "@/generated/prisma";
import { DataList } from "@radix-ui/themes";
import React from "react";
import DischargeMeds from "./DischargeMeds";

interface Props {
  discharge: Admission_Discharge;
}

const DischargeDetails = ({
  discharge: {
    diagnosis,
    discharge_summary,
    hospital_investigations,
    diagnostic_procedures,
    therapeutic_procedures,
    instructions,
    medical_leave,
    medications,
  },
}: Props) => {
  return (
    <>
      <DataList.Root className="w-full bg-jade-50 p-4">
        {diagnosis && (
          <DataList.Item>
            <DataList.Label>Diagnosis</DataList.Label>
            <DataList.Value>{diagnosis}</DataList.Value>
          </DataList.Item>
        )}
        {discharge_summary && (
          <DataList.Item>
            <DataList.Label>Discharge Summary</DataList.Label>
            <DataList.Value>{discharge_summary}</DataList.Value>
          </DataList.Item>
        )}
        {hospital_investigations && (
          <DataList.Item>
            <DataList.Label>Investigations in Hospital</DataList.Label>
            <DataList.Value>{hospital_investigations}</DataList.Value>
          </DataList.Item>
        )}
        {diagnostic_procedures && (
          <DataList.Item>
            <DataList.Label>Diagnostic Procedures</DataList.Label>
            <DataList.Value>{diagnostic_procedures}</DataList.Value>
          </DataList.Item>
        )}
        {therapeutic_procedures && (
          <DataList.Item>
            <DataList.Label>Therapeutic Procedures</DataList.Label>
            <DataList.Value>{therapeutic_procedures}</DataList.Value>
          </DataList.Item>
        )}
        {medications.length > 0 && (
          <DataList.Item>
            <DataList.Label>Discharge Medications</DataList.Label>
            <DataList.Value>
              <DischargeMeds dischargeMeds={medications} />
            </DataList.Value>
          </DataList.Item>
        )}
        {instructions && (
          <DataList.Item>
            <DataList.Label>Instructions</DataList.Label>
            <DataList.Value>
              <div>{instructions}</div>
            </DataList.Value>
          </DataList.Item>
        )}
        {medical_leave && (
          <DataList.Item>
            <DataList.Label>Medical Leave</DataList.Label>
            <DataList.Value>{medical_leave}</DataList.Value>
          </DataList.Item>
        )}
      </DataList.Root>
    </>
  );
};

export default DischargeDetails;
