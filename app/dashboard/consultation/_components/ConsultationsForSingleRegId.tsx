import { Box, Card, Flex, Heading, Link } from "@radix-ui/themes";
import React from "react";
import { Clinic_Visit } from "@prisma/client";

interface ClinicVisitsProps {
  clinicVisits: Clinic_Visit[];
  registration_id: string;
}
const ConsultationsForSingleRegId = ({
  clinicVisits,
  registration_id,
}: ClinicVisitsProps) => {
  return (
    <Card>
      <Flex justify="between">
        <Heading size="3">
          Clinic Visits{" "}
          {clinicVisits.length === 0 && `(No Clinic Visits found)`}
        </Heading>

        <Link
          href={`/dashboard/consultation/new?registration_id=${registration_id}`}
          className="btn btn-primary items-end"
        >
          Create New Consultation
        </Link>
      </Flex>
      <Box>
        {clinicVisits.map((visit) => (
          <Box key={visit.visit_id} className="p-2">
            <Flex justify={"between"}>
              <Heading size="2">{visit.visit_date?.toString()}</Heading>
              <Link
                href={`/dashboard/consultation/${visit.visit_id}`}
                className="btn btn-primary"
              >
                View
              </Link>
            </Flex>
            <p>{visit.clinical_details}</p>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default ConsultationsForSingleRegId;
