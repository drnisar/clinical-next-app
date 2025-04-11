import { Discharge_Medications } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import React from "react";
import { translate } from "@/app/dashboard/_components/appConstants";

interface medsArray {
  dischargeMeds: Discharge_Medications[];
}

const MedDetailsForSingleVisitId = ({ dischargeMeds }: medsArray) => {
  return (
    <div className="w-full">
      {dischargeMeds &&
        dischargeMeds.map((med) => (
          <Flex
            key={med.dc_meds_id}
            gap="2"
            justify="between"
            direction="column"
            bottom={"2"}
            className="border-b border-jade-200 p-2 w-full"
          >
            <span>{med.med_name.toUpperCase()}</span>
            <div dir="rtl">
              {med.quantity} {translate(med.drug_form)}
              {"---"} {translate(med.route)}
              {"---"}
              {translate(med.frequency)}
              {"---"} {med.duration} {translate(med.interval)}{" "}
            </div>
          </Flex>
        ))}
    </div>
  );
};

export default MedDetailsForSingleVisitId;
