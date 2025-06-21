"use client"; // Make this a Client Component

import {
  Button,
  Card,
  DataList,
  Flex,
  Heading,
  Spinner,
} from "@radix-ui/themes";
// Remove Link import if only using Button onClick
// import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import React, { useState, useEffect, useTransition } from "react"; // Import hooks
import ButtonCreateNewOTNotes from "../../ot/_components/ButtonCreateNewOTNotes"; // Keep this if needed
import { Admission_Discharge, OT } from "@/generated/prisma";

// Define props type explicitly
interface Props {
  admission: Admission_Discharge | null;
  ots: OT[];
}

// Client component for safe date formatting
const FormattedDate = ({ date }: { date: Date | null | undefined }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (date) {
      setFormattedDate(new Date(date).toLocaleDateString("en-GB")); // Use consistent locale
    } else {
      setFormattedDate(null);
    }
  }, [date]);

  return <>{formattedDate ?? "N/A"}</>;
};

// Component signature now accepts props
const AdmissionDetailsForSingleAdmission = ({ admission, ots }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [navigatingOtId, setNavigatingOtId] = useState<string | null>(null);

  useEffect(() => {
    router.prefetch(`/dashboard/discharge/${admission?.admission_id}`);
  }, [router, admission?.admission_id]);

  const handleOtLinkClick = (otId: string) => {
    setNavigatingOtId(otId); // Track which OT item is being navigated
    startTransition(() => {
      router.push(`/dashboard/ot/${otId}`);
    });
  };

  const handleCreateDischargeClick = () => {
    startTransition(() => {
      router.push(`/dashboard/discharge/${admission?.admission_id}`);
    });
  };

  if (!admission) {
    return <Card>Admission details not found.</Card>;
  }

  return (
    <>
      <Card className="border-1 p-2">
        {/* Discharge Button (Needs similar transition handling if kept) */}
        <Flex justify="between" align="center">
          <Heading size={"3"} className="pb-5">
            Current Admission Details
          </Heading>

          <Button
            variant="soft"
            color="green"
            size="1"
            onClick={handleCreateDischargeClick}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner /> <span>Loading Discharge Summary Form</span>
              </>
            ) : (
              "Create Discharge Summary"
            )}
          </Button>
        </Flex>

        {/* Admission Details DataList */}
        <DataList.Root className="pb-5">
          <DataList.Item>
            <DataList.Label>Admission Date</DataList.Label>
            <DataList.Value>
              <FormattedDate date={admission.admission_date} />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Admission Mode</DataList.Label>
            <DataList.Value>{admission.admission_mode ?? "N/A"}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Bed Number</DataList.Label>
            <DataList.Value>{admission.bed_number ?? "N/A"}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Ward</DataList.Label>
            <DataList.Value>{admission.ward ?? "N/A"}</DataList.Value>
          </DataList.Item>
        </DataList.Root>

        {/* OT Notes Section */}
        {ots.length > 0 ? (
          <>
            <Flex justify={"between"} align="center" mt="4" mb="2">
              <Heading size={"2"}>Procedures / Operation Notes</Heading>
              <ButtonCreateNewOTNotes />
            </Flex>
            <DataList.Root>
              {ots.map((ot) => {
                // Check if navigation is pending for *this specific* OT item
                const isNavigatingThis =
                  isPending && navigatingOtId === ot.ot_id;
                const isFinalized = ot.finalize === 1;

                return (
                  <DataList.Item key={ot.ot_id} align="center">
                    <DataList.Label>
                      <FormattedDate date={ot.surgery_date} />
                    </DataList.Label>
                    <Flex justify={"between"} align="center" width="100%">
                      <DataList.Value>
                        {ot.procedure_name ?? "Unnamed Procedure"}
                      </DataList.Value>
                      {/* Use Button with onClick */}
                      <Button
                        size={"1"}
                        variant="soft"
                        color={isFinalized ? "blue" : "red"}
                        disabled={isNavigatingThis} // Disable button during navigation
                        onClick={() => handleOtLinkClick(ot.ot_id)} // Call handler on click
                      >
                        {isNavigatingThis ? (
                          <Spinner size="1" /> // Show spinner when navigating this item
                        ) : isFinalized ? (
                          "Details"
                        ) : (
                          "Edit"
                        )}
                      </Button>
                    </Flex>
                  </DataList.Item>
                );
              })}
            </DataList.Root>
          </>
        ) : (
          <Flex justify={"between"} align="center" mt="4" mb="2">
            <Heading size={"2"}>Procedures / Operation Notes</Heading>
            {/* Show create button even if no OTs exist */}
            <ButtonCreateNewOTNotes /* admissionId={admission.admission_id} */
            />
          </Flex>
        )}
      </Card>
    </>
  );
};

export default AdmissionDetailsForSingleAdmission;
