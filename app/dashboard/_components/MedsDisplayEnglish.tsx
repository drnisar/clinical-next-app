import { Medication } from "@/generated/prisma";
import { Heading } from "@radix-ui/themes";
import React from "react";
interface Props {
  meds: Medication[];
}
const MedsDisplayEnglish = ({ meds }: Props) => {
  return (
    <div>
      {meds.length > 0 && (
        <div>
          <Heading size="2">Medications</Heading>
          {meds.map((med, index) => (
            <div key={index} className="text-xs flex gap-2 pl-4">
              <span className="uppercase">{med.drug_name}</span>
              <span>{med.drug_dose}</span>
              <span>{med.drug_form}</span>
              <span>{med.route?.toUpperCase()}</span>
              <span>{med.frequency?.toUpperCase()}</span>
              <span>{med.duration + " "}</span>
              <span>{med.interval?.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedsDisplayEnglish;
