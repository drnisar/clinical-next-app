import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation"; // Import notFound
import DischargeForm from "./_components/DischargeForm";

// Interface for props including params
interface DischargePageProps {
  params: { id: string };
}

// Use the props interface
const DischargePage = async ({ params }: DischargePageProps) => {
  // Correctly destructure id from params (no await)
  const { id } = params;

  // Validate and parse the ID
  const admission_id = parseInt(id);
  if (isNaN(admission_id)) {
    // If ID is not a number, return 404
    notFound();
  }

  // Fetch the admission using the validated ID
  const admission = await prisma.admission_Discharge.findUnique({
    where: { admission_id: admission_id }, // Use the parsed integer ID
  });

  // If admission is not found in the database, return 404
  if (!admission) {
    notFound();
  }

  // Render the form with the fetched admission data
  return <DischargeForm admission={admission} />;
};

export default DischargePage;
