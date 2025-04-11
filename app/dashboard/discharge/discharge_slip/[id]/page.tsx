import RegistrationDetailsCard from "@/app/dashboard/registration/_components/RegistrationDetailsCard";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import ButtonEditDischargePage from "../../_components/ButtonEditDischargePage";
import ButtonPrintPage from "../../_components/ButtonPrintPage";
import DischargeDetails from "../../_components/DischargeDetails";
import DischargeHeader from "../../_components/DischargeHeader";

const DischareSlip = async ({ params }: { params: { id: string } }) => {
  const discharge = await prisma.admission_Discharge.findUnique({
    where: {
      admission_id: parseInt(params.id),
    },
  });
  if (!discharge) {
    return <div>No discharge found</div>;
  }

  const registration = await prisma.registration.findUnique({
    where: {
      registration_id: discharge.registration_id,
    },
  });
  if (!registration) {
    return <div>No registration found</div>;
  }
  const dischargeMeds = await prisma.discharge_Medications.findMany({
    where: {
      admission_id: discharge.admission_id,
    },
  });
  if (!dischargeMeds) {
    return <div>No discharge medications found</div>;
  }
  return (
    <>
      <header>
        <Flex gap={"2"} justify={"end"}>
          <ButtonEditDischargePage admission_id={discharge.admission_id} />
          <ButtonPrintPage disabled={discharge.status === "admitted"} />
        </Flex>
      </header>
      <RegistrationDetailsCard registration={registration} />
      <DischargeHeader admissionDischarge={discharge} />
      <DischargeDetails discharge={discharge} dischargeMeds={dischargeMeds} />
    </>
  );
};

export default DischareSlip;
