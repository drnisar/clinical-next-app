import { OT } from "@/generated/prisma";
import React from "react";
import { dateDDMMMYY } from "../../_components/appConstants";

interface Props {
  otNotesArray: OT[];
}

const OTNotesForDischargeSlip = ({ otNotesArray }: Props) => {
  return (
    <div>
      {otNotesArray.length > 0 &&
        otNotesArray.map((ot) => (
          <div key={ot.ot_id}>
            <div>
              <span className="font-semibold">Operation Date: </span>
              <span>{dateDDMMMYY(ot.surgery_date)}</span>
            </div>
            <div>
              <span className="font-semibold">Procedure: </span>
              <span>{ot.procedure_name}</span>
            </div>
            <div>
              <span className="font-semibold">Findings: </span>
              <span>{ot.findings}</span>
            </div>
            <div>
              <span className="font-semibold">Operative Details: </span>
              <span>{ot.operative_details}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OTNotesForDischargeSlip;
