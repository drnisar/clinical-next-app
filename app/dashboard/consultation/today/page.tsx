import { getTodaysConsultations } from "@/app/actions/actions";
import { Flex } from "@radix-ui/themes";
import ConsultationsTable from "../_components/ConsultationsTable";
import SelectConsultationStatus from "../_components/SelectConsultationStatus";
import ConsultationsStoreInitializer from "./_components/ConsultationsStoreInitializer";
import CreateRegistrationButton from "../../registration/_components/CreateRegistrationButton";

const Page = async () => {
  const consultations = await getTodaysConsultations();
  return (
    <>
      <ConsultationsStoreInitializer consultationsFromPage={consultations} />
      <Flex justify={"between"} mb="5">
        <SelectConsultationStatus />
        <CreateRegistrationButton />
      </Flex>
      <ConsultationsTable />
    </>
  );
};

export default Page;
