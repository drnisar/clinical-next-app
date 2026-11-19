import type {
  Appointment,
  Examination,
  Instruction,
  Investigation,
  Medication,
} from "@/generated/prisma";
import { Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import AppointmentsTableForSingleRegId from "@/app/dashboard/appointments/_components/AppointmentsTableForSingleRegId";
import ClinicalNoteView from "../clinicalNote/ClinicalNoteView";
import {
  noteForConsultation,
  noteHasContent,
} from "../clinicalNote/clinicalNote";
import { formatMedicationDetails } from "./stepHelpers";

interface Props {
  consultation: {
    clinical_note?: unknown;
    history?: string | null;
    examination?: Examination[] | null;
    investigations?: Investigation[] | null;
    diagnosis?: string | null;
    plan?: string | null;
    medications?: Medication[] | null;
    instructions?: Instruction[] | null;
  };
  upcomingAppointments: Appointment[];
}

/**
 * Summary beside the form: the Clinical Note as saved, the medications and the
 * patient's upcoming appointments. Updates after each save.
 */
const ConsultationSummary = ({
  consultation: c,
  upcomingAppointments,
}: Props) => {
  const note = noteForConsultation(c);
  const medications = c.medications ?? [];

  return (
    <Flex direction="column" gap="3">
      <Box>
        <Heading size="2" mb="1">
          Clinical Note
        </Heading>
        {noteHasContent(note) ? (
          <ClinicalNoteView doc={note} />
        ) : (
          <Text size="2" color="gray">
            Nothing written yet. The note appears here once it is saved.
          </Text>
        )}
      </Box>

      <Separator size="4" />
      <Box>
        <Heading size="2" mb="1">
          Medications{medications.length > 0 && ` (${medications.length})`}
        </Heading>
        {medications.length > 0 ? (
          <ol className="list-decimal space-y-1 pl-5">
            {medications.map((m, i) => (
              <li key={i}>
                <Text size="2">
                  <Text weight="bold">
                    {m.drug_name.toUpperCase()} {m.drug_dose}
                  </Text>
                  {formatMedicationDetails(m) && (
                    <Text color="gray"> — {formatMedicationDetails(m)}</Text>
                  )}
                </Text>
              </li>
            ))}
          </ol>
        ) : (
          <Text size="2" color="gray">
            None prescribed.
          </Text>
        )}
      </Box>

      <Separator size="4" />
      {upcomingAppointments.length > 0 ? (
        <AppointmentsTableForSingleRegId
          appointmentsForRegistration={upcomingAppointments}
        />
      ) : (
        <Text size="2" color="gray">
          No upcoming appointments.
        </Text>
      )}
    </Flex>
  );
};

export default ConsultationSummary;
