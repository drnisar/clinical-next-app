"use client";
import {
  Clinic_Visit,
  ConsultationMedications,
  Registration,
} from "@prisma/client";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import ConsultationDetailsForSingleRegId from "./ConsultationDetailsForSingleRegId";
import MedDetailsForSingleVisitId from "./MedDetailsForSingleVisitId";

interface Props {
  consultation: Clinic_Visit;
  meds: ConsultationMedications[];
  registration: Registration;
}
const SingleConsultationDetails = ({
  consultation,
  meds,
  registration,
}: Props) => {
  return (
    <>
      <Flex gap="2" justify="end">
        <Heading size="3" className="justify-end">
          Date: {consultation.visit_date?.toLocaleDateString("en-gb")}
        </Heading>
      </Flex>

      <RegistrationDetailsCard registration={registration} />
      <Flex direction="column" gap="2">
        <Box className="bg-teal-50 py-2">
          <ConsultationDetailsForSingleRegId consultation={consultation} />
        </Box>

        <Box className="col-span-2 py-5 bg-purple-50">
          <Heading size="2">Medications</Heading>
          <MedDetailsForSingleVisitId meds={meds} />
        </Box>
        {consultation.instructions && (
          <Box className="col-span-2 py-5 bg-amber-50">
            <Heading size="2">Instructions</Heading>
            <Box px="2">
              <Text size="2" style={{ whiteSpace: "pre-line" }}>
                {consultation.instructions}
              </Text>
            </Box>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default SingleConsultationDetails;
