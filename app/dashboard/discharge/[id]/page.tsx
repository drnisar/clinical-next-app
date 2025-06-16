import DischargeTabs from "../_components/DischargeTabs";
import prisma from "@/prisma/client";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import { Button, Flex, Link, Spinner } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: {
    id: string;
  };
}

const NewDischargePage = async ({ params }: Props) => {
  const admission = await prisma.admission_Discharge.findUnique({
    where: { admission_id: params.id },
  });
  if (!admission) return notFound();
  const registration = await prisma.registration.findUnique({
    where: {
      registration_id: admission.registration_id,
    },
  });
  if (!registration) return null;

  return (
    <Suspense fallback={<Spinner />}>
      <Flex gap={"2"} justify={"end"}>
        <Link
          href={`/dashboard/discharge/discharge_slip/${admission.admission_id}`}
        >
          <Button
            variant="soft"
            color="grass"
            disabled={admission.status !== "DISCHARGED"}
          >
            Print Discharge Slip
          </Button>
        </Link>
      </Flex>
      <RegistrationDetailsCard registration={registration} />
      <DischargeTabs admission_id={params.id} />
    </Suspense>
  );
};

export default NewDischargePage;
