import { Consultation } from "@/generated/prisma";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

const ConsultationDetailsForSingleRegId = ({
  consultation,
}: {
  consultation: Consultation;
}) => {
  return (
    <Flex direction="column">
      {consultation.history && (
        <Box py="1">
          <Heading size="2">History</Heading>
          <Box pl="2">
            <Text size="1" style={{ whiteSpace: "pre-line" }}>
              {consultation.history}
            </Text>
          </Box>
        </Box>
      )}

      {consultation.examination.length > 0 &&
        Array.isArray(consultation.examination) && (
          <Box py="1">
            <Heading size="2">Examination</Heading>
            {consultation.examination.map((examination, index) => (
              <div key={index} className="pl-2">
                <Heading size="1" className="capitalize">
                  {examination.examination}
                </Heading>
                <Text size="1" style={{ whiteSpace: "pre-line" }}>
                  {examination.findings}
                </Text>
              </div>
            ))}
          </Box>
        )}
      {consultation.investigations.length > 0 &&
        Array.isArray(consultation.investigations) && (
          <Box py="1">
            <Heading size="2">Investigations</Heading>
            {consultation.investigations.map((investigation) => (
              <div key={investigation.investigation} className="pl-2">
                <Heading size="1" className="capitalize">
                  {investigation.investigation}
                </Heading>
                <Text size="1">
                  {investigation.result ? investigation.result : "No result"}
                </Text>
              </div>
            ))}
          </Box>
        )}
      {consultation.diagnosis && (
        <Box py="1">
          <Heading size="2">Diagnosis</Heading>
          <Box pl="2">
            <Text size="1" style={{ whiteSpace: "pre-line" }}>
              {consultation.diagnosis}
            </Text>
          </Box>
        </Box>
      )}
      {consultation.plan && (
        <Box py="1">
          <Heading size="1">Plan</Heading>
          <Box pl="2">
            <Text size="1" style={{ whiteSpace: "pre-line" }}>
              {consultation.plan}
            </Text>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default ConsultationDetailsForSingleRegId;
