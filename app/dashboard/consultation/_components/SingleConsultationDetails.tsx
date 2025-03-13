"use client";
import { Clinic_Visit, ConsultationMedications } from "@prisma/client";
import { Box, Flex, Heading } from "@radix-ui/themes";
import React, { useEffect } from "react";
import RegistrationDetailsCard from "../../registration/_components/RegistrationDetailsCard";
import MedDetailsForSingleVisitId from "./MedDetailsForSingleVisitId";
import styles from "./SingleConsultationDetails.module.css";
import ReactMarkdown from "react-markdown";

interface Props {
  consultation: Clinic_Visit;
  meds: ConsultationMedications[];
}
const SingleConsultationDetails = ({
  consultation: { registration_id, clinical_details, visit_date, instructions },
  meds,
}: Props) => {
  useEffect(() => {
    console.log("clinical details:", clinical_details);
  }, []);
  return (
    <>
      <Flex gap="2" justify="end">
        <Heading size="3" className="justify-end">
          Date: {visit_date?.toLocaleDateString("en-gb")}
        </Heading>
      </Flex>

      <RegistrationDetailsCard registration_id={registration_id.toString()} />
      <Flex direction="column" gap="2">
        <Box className="bg-teal-50 py-2">
          {clinical_details && (
            <Box py="2">
              {/* <p>{clinical_details}</p> */}
              <div className={styles.markdownContent}>
                <ReactMarkdown>{clinical_details}</ReactMarkdown>
              </div>
            </Box>
          )}
        </Box>

        <Box className="col-span-2 py-5 bg-purple-50">
          <Heading size="2">Medications</Heading>
          <MedDetailsForSingleVisitId meds={meds} />
        </Box>
        <Box className="bg-amber-50 py-2">
          {instructions && (
            <Box py="2">
              {/* <p>{clinical_details}</p> */}
              <div className={styles.markdownContent}>
                <ReactMarkdown>{instructions}</ReactMarkdown>
              </div>
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default SingleConsultationDetails;
