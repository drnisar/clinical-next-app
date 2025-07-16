"use client";

import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import ConsultationDetailsForSingleRegId from "./ConsultationDetailsForSingleRegId";
import {
  Consultation,
  Registration,
  Appointment,
  Medication,
} from "@/generated/prisma";
import MedDetailsForSingleVisitId from "./MedDetailsForSingleVisitId";
import { formatDate } from "../../_components/appConstants";

interface Props {
  consultation: Consultation;
  registration: Registration;
  appointment?: Appointment | null;
  medications: Medication[];
}
const SingleConsultationDetails = ({
  consultation,
  registration,
  medications,
}: Props) => {
  return (
    <>
      <Flex gap="2" justify="between">
        <Heading size="3" className="justify-end">
          Date: {formatDate(consultation.visit_date)}
        </Heading>
      </Flex>

      <RegistrationDetailsCard registration={registration} />
      <Flex justify="start" gap="2" className="mb-4">
        <Flex direction="column" gap="2" width={"300px"}>
          <Box className="bg-teal-50 dark:bg-transparent py-2 col-span-6">
            <ConsultationDetailsForSingleRegId consultation={consultation} />
          </Box>

          {consultation.instructions && (
            <Box className="col-span-2 py-5 bg-amber-50 dark:bg-transparent">
              <Heading size="2">Instructions</Heading>
              <Box px="2">
                {/* Handle string instructions */}
                {typeof consultation.instructions === "string" && (
                  <Text size="2" style={{ whiteSpace: "pre-line" }}>
                    {consultation.instructions}
                  </Text>
                )}

                {/* Handle array instructions */}
                {Array.isArray(consultation.instructions) && (
                  <Box>
                    {consultation.instructions
                      .filter(
                        (item): item is string | { instruction: string } =>
                          item !== null && item !== undefined
                      )
                      .map(
                        (
                          item: string | { instruction: string },
                          index: number
                        ) => (
                          <Text key={index} size="2" as="p" mb="1">
                            {index + 1} .{" "}
                            {typeof item === "string" ? item : item.instruction}
                          </Text>
                        )
                      )}
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Flex>
        {medications.length > 0 && (
          <Box className="flex-grow py-5 bg-purple-50 dark:bg-transparent">
            <Heading size="2">Medications</Heading>
            <MedDetailsForSingleVisitId meds={medications} />
          </Box>
        )}
      </Flex>
    </>
  );
};

export default SingleConsultationDetails;
