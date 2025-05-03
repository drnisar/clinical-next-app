"use client";
import {
  Appointment,
  Clinic_Visit,
  ConsultationMedications,
  Registration,
} from "@prisma/client";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import ConsultationDetailsForSingleRegId from "./ConsultationDetailsForSingleRegId";
import MedDetailsForSingleVisitId from "./MedDetailsForSingleVisitId";
import AppointmentCard from "./_appointments/AppointmentCard";

interface Props {
  consultation: Clinic_Visit;
  meds: ConsultationMedications[];
  registration: Registration;
  appointment?: Appointment | null;
}
const SingleConsultationDetails = ({
  consultation,
  meds,
  registration,
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

        {meds.length > 0 && (
          <Box className="col-span-2 py-5 bg-purple-50 dark:bg-transparent">
            <Heading size="2">Medications</Heading>
            <MedDetailsForSingleVisitId meds={meds} />
          </Box>
        )}
        {consultation.instructions && (
          <Box className="col-span-2 py-5 bg-amber-50 dark:bg-transparent">
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
