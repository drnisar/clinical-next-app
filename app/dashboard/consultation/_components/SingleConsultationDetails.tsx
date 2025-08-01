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
      <div className="flex justify-end pr-6">
        <Heading size="3" className="justify-end">
          Date: {formatDate(consultation.visit_date)}
        </Heading>
      </div>

      <RegistrationDetailsCard registration={registration} />
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-4 text-xs border-r">
          <Heading size="3">Clinical Details</Heading>
          <ConsultationDetailsForSingleRegId consultation={consultation} />
        </div>
        <div className="col-span-8 px-4">
          <Heading size="3">For Patient</Heading>
          <Flex direction="column" gap="2" className="flex-grow">
            {medications.length > 0 && (
              <Box className="flex-grow py-5 bg-purple-50 dark:bg-transparent">
                <Heading size="2">Medications</Heading>
                <MedDetailsForSingleVisitId meds={medications} />
              </Box>
            )}
            {consultation.instructions.length > 0 && (
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
                      {consultation.instructions.map(
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
        </div>
      </div>
    </>
  );
};

export default SingleConsultationDetails;
