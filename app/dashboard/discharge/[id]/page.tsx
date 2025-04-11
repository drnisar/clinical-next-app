import DischargeTabs from "../_components/DischargeTabs";
import prisma from "@/prisma/client";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import { Button, Flex, Link } from "@radix-ui/themes";

interface Props {
  params: {
    id: string;
  };
}

const NewDischargePage = async ({ params }: Props) => {
  const admission = await prisma.admission_Discharge.findUnique({
    where: { admission_id: parseInt(params.id) },
  });
  if (!admission) return <div>No admission found</div>;
  const registration = await prisma.registration.findUnique({
    where: {
      registration_id: admission.registration_id,
    },
  });
  if (!registration) return null;
  return (
    <>
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
      <DischargeTabs admission_id={parseInt(params.id)} />
    </>
  );
};

export default NewDischargePage;
