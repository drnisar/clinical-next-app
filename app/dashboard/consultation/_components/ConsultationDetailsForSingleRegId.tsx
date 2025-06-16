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
          <Box px="4">
            <Text size="2" style={{ whiteSpace: "pre-line" }}>
              {consultation.history}
            </Text>
          </Box>
        </Box>
      )}
      {consultation.examination && (
        <Box py="1">
          <Heading size="2">Examination</Heading>
          <Box px="4">
            <Text size="2" style={{ whiteSpace: "pre-line" }}>
              {consultation.examination}
            </Text>
          </Box>
        </Box>
      )}
      {consultation.investigations && (
        <Box py="1">
          <Heading size="2">Investigations</Heading>
          <Box px="4">
            <Text size="2" style={{ whiteSpace: "pre-line" }}>
              {consultation.investigations}
            </Text>
          </Box>
        </Box>
      )}
      {consultation.diagnosis && (
        <Box py="1">
          <Heading size="2">Diagnosis</Heading>
          <Box px="4">
            <Text size="2" style={{ whiteSpace: "pre-line" }}>
              {consultation.diagnosis}
            </Text>
          </Box>
        </Box>
      )}
      {consultation.plan && (
        <Box py="1">
          <Heading size="2">Plan</Heading>
          <Box px="4">
            <Text size="2" style={{ whiteSpace: "pre-line" }}>
              {consultation.plan}
            </Text>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default ConsultationDetailsForSingleRegId;
