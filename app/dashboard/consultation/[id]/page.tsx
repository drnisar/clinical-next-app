import { prisma } from "@/lib/prisma";
import PageClient from "./_components/PageClient";

const SingleConsultationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const consultation = await prisma.consultation.findUnique({
    where: { consultation_id: id },
  });
  if (!consultation) {
    return <div>Consultation not found</div>;
  }

  const meds = consultation.medications;
  if (!meds) {
    return <div>Medications not found</div>;
  }

  const registration = await prisma.registration.findUnique({
    where: { registration_id: consultation.registration_id },
  });

  if (!registration) {
    return <div>Registration not found</div>;
  }

  const appointment = await prisma.appointment.findFirst({
    where: { registration_id: registration.registration_id },
  });

  return (
    <div>
      <PageClient
        registration={registration}
        id={id}
        meds={meds}
        consultation={consultation}
        appointment={appointment || undefined}
      />
    </div>
  );
};

export default SingleConsultationPage;
