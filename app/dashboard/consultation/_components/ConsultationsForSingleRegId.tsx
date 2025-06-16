import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { Consultation } from "@/generated/prisma";
import CreateConsultationButton from "./CreateConsultationButton";

interface Props {
  consultations: Consultation[];
  registration_id: string;
}
const ConsultationsForSingleRegId = ({
  consultations,
  registration_id,
}: Props) => {
  return (
    <Card>
      <Flex justify="between">
        <Heading size="3">
          Consultations{" "}
          {consultations.length === 0 && `(No Clinic Visits found)`}
        </Heading>

        <CreateConsultationButton registration_id={registration_id} />
      </Flex>
      <Box>
        {consultations.map((consultation) => (
          <Box key={consultation.consultation_id} className="p-2">
            <Flex justify={"between"}>
              <Heading size="2">
                {consultation.visit_date?.toLocaleDateString("en-gb")}
              </Heading>
              <Flex gap="2">
                <Link
                  href={`/dashboard/consultation/edit/${consultation.consultation_id}`}
                  className="btn btn-primary"
                  prefetch
                >
                  <Button size="1" color="red" variant="soft">
                    Edit
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/consultation/${consultation.consultation_id}`}
                  className="btn btn-primary"
                  prefetch
                >
                  <Button size="1" color="blue" variant="soft">
                    View
                  </Button>
                </Link>
              </Flex>
            </Flex>
            <p>{consultation.clinical_details}</p>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default ConsultationsForSingleRegId;
