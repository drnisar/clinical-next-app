import RegistrationDetailsCard from "@/app/dashboard/registration/_components/RegistrationDetailsCard";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import ButtonEditDischargePage from "../../_components/ButtonEditDischargePage";
import ButtonPrintPage from "../../_components/ButtonPrintPage";
import DischargeDetails from "../../_components/DischargeDetails";
import DischargeHeader from "../../_components/DischargeHeader";
import DischargeSlipHeader from "../../_components/DischargeSlipHeader";

const DischareSlip = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const discharge = await prisma.admission_Discharge.findUnique({
    where: {
      admission_id: id,
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
  return (
    <>
      <header>
        <Flex gap={"2"} justify={"end"}>
          <ButtonEditDischargePage admission_id={discharge.admission_id} />
          <ButtonPrintPage disabled={discharge.status === "admitted"} />
        </Flex>
      </header>
      <DischargeSlipHeader />
      <RegistrationDetailsCard registration={registration} />
      <DischargeHeader admissionDischarge={discharge} />
      <DischargeDetails discharge={discharge} />
      <footer className="print:flex print:fixed print:bottom-0 print:left-0 print:w-full print:justify-center print:text-sm print:text-gray-500">
        Page <span className="print:ml-1 print:counter-page"></span>
      </footer>
    </>
  );
};

export default DischareSlip;
