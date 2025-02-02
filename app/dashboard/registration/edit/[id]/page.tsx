// "use client";
import prisma from "@/prisma/client";
import RegistrationForm from "../../_components/RegistrationForm";

const RegistrationEditPage = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  const data = await prisma.registration.findUnique({
    where: { registration_id: parseInt(id) },
  });
  if (!data) {
    return <div>Registration not found</div>;
  }

  return <RegistrationForm registration={data} />;
};

export default RegistrationEditPage;
