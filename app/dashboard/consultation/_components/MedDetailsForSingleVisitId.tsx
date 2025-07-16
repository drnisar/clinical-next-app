import { Flex } from "@radix-ui/themes";
import React from "react";
import { translate } from "@/app/dashboard/_components/appConstants";
import { Medication } from "@/generated/prisma";

interface Props {
  meds: Medication[];
}

const MedDetailsForSingleVisitId = ({ meds }: Props) => {
  return (
    <div>
      {meds.map((med, index) => (
        <Flex
          key={med.drug_name}
          gap="2"
          justify="between"
          direction="column"
          bottom={"2"}
          className="border-b border-jade-200 p-2 w-full"
        >
          <span>
            {index + 1} {med.drug_name.toUpperCase()}{" "}
            {med.drug_form?.toUpperCase()}
          </span>
          <div dir="rtl">
            {med.amount} {translate(med.drug_form)} {translate(med.route)}{" "}
            {translate(med.frequency)} {med.duration} {translate(med.interval)}{" "}
          </div>
        </Flex>
      ))}
    </div>
  );
};

export default MedDetailsForSingleVisitId;
