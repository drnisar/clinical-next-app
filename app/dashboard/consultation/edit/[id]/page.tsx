import {
  getConsultationById,
  getRegistrationById,
} from "@/app/actions/actions";
import RegistrationDetailsCard from "@/app/dashboard/registration/_components/RegistrationDetailsCard";
import { Flex } from "@radix-ui/themes";
import ButtonPrintPreview from "../../_components/ButtonPrintPreview";
import ConsultationDetailsForSingleRegId from "../../_components/ConsultationDetailsForSingleRegId";
import ConsultationTabs from "../../_components/ConsultationTabs";

const ConsultationEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string }>;
}) => {
  const { id } = await params;
  const { type } = await searchParams;

  const consultation = await getConsultationById(id);
  if (!consultation) {
    return <div>Consultation not found</div>;
  }
  const registration = await getRegistrationById(consultation?.registration_id);
  if (!registration) {
    return <div>Registration not found</div>;
  }

  return (
    <>
      <Flex direction="column" gap="4" p="4">
        <Flex justify="end">
          <ButtonPrintPreview consultation_id={id} />
        </Flex>
        <RegistrationDetailsCard registration={consultation?.registration} />
        <Flex gap={"8"}>
          <ConsultationTabs consultation={consultation} type={type || ""} />
          <ConsultationDetailsForSingleRegId consultation={consultation} />
        </Flex>
      </Flex>
    </>
  );
};

export default ConsultationEditPage;
