import { Consultation } from "@/generated/prisma";
import { Box, DataList, Flex, Heading, Text } from "@radix-ui/themes";
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

      {consultation.examination.length > 0 &&
        Array.isArray(consultation.examination) && (
          <Box py="1">
            <Heading size="2">Examination</Heading>
            <DataList.Root ml="2">
              {consultation.examination.map((examination, index) => (
                <DataList.Item key={index}>
                  <DataList.Label className="capitalize">
                    {examination.examination}
                  </DataList.Label>
                  <DataList.Value>{examination.findings}</DataList.Value>
                </DataList.Item>
              ))}
            </DataList.Root>
          </Box>
        )}
      {consultation.investigations.length > 0 &&
        Array.isArray(consultation.investigations) && (
          <Box py="1">
            <Heading size="2">Investigations</Heading>
            <DataList.Root ml="2">
              {consultation.investigations.map((investigation) => (
                <DataList.Item key={investigation.investigation}>
                  <DataList.Label>
                    {investigation.investigation.toUpperCase()}
                  </DataList.Label>
                  <DataList.Value>
                    {investigation.result ? investigation.result : "No result"}
                  </DataList.Value>
                </DataList.Item>
              ))}
            </DataList.Root>
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
      {/* {consultation.instructions && Array.isArray(consultation.instructions) && (
        <Box py="1">
          <Heading size="2">Instructions</Heading>
          <DataList.Root>
            {consultation.instructions.map((instruction, index) => (
              <DataList.Item key={index}>
                <DataList.Label>{instruction[index]}</DataList.Label>
              </DataList.Item>
            ))}
          </DataList.Root>
        </Box>
      )} */}
    </Flex>
  );
};

export default ConsultationDetailsForSingleRegId;
