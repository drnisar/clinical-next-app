import { Card, Flex, Heading, Box, Button, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import { Admission_Discharge } from "@prisma/client";

interface Props {
  admissions: Admission_Discharge[];
  registration_id: number;
}
const AdmissionsForSingleRegId = ({ admissions, registration_id }: Props) => {
  const isCurrentlyAdmitted = admissions.some(
    (admission) => (admission.status = "admitted")
  );
  return (
    <Card>
      <Flex justify="between">
        <Heading size="3">
          Admissions {admissions.length === 0 && `(No Admissions found)`}
        </Heading>

        {isCurrentlyAdmitted ? (
          <Tooltip content="Patient is currently admitted">
            <Button size="2" color="gray" variant="soft" disabled>
              Create New Admission
            </Button>
          </Tooltip>
        ) : (
          <Link
            href={`/dashboard/admissions/new?registration_id=${registration_id}`}
            className="btn btn-primary items-end"
            prefetch
          >
            Create New Admission
          </Link>
        )}

        {/* <CreateConsultationButton registration_id={registration_id} /> */}
      </Flex>
      <Box>
        {admissions.map((admission) => (
          <Box key={admission.admission_id} className="p-2">
            <Flex justify={"between"}>
              <Heading size="2">
                {admission.admission_date?.toLocaleDateString("en-gb")}
              </Heading>
              <Flex gap="2">
                {/* <Link
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
                </Link> */}
              </Flex>
            </Flex>
            {/* <p>{visit.clinical_details}</p> */}
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default AdmissionsForSingleRegId;
