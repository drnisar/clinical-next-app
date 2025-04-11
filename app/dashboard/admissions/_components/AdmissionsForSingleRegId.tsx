import { Card, Flex, Heading, Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import { Admission_Discharge } from "@prisma/client";
import CreateNewAdmissionButton from "./CreateNewAdmissionButton";

interface Props {
  admissions: Admission_Discharge[];
  registration_id: number;
}
const AdmissionsForSingleRegId = ({ admissions, registration_id }: Props) => {
  const isCurrentlyAdmitted = admissions.some(
    (admission) => admission.status !== "DISCHARGED"
  );
  return (
    <Card>
      <Flex justify="between">
        <Heading size="3">
          Admissions {admissions.length === 0 && `(No Admissions found)`}
        </Heading>

        {!isCurrentlyAdmitted && (
          <>
            <CreateNewAdmissionButton registration_id={registration_id} />
          </>
        )}
      </Flex>
      <Box>
        {admissions.map((admission) => (
          <Box key={admission.admission_id} className="p-2">
            <Flex
              justify={"between"}
              className={admission.status === "admitted" ? "bg-gray-50" : ""}
            >
              <Flex gap="5">
                <Heading size="2">
                  {admission.admission_date?.toLocaleDateString("en-gb")}
                </Heading>
                {admission.status === "admitted" ? (
                  <div>Patient is currently admitted</div>
                ) : (
                  <>
                    <Heading size="2">TILL</Heading>
                    <Heading size="2">
                      {admission.discharge_date?.toLocaleDateString("en-gb")}
                    </Heading>
                  </>
                )}
              </Flex>
              {admission.status === "DISCHARGED" ? (
                <Link
                  href={`/dashboard/discharge/discharge_slip/${admission.admission_id}`}
                  prefetch
                >
                  <Button size="1" color="blue" variant="soft">
                    View
                  </Button>
                </Link>
              ) : (
                <Link
                  href={`/dashboard/discharge/${admissions[0].admission_id}`}
                  className="btn btn-primary items-end"
                  prefetch
                >
                  <Button size="1" color="red" variant="soft">
                    Discharge
                  </Button>
                </Link>
              )}
            </Flex>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default AdmissionsForSingleRegId;
