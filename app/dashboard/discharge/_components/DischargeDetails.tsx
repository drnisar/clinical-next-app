"use client";
import { Admission_Discharge } from "@/generated/prisma";
import React from "react";
import DischargeMeds from "./DischargeMeds";
import { renderInstructions } from "../../_components/appConstsJSX";
import HeadingAndTextColumnWise from "../../_components/ui/HeadingAndTextColumnWise";
type Instruction = {
  instruction: string;
};
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
    <div className="px-4">
      {diagnosis && (
        <HeadingAndTextColumnWise heading="Diagnosis" text={diagnosis} />
      )}
      {discharge_summary && (
        <HeadingAndTextColumnWise
          heading="Discharge Summary"
          text={discharge_summary}
        />
      )}
      {hospital_investigations && (
        <HeadingAndTextColumnWise
          heading="Investigations in Hospital"
          text={hospital_investigations}
        />
      )}
      {diagnostic_procedures && (
        <HeadingAndTextColumnWise
          heading="Diagnostic Procedures"
          text={diagnostic_procedures}
        />
      )}
      {therapeutic_procedures && (
        <HeadingAndTextColumnWise
          heading="Therapeutic Procedures"
          text={therapeutic_procedures}
        />
      )}
      {medications.length > 0 && (
        <HeadingAndTextColumnWise heading="Discharge Medications">
          <DischargeMeds dischargeMeds={medications} />
        </HeadingAndTextColumnWise>
      )}
      {instructions &&
        (typeof instructions === "string" ||
          (Array.isArray(instructions) &&
            instructions.every(
              (item) =>
                typeof item === "string" ||
                (item !== null &&
                  typeof item === "object" &&
                  "instruction" in item)
            )) ||
          (typeof instructions === "object" &&
            instructions !== null &&
            "instruction" in instructions)) && (
          <HeadingAndTextColumnWise heading="Instructions">
            {renderInstructions(
              instructions as string | { instruction: string } | Instruction[]
            )}
          </HeadingAndTextColumnWise>
        )}
      {medical_leave && (
        <HeadingAndTextColumnWise
          heading="Medical Leave"
          text={medical_leave}
        />
      )}
    </div>
  );
};

export default DischargeDetails;
