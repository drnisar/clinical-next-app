import prisma from "@/prisma/client";
import { Card } from "@radix-ui/themes";
import React from "react";

const SurgicalProceduresForSingleReg = async ({
  registration_id,
}: {
  registration_id: string;
}) => {
  const admissions = await prisma.admission_Discharge.findMany({
    where: { registration_id: registration_id },
  });
  const admission_ids = admissions.map((admission) => admission.admission_id);
  const procedures = admission_ids.map(async (admission_id) => {
    const surgical_procedures = await prisma.oT.findMany({
      where: { admission_id: admission_id },
    });
    console.log("Surgical Procedures", surgical_procedures);
  });
  return (
    <Card>
      <div>{JSON.stringify(procedures)}</div>
    </Card>
  );
};

export default SurgicalProceduresForSingleReg;
