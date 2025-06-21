// "use client";
import RegistrationForm from "../../_components/RegistrationForm";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

const RegistrationEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await prisma.registration.findUnique({
    where: { registration_id: id },
  });
  if (!data) {
    return <div>Registration not found</div>;
  }

  return <RegistrationForm registration={data} />;
};

export default RegistrationEditPage;
