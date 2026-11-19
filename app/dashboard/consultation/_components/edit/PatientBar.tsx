"use client";
import { Badge, Button, Flex, Text } from "@radix-ui/themes";
import { ListBulletIcon } from "@radix-ui/react-icons";
import { Printer, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useHeightCssVar } from "@/lib/useHeightCssVar";
import { calculateAge } from "../../../_components/appConstants";
import StatusChangeComponent from "../StatusChangeComponent";
import { nextQueuedPatient } from "./stepHelpers";
import { useTodaysPatients } from "./useTodaysPatients";

export interface PatientBarPatient {
  first_name: string;
  last_name: string;
  gender: string;
  mr_number: string;
  date_of_birth: Date | string | null;
}

interface Props {
  consultationId: string;
  status: string;
  patient: PatientBarPatient;
  onQueueClick: () => void;
}

/**
 * Sticky patient bar for the consultation page: who you are seeing, the
 * consultation status, and the actions you reach for between patients.
 * Sits just below the sticky dashboard nav.
 */
const PatientBar = ({
  consultationId,
  status,
  patient,
  onQueueClick,
}: Props) => {
  const barRef = useRef<HTMLDivElement>(null);
  useHeightCssVar(barRef, "--patient-bar-h");

  const queue = useTodaysPatients();
  const next = nextQueuedPatient(queue.data, consultationId);
  const age = calculateAge(patient.date_of_birth?.toString() ?? "");

  return (
    <div
      ref={barRef}
      className="sticky z-30 mb-4 border-b py-2 print:!hidden"
      style={{
        top: "var(--dashboard-nav-h, 0px)",
        background: "var(--color-background)",
      }}
    >
      <Flex align="center" justify="between" gap="3" wrap="wrap">
        {/* Who */}
        <Flex align="center" gap="3" wrap="wrap" style={{ minWidth: 0 }}>
          <Button
            variant="soft"
            color="gray"
            onClick={onQueueClick}
            aria-label="Today's patients"
            title="Today's patients"
          >
            <ListBulletIcon />
            <span className="hidden sm:inline">Queue</span>
          </Button>
          <Flex direction="column" style={{ minWidth: 0 }}>
            <Text weight="bold" size="4" style={{ wordBreak: "break-word" }}>
              {patient.first_name.toUpperCase()}{" "}
              {patient.last_name.toUpperCase()}
            </Text>
            <Text size="2" color="gray">
              {[age && `${age} yrs`, patient.gender?.toUpperCase()]
                .filter(Boolean)
                .join(" · ")}
              {" · "}
              <Badge variant="soft" color="gray">
                MR {patient.mr_number}
              </Badge>
            </Text>
          </Flex>
        </Flex>

        {/* Actions */}
        <Flex align="center" gap="2" wrap="wrap">
          <StatusChangeComponent
            status={status}
            consultation_id={consultationId}
          />
          <Button variant="soft" color="jade" asChild>
            <Link href={`/dashboard/consultation/${consultationId}`}>
              <Printer size={16} aria-hidden />
              <span className="hidden sm:inline">Print preview</span>
            </Link>
          </Button>
          {next ? (
            <Button asChild>
              <Link
                href={`/dashboard/consultation/edit/${next.consultation_id}`}
                title={`Next: ${next.registration?.first_name ?? ""} ${next.registration?.last_name ?? ""}`}
              >
                <UserRoundPlus size={16} aria-hidden />
                Next patient
              </Link>
            </Button>
          ) : (
            <Button disabled title="No one else is queued">
              <UserRoundPlus size={16} aria-hidden />
              {queue.isLoading ? "Next patient" : "No one waiting"}
            </Button>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default PatientBar;
