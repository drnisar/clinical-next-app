"use client";
// Client component: uses the date/badge helpers in appConstants (a client
// module) and hosts the client-only HMIS components.
import type { Appointment } from "@/generated/prisma";
import type { ConsultationHistoryItem } from "@/app/actions/actions";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Link as RadixLink,
  Text,
} from "@radix-ui/themes";
import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  badgeColorForAppointments,
  datedddDDMMMYY,
} from "../../../_components/appConstants";
import HMISAllNotes from "../HMISAllNotes";
import HMISNotes from "../HMISNotes";
import { formatMedicationDetails } from "./stepHelpers";

interface Props {
  mrn: string;
  nextAppointment: Appointment | null;
  earlierVisits: ConsultationHistoryItem[];
}

const statusColor = (status: string) =>
  status === "COMPLETED"
    ? "green"
    : status === "IN_PROGRESS"
      ? "blue"
      : "orange";

/** Collapsible block using the native <details> element (keyboard/screen-reader friendly). */
const Collapsible = ({
  summary,
  children,
  defaultOpen = false,
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => (
  <details className="group" open={defaultOpen}>
    <summary className="flex cursor-pointer list-none items-start gap-2 [&::-webkit-details-marker]:hidden">
      <ChevronRightIcon
        className="mt-1 shrink-0 transition-transform group-open:rotate-90"
        aria-hidden
      />
      <Box style={{ minWidth: 0, flexGrow: 1 }}>{summary}</Box>
    </summary>
    <Box pl="5" pt="2">
      {children}
    </Box>
  </details>
);

/**
 * The patient's background beside the consultation: next appointment, earlier
 * visits in this app, and HMIS (IBP clinic note, all notes and lab results).
 */
const PatientHistoryPanel = ({
  mrn,
  nextAppointment,
  earlierVisits,
}: Props) => (
  <Flex direction="column" gap="4">
    <Box>
      <Heading size="2" mb="1">
        Next appointment
      </Heading>
      {nextAppointment ? (
        <Flex align="center" gap="2" wrap="wrap">
          <Text size="2" weight="medium">
            {datedddDDMMMYY(nextAppointment.date_appointment)}
          </Text>
          <Badge color={badgeColorForAppointments(nextAppointment.type)}>
            {nextAppointment.type}
          </Badge>
          <Text size="2">{nextAppointment.plan}</Text>
        </Flex>
      ) : (
        <Text size="2" color="gray">
          None booked.
        </Text>
      )}
    </Box>

    <Box>
      <Heading size="2" mb="2">
        Earlier visits ({earlierVisits.length})
      </Heading>
      {earlierVisits.length === 0 ? (
        <Text size="2" color="gray">
          No earlier visits in this app.
        </Text>
      ) : (
        <Flex direction="column" gap="2">
          {earlierVisits.map((v) => (
            <Card key={v.consultation_id} size="1">
              <Collapsible
                summary={
                  <Flex justify="between" align="center" gap="2" wrap="wrap">
                    <Text size="2" weight="bold">
                      {datedddDDMMMYY(v.visit_date)}
                    </Text>
                    <Badge color={statusColor(v.status)} variant="soft">
                      {v.status}
                    </Badge>
                    {v.diagnosis?.trim() && (
                      <Text size="1" color="gray" className="w-full truncate">
                        {v.diagnosis}
                      </Text>
                    )}
                  </Flex>
                }
              >
                <Flex direction="column" gap="2">
                  {v.diagnosis?.trim() && (
                    <Text size="2" style={{ whiteSpace: "pre-line" }}>
                      <Text weight="medium">Diagnosis:</Text> {v.diagnosis}
                    </Text>
                  )}
                  {v.plan?.trim() && (
                    <Text size="2" style={{ whiteSpace: "pre-line" }}>
                      <Text weight="medium">Plan:</Text> {v.plan}
                    </Text>
                  )}
                  {v.medications.length > 0 && (
                    <Box>
                      <Text size="2" weight="medium">
                        Medications
                      </Text>
                      <ol className="list-decimal pl-5">
                        {v.medications.map((m, i) => (
                          <li key={i}>
                            <Text size="2">
                              <Text weight="bold">
                                {m.drug_name.toUpperCase()} {m.drug_dose}
                              </Text>
                              {formatMedicationDetails(m) && (
                                <Text color="gray">
                                  {" "}
                                  — {formatMedicationDetails(m)}
                                </Text>
                              )}
                            </Text>
                          </li>
                        ))}
                      </ol>
                    </Box>
                  )}
                  <RadixLink asChild size="2">
                    <Link
                      href={`/dashboard/consultation/edit/${v.consultation_id}`}
                    >
                      Open this visit
                    </Link>
                  </RadixLink>
                </Flex>
              </Collapsible>
            </Card>
          ))}
        </Flex>
      )}
    </Box>

    <Box>
      <Flex justify="between" align="center" mb="2">
        <Heading size="2">HMIS</Heading>
        <RadixLink asChild size="2">
          <Link href={`/dashboard/hmis?mrn=${encodeURIComponent(mrn)}`}>
            Full HMIS page <ExternalLinkIcon />
          </Link>
        </RadixLink>
      </Flex>
      <Flex direction="column" gap="3">
        <Card size="1">
          <Collapsible
            summary={
              <Text size="2" weight="medium">
                IBP clinic note
              </Text>
            }
          >
            <Text as="div" size="2">
              <HMISNotes mr_number={mrn} />
            </Text>
          </Collapsible>
        </Card>
        <HMISAllNotes mrn={mrn} />
      </Flex>
    </Box>
  </Flex>
);

export default PatientHistoryPanel;
