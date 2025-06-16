// "use client";
import RegistrationForm from "../../_components/RegistrationForm";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

const RegistrationEditPage = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  const data = await prisma.registration.findUnique({
    where: { registration_id: id },
  });
  if (!data) {
    return <div>Registration not found</div>;
  }

  return <RegistrationForm registration={data} />;
};

export default RegistrationEditPage;
