import React from "react";
import DischargeForm from "../../discharge/_components/DischargeForm";

const SingleAdmissionPage = async ({
  params,
}: {
  params: { admission_id: string };
}) => {
  const { admission_id } = await params;
  return <DischargeForm admission_id={parseInt(admission_id)} />;
};

export default SingleAdmissionPage;
