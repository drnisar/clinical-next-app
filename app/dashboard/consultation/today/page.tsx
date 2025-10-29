import { getTodaysConsultations } from "@/app/actions/actions";
import { Flex } from "@radix-ui/themes";
import ConsultationsStoreInitializer from "./_components/ConsultationsStoreInitializer";
import CreateRegistrationButton from "../../registration/_components/CreateRegistrationButton";
import TodaysConsultationsTable from "./_components/TodaysConsultationsTable";

const Page = async () => {
  const consultations = await getTodaysConsultations();
  return (
    <>
      <ConsultationsStoreInitializer consultationsFromPage={consultations} />
      <Flex justify={"end"} mb="5">
        <CreateRegistrationButton />
      </Flex>
      {/* <ConsultationsTable /> */}
      <TodaysConsultationsTable />
    </>
  );
};

export default Page;
