import React from "react";
import DischargeForm from "./_components/DischargeForm";

const DischargePage = async ({ params }: { params: { id: string } }) => {
  const { id: admission_id } = await params;
  // const {admission_id} = await prisma.admission_Discharge.findFirst({
  //     where: {admission_id: parseInt(params.admission_id)},
  // })
  return <DischargeForm admission_id={parseInt(admission_id)} />;
};

export default DischargePage;
