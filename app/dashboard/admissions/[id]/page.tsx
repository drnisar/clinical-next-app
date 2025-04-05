import React from "react";
import DischargeForm from "../../discharge/_components/DischargeForm";
import prisma from "@/prisma/client";

const SingleAdmissionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const admission = await prisma.admission_Discharge
    .findUnique({
      where: { admission_id: parseInt(id) },
    })
    .catch((error) => {
      console.error("Error fetching admission:", error);
      return null;
    });
  if (!admission) {
    return <div>No admission found</div>;
  }
  return <DischargeForm admission={admission} />;
};

export default SingleAdmissionPage;
