import { Clinic_Visit, ConsultationMedications } from "@prisma/client";
import { Box, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import MedDetailsForSingleVisitId from "./MedDetailsForSingleVisitId";

interface Props {
  consultation: Clinic_Visit;
  meds: ConsultationMedications[];
}
const SingleConsultationDetails = ({
  consultation: { registration_id, clinical_details, visit_date, visit_id },
  meds,
}: Props) => {
  return (
    <Box>
      <RegistrationDetailsCard registration_id={registration_id.toString()} />
      <Flex justify={"between"}>
        <Heading size="2">Consultation Details</Heading>
        <Link href={`/dashboard/consultation/edit/${visit_id}`}>Edit</Link>
      </Flex>
      <Heading size="3">{visit_date?.toLocaleDateString("en-gb")}</Heading>
      {clinical_details && (
        <Box py="2">
          <Heading size="2">Brief Summary</Heading>
          <p>{clinical_details}</p>
        </Box>
      )}
      <Box>
        <MedDetailsForSingleVisitId meds={meds} />
      </Box>
    </Box>
  );
};

export default SingleConsultationDetails;
