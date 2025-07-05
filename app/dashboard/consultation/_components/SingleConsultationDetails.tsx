"use client";

import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import ConsultationDetailsForSingleRegId from "./ConsultationDetailsForSingleRegId";
import AppointmentCard from "./_appointments/AppointmentCard";
import {
  Consultation,
  Registration,
  Appointment,
  Medication,
} from "@/generated/prisma";
import MedDetailsForSingleVisitId from "./MedDetailsForSingleVisitId";

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
  appointment,
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
        <Grid gap="2" columns="5" className="grid grid-cols-6">
          <Box className="bg-teal-50 dark:bg-transparent py-2 col-span-3">
            <ConsultationDetailsForSingleRegId consultation={consultation} />
          </Box>

          {appointment && <AppointmentCard appointment={appointment} />}
        </Grid>

        {medications.length > 0 && (
          <Box className="col-span-2 py-5 bg-purple-50 dark:bg-transparent">
            <Heading size="2">Medications</Heading>
            <MedDetailsForSingleVisitId meds={medications} />
          </Box>
        )}
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
    </>
  );
};

export default SingleConsultationDetails;
