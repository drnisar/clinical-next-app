import React from "react";
import prisma from "@/prisma/client";
import ButtonCreateNewOTNotes from "../../ot/_components/ButtonCreateNewOTNotes";
import Link from "next/link";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";

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
  const registration = await prisma.registration.findUnique({
    where: { registration_id: admission.registration_id },
  });
  if (!registration) {
    return <div>No registration found</div>;
  }
  const otNotes = await prisma.ot.findMany({
    where: { admission_id: admission.admission_id },
  });
  return (
    <>
      <RegistrationDetailsCard registration={registration} />
      <ButtonCreateNewOTNotes />
      {otNotes &&
        otNotes.map((otNote) => (
          <div key={otNote.ot_id}>
            <h2>OT Notes</h2>
            <Link href={`/dashboard/ot/${otNote.ot_id}`}>
              Surgery Date:{" "}
              {otNote?.surgery_date ? otNote.surgery_date.toString() : "N/A"}
            </Link>
            <p>Admission ID: {otNote.admission_id}</p>
          </div>
        ))}
    </>
  );
};

export default SingleAdmissionPage;
