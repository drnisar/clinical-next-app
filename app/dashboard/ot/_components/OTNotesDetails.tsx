import { OT } from "@/generated/prisma";
import { Grid, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  ot: OT;
}

const OTNotesDetails = ({ ot }: Props) => {
  return (
    <div className="container">
      <Grid columns="8" gap="4" className="w-full">
        {/* Row 1: Procedure and Date */}
        <Text size="2" color="gray" className="col-span-1">
          Procedure
        </Text>
        <Text size="2" className="col-span-5">
          {ot.procedure_name}
        </Text>
        <Text size="2" color="gray" className="col-span-1 text-right">
          Date
        </Text>
        <Text size="2" className="col-span-1">
          {ot.surgery_date?.toLocaleDateString("en-GB")}
        </Text>

        {/* Row 2: Surgeon and Assistant 1 */}
        <Text size="2" color="gray" className="col-span-1">
          Surgeon
        </Text>
        <Text size="2" className="col-span-1">
          {ot.surgeon}
        </Text>
        <Text size="2" color="gray" className="col-span-1 text-right">
          Assistant 1
        </Text>
        <Text size="2" className="col-span-1">
          {ot.assistant_1}
        </Text>

        {ot.assistant_2 ? (
          <>
            {" "}
            <Text size="2" color="gray" className="col-span-1 text-right">
              {ot.assistant_2 ? "Assistant 2" : ""}
            </Text>
            <Text size="2" className="col-span-1">
              {ot.assistant_2 || ""}
            </Text>
          </>
        ) : (
          <div className="col-span-2"></div>
        )}
        {ot.assistant_3 ? (
          <>
            {" "}
            <Text size="2" color="gray" className="col-span-1 text-right">
              {ot.assistant_3 ? "Assistant 3" : ""}
            </Text>
            <Text size="2" className="col-span-1">
              {ot.assistant_3 || ""}
            </Text>
          </>
        ) : (
          <div className="col-span-2"></div>
        )}

        {/* Row 4: Anaesthesia and Anaesthetist */}
        <div className="col-span-8 grid grid-cols-8 gap-4">
          <Text size="2" color="gray" className="col-span-1">
            Anaesthesia
          </Text>
          <Text size="2" className="col-span-1">
            {ot.anaesthesia}
          </Text>
          <Text size="2" color="gray" className="col-span-1 text-right">
            Anaesthetist
          </Text>
          <Text size="2" className="col-span-1">
            {ot.anaesthetist}
          </Text>
        </div>

        {/* Row 5: Findings */}
        <Text size="2" color="gray" className="col-span-1 whitespace-pre-line">
          Findings
        </Text>
        <Text size="2" className="col-span-7">
          {ot.findings}
        </Text>

        {/* Row 6: Operative Details */}
        <Text size="2" color="gray" className="col-span-1 whitespace-pre-line">
          Operative Details
        </Text>
        <Text size="2" className="col-span-7">
          {ot.operative_details}
        </Text>

        {/* Row 7: Closure */}
        <Text size="2" color="gray" className="col-span-1">
          Closure
        </Text>
        <Text size="2" className="col-span-7">
          {ot.closure}
        </Text>

        {/* Row 8: Postoperative Instructions */}
        <Text size="2" color="gray" className="col-span-1">
          Postoperative Instructions
        </Text>
        <Text size="2" className="col-span-7 whitespace-pre-line">
          {ot.postop_instructions}
        </Text>
      </Grid>
    </div>
  );
};

export default OTNotesDetails;
