import prisma from "@/prisma/client";
import { Button, Card, DataList, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import ButtonCreateNewOTNotes from "../../ot/_components/ButtonCreateNewOTNotes";

const AdmissionDetailsForSingleAdmission = async ({
  params,
}: {
  params: { id: number };
}) => {
  const admission = await prisma.admission_Discharge.findUnique({
    where: { admission_id: await params.id },
  });
  const ots = await prisma.ot.findMany({
    where: { admission_id: admission?.admission_id },
  });
  return (
    <>
      <Card className="border-1 p-2">
        <Flex justify="between">
          <Heading size={"3"} className="pb-5">
            Current Admission Details
          </Heading>
          <Link
            href={`/dashboard/discharge/${admission?.admission_id}`}
            className="btn btn-primary items-end"
            prefetch
          >
            <Button size="1" color="red" variant="soft">
              Discharge
            </Button>
          </Link>
        </Flex>
        <DataList.Root className="pb-5">
          <DataList.Item>
            <DataList.Label>Admission Date</DataList.Label>
            <DataList.Value>
              {admission?.admission_date?.toLocaleString()}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Admission Mode</DataList.Label>
            <DataList.Value>{admission?.admission_mode}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Bed Number</DataList.Label>
            <DataList.Value>{admission?.bed_number}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Ward</DataList.Label>
            <DataList.Value>{admission?.ward}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
        {ots.length > 0 ? (
          <>
            <Flex justify={"between"}>
              <Heading size={"2"} className="pb-5">
                Procedures / Operation Notes
              </Heading>
              <ButtonCreateNewOTNotes />
            </Flex>
            <DataList.Root>
              {ots.map((ot) => (
                <DataList.Item key={ot.ot_id}>
                  <DataList.Label>
                    {ot.surgery_date?.toLocaleDateString()}
                  </DataList.Label>
                  <Flex justify={"between"}>
                    <DataList.Value>{ot.procedure_name}</DataList.Value>
                    {ot.finalize === 1 ? (
                      <Button asChild size={"1"} variant="soft" color="blue">
                        <Link href={"/dashboard/ot/" + ot.ot_id}>Details</Link>
                      </Button>
                    ) : (
                      <Button asChild size={"1"} variant="soft" color="red">
                        <Link href={"/dashboard/ot/" + ot.ot_id}>Edit</Link>
                      </Button>
                    )}
                  </Flex>
                </DataList.Item>
              ))}
            </DataList.Root>
          </>
        ) : (
          <ButtonCreateNewOTNotes />
        )}
      </Card>
    </>
  );
};

export default AdmissionDetailsForSingleAdmission;
