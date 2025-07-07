import { getTodaysConsultations } from "@/app/actions/actions";
import { Flex } from "@radix-ui/themes";
import CreateRegistrationButton from "../../registration/_components/CreateRegistrationButton";
import ConsultationsTable from "../_components/ConsultationsTable";

const page = async () => {
  const consultations = await getTodaysConsultations();
  return (
    <>
      <Flex justify={"between"}>
        <h1 className="text-2xl font-bold mb-4">Today&#39;s Consultations</h1>
        <Flex gap="2" direction={"column"}>
          <CreateRegistrationButton />
        </Flex>
      </Flex>
      <ConsultationsTable consultations={consultations || []} />
    </>
  );
};

export default page;
