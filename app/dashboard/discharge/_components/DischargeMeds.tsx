import { Flex } from "@radix-ui/themes";
import React from "react";
import { translate } from "@/app/dashboard/_components/appConstants";
import { Admission_Discharge } from "@/generated/prisma";

interface medsArray {
  dischargeMeds: Admission_Discharge["medications"];
}

const MedDetailsForSingleVisitId = ({ dischargeMeds }: medsArray) => {
  return (
    <div className="w-full">
      {dischargeMeds &&
        dischargeMeds.map((med) => (
          <Flex
            key={med.drug_name}
            gap="2"
            justify="between"
            direction="column"
            bottom={"2"}
            className="border-b border-jade-200 p-2 w-full"
          >
            <span>
              {med.drug_name.toUpperCase()} {med.drug_form?.toUpperCase()}
            </span>
            <div dir="rtl">
              {med.amount} {translate(med.drug_form)} {translate(med.route)}{" "}
              {translate(med.frequency)} {med.duration}{" "}
              {translate(med.interval)}{" "}
            </div>
          </Flex>
        ))}
    </div>
  );
};

export default MedDetailsForSingleVisitId;
