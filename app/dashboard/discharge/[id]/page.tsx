import DischargeTabs from "../_components/DischargeTabs";
import prisma from "@/prisma/client";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";

const NewDischargePage = async ({ params }: { params: { id: string } }) => {
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
      <RegistrationDetailsCard registration={registration} />
      <DischargeTabs admission={admission} />
    </>
  );
};

export default NewDischargePage;
