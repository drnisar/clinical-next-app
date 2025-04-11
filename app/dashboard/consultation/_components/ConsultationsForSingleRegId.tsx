import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { Clinic_Visit } from "@prisma/client";
import CreateConsultationButton from "./CreateConsultationButton";

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

        <CreateConsultationButton registration_id={registration_id} />
      </Flex>
      <Box>
        {clinicVisits.map((visit) => (
          <Box key={visit.visit_id} className="p-2">
            <Flex justify={"between"}>
              <Heading size="2">
                {visit.visit_date?.toLocaleDateString("en-gb")}
              </Heading>
              <Flex gap="2">
                <Link
                  href={`/dashboard/consultation/edit/${visit.visit_id}`}
                  className="btn btn-primary"
                  prefetch
                >
                  <Button size="1" color="red" variant="soft">
                    Edit
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/consultation/${visit.visit_id}`}
                  className="btn btn-primary"
                  prefetch
                >
                  <Button size="1" color="blue" variant="soft">
                    View
                  </Button>
                </Link>
              </Flex>
            </Flex>
            <p>{visit.clinical_details}</p>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default ConsultationsForSingleRegId;
