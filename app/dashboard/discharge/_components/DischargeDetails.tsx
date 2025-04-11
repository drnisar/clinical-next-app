"use client";
import { Admission_Discharge, Discharge_Medications } from "@prisma/client";
import { DataList } from "@radix-ui/themes";
import React from "react";
import DischargeMeds from "./DischargeMeds";

interface Props {
  discharge: Admission_Discharge;
  dischargeMeds: Discharge_Medications[];
}

const DischargeDetails = ({
  discharge: {
    discharge_summary,
    hospital_investigations,
    diagnostic_procedures,
    therapeutic_procedures,
    instructions,
    medical_leave,
  },
  dischargeMeds,
}: Props) => {
  return (
    <>
      <DataList.Root className="w-full bg-jade-50 p-4">
        <DataList.Item>
          <DataList.Label>Discharge Summary</DataList.Label>
          <DataList.Value>{discharge_summary}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Investigations in Hospital</DataList.Label>
          <DataList.Value>{hospital_investigations}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Diagnostic Procedures</DataList.Label>
          <DataList.Value>{diagnostic_procedures}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Therapeutic Procedures</DataList.Label>
          <DataList.Value>{therapeutic_procedures}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Instructions</DataList.Label>
          <DataList.Value>
            <div>{instructions}</div>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Discharge Medications</DataList.Label>
          <DataList.Value>
            <DischargeMeds dischargeMeds={dischargeMeds} />
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Medical Leave</DataList.Label>
          <DataList.Value>{medical_leave}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </>
  );
};

export default DischargeDetails;
