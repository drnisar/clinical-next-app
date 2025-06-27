"use client";
import { OT } from "@/generated/prisma";
import { Button, Card, Flex, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

interface Props {
  OT: OT[];
}

const SurgicalProceduresForSingleReg = ({ OT }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [navigatingOTId, setNavigatingOTId] = useState("");
  const buttonClick = (OTId: string) => {
    setNavigatingOTId(OTId);
    startTransition(() => {
      router.push(`/dashboard/ot/${OTId}`);
    });
  };
  return (
    <Card>
      <Flex justify="between" align="center">
        {" "}
        <Heading size="3">
          Surgical Procedures {OT.length === 0 && `(No Procedures found)`}
        </Heading>
      </Flex>
      {OT.map((procedure) => (
        <Flex key={procedure.ot_id} mt="3" justify="between" p="2">
          <Flex gap="3">
            <Heading size="2">
              {procedure.surgery_date?.toLocaleDateString("en-GB") || "N/A"}
            </Heading>
            <Heading size="2">{procedure.procedure_name}</Heading>
          </Flex>

          <Button
            variant="soft"
            color="blue"
            size="1"
            disabled={navigatingOTId === procedure.ot_id}
            loading={isPending && navigatingOTId === procedure.ot_id}
            onClick={() => buttonClick(procedure.ot_id)}
          >
            Details
          </Button>
        </Flex>
      ))}
    </Card>
  );
};

export default SurgicalProceduresForSingleReg;
