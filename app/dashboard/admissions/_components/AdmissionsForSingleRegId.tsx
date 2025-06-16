"use client"; // Make this a Client Component

import {
  Card,
  Flex,
  Heading,
  Box,
  Button,
  Spinner,
  Text,
} from "@radix-ui/themes";
// Remove Link import if using Button onClick for navigation
// import Link from "next/link";
import CreateNewAdmissionButton from "./CreateNewAdmissionButton";
import { useRouter } from "next/navigation"; // Import useRouter
import React, { useState, useEffect, useTransition } from "react"; // Import hooks
import { Admission_Discharge } from "@/generated/prisma";

interface Props {
  admissions: Admission_Discharge[];
  registration_id: string;
}

const FormattedDate = ({ date }: { date: Date | null | undefined }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (date) {
      setFormattedDate(new Date(date).toLocaleDateString("en-GB"));
    } else {
      setFormattedDate(null);
    }
  }, [date]);

  return <>{formattedDate ?? "N/A"}</>;
};

const AdmissionsForSingleRegId = ({ admissions, registration_id }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [navigatingAdmissionId, setNavigatingAdmissionId] = useState<
    string | null
  >(null);

  const isCurrentlyAdmitted = admissions.some(
    (admission) => admission.status !== "DISCHARGED"
  );

  const handleNavigation = (path: string, admissionId: string) => {
    setNavigatingAdmissionId(admissionId); // Set the ID of the row being navigated
    startTransition(() => {
      router.push(path);
    });
  };

  return (
    <Card>
      <Flex justify="between" align="center">
        {" "}
        <Heading size="3">
          Admissions {admissions.length === 0 && `(No Admissions found)`}
        </Heading>
        {!isCurrentlyAdmitted && (
          <CreateNewAdmissionButton registration_id={registration_id} />
        )}
      </Flex>
      <Box mt="3">
        {" "}
        {admissions.map((admission) => {
          const isNavigatingThis =
            isPending && navigatingAdmissionId === admission.admission_id;

          return (
            <Box
              key={admission.admission_id}
              className="p-2 border-b last:border-b-0"
            >
              {" "}
              <Flex
                justify={"between"}
                align="center"
                className={
                  admission.status === "ADMITTED"
                    ? "bg-gray-50 rounded p-1"
                    : "p-1"
                }
              >
                <Flex gap="3" align="center">
                  {" "}
                  {admission.status === "ADMITTED" ? (
                    <Text size="2" weight="bold" color="green">
                      Patient is currently admitted
                    </Text>
                  ) : (
                    <>
                      <Heading size="2">
                        <FormattedDate date={admission.admission_date} />
                      </Heading>
                      <Heading size="2">TILL</Heading>
                      <Heading size="2">
                        <FormattedDate date={admission.discharge_date} />
                      </Heading>
                    </>
                  )}
                </Flex>

                {admission.status === "DISCHARGED" ? (
                  <Button
                    size="1"
                    color="blue"
                    variant="soft"
                    disabled={isNavigatingThis}
                    onClick={() =>
                      handleNavigation(
                        `/dashboard/discharge/discharge_slip/${admission.admission_id}`,
                        admission.admission_id
                      )
                    }
                  >
                    {isNavigatingThis ? <Spinner size="1" /> : "View"}
                  </Button>
                ) : (
                  <Button
                    size="1"
                    color="blue"
                    variant="soft"
                    disabled={isNavigatingThis}
                    onClick={() =>
                      handleNavigation(
                        `/dashboard/admissions/${admission.admission_id}`,
                        admission.admission_id
                      )
                    }
                  >
                    {isNavigatingThis ? <Spinner size="1" /> : "Details"}
                  </Button>
                )}
              </Flex>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

export default AdmissionsForSingleRegId;
