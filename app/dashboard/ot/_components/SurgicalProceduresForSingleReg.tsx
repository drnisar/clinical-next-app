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
  return (
    <Card>
      <div>surgical procedures</div>
    </Card>
  );
};

export default SurgicalProceduresForSingleReg;
