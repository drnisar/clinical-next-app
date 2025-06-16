import React from "react";
import OTNotesForm from "./_components/OTNotesForm";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}

const OTPage = async ({ params }: Props) => {
  // Correctly destructure id from params (no await)
  const { id } = params;

  const admission = await prisma.oT.findUnique({
    where: { ot_id: id },
  });
  const admission_id = admission?.admission_id;
  if (!admission_id) {
    return <div>OT Notes not found</div>;
  }
  return <OTNotesForm ot_id={id} admission_id={admission_id} />;
};

export default OTPage;
