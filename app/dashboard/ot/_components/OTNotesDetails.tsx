import { OT } from "@/generated/prisma";
import { DataList } from "@radix-ui/themes";
import React from "react";

interface Props {
  ot: OT;
}
const OTNotesDetails = ({ ot }: Props) => {
  return (
    <>
      <DataList.Root className="w-full bg-jade-50 p-4">
        <DataList.Item>
          <DataList.Label>Procedure</DataList.Label>
          <DataList.Value>{ot.procedure_name}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Procedure Date</DataList.Label>
          <DataList.Value>
            {ot.surgery_date?.toLocaleDateString("en-GB")}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Surgeon</DataList.Label>
          <DataList.Value>{ot.surgeon}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Assistant 1</DataList.Label>
          <DataList.Value>{ot.assistant_1}</DataList.Value>
        </DataList.Item>
        {ot.assistant_2 && (
          <DataList.Item>
            <DataList.Label>Assistant 2</DataList.Label>
            <DataList.Value>{ot.assistant_2}</DataList.Value>
          </DataList.Item>
        )}
        {ot.assistant_3 && (
          <DataList.Item>
            <DataList.Label>Assistant 3</DataList.Label>
            <DataList.Value>{ot.assistant_3}</DataList.Value>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.Label>Anaesthesia</DataList.Label>
          <DataList.Value>{ot.anaesthesia}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Anaesthetist</DataList.Label>
          <DataList.Value>{ot.anaesthetist}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Findings</DataList.Label>
          <DataList.Value>{ot.findings}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Procedure Details</DataList.Label>
          <DataList.Value>{ot.operative_details}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Closure</DataList.Label>
          <DataList.Value>{ot.closure}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Post Op Instructions</DataList.Label>
          <DataList.Value>{ot.postop_instructions}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </>
  );
};

export default OTNotesDetails;
