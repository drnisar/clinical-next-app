import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";

const SurgicalProceduresForSingleReg = async ({
  registration_id,
}: {
  registration_id: string;
}) => {
  const procedures = await prisma.oT.findMany({
    where: { registration_id: registration_id },
    orderBy: { surgery_date: "desc" },
  });
  if (procedures.length === 0) {
    return null;
  }
  return (
    <Card>
      <Heading size="3" mb="3">
        Surgical Procedures{" "}
      </Heading>
      {procedures.map((procedure) => (
        <Flex key={procedure.ot_id} mt="3">
          <Flex gap="3">
            <Heading size="2">
              {procedure.surgery_date?.toLocaleDateString()}
            </Heading>
            <Heading size="2">{procedure.procedure_name}</Heading>
          </Flex>
        </Flex>
      ))}
    </Card>
  );
};

export default SurgicalProceduresForSingleReg;
