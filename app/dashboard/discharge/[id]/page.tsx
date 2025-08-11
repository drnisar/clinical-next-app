import DischargeTabs from "../_components/DischargeTabs";
import prisma from "@/prisma/client";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import { Button, Flex, Link, Spinner } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMedsTemplates } from "@/app/actions/actions";
import DischargePageProvider from "./_components/DischargePageProvider";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const NewDischargePage = async ({ params }: Props) => {
  const { id } = await params;
  const admission = await prisma.admission_Discharge.findUnique({
    where: { admission_id: id },
  });
  if (!admission) return notFound();
  const registration = await prisma.registration.findUnique({
    where: {
      registration_id: admission.registration_id,
    },
  });
  if (!registration) return null;

  const templates = await getMedsTemplates();

  const otNotesArray = await prisma.oT.findMany({
    where: {
      admission_id: admission.admission_id,
    },
  });

  if (!otNotesArray) return null;

  return (
    <DischargePageProvider
      admission={admission}
      registration={registration}
      templates={templates}
      otNotesArray={otNotesArray}
    >
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
        <DischargeTabs admission={admission} templates={templates} />
      </Suspense>
    </DischargePageProvider>
  );
};

export default NewDischargePage;
