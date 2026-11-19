"use client";
import type {
  Examination,
  Instruction,
  Investigation,
  Medication,
  MedsTemplate,
} from "@/generated/prisma";
import type { BookingAppointment } from "@/app/actions/actions";
import { Box, Button, Flex, IconButton, Select, Text } from "@radix-ui/themes";
import {
  CheckCircledIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import MedicationsForm from "../../../_components/MedicationsForm";
import AppointmentsTab from "../AppointmentsTab";
import ClinicalNoteEditor from "../clinicalNote/ClinicalNoteEditor";
import { noteForConsultation } from "../clinicalNote/clinicalNote";
import { STEPS, isStepFilled, isStepKey, type StepKey } from "./stepHelpers";

interface Props {
  consultation: {
    consultation_id: string;
    registration_id: string;
    clinical_note?: unknown;
    history: string | null;
    examination: Examination[];
    investigations: Investigation[];
    diagnosis: string | null;
    plan: string | null;
    medications: Medication[];
    instructions: Instruction[];
  };
  templates: MedsTemplate[];
  bookingAppointments: BookingAppointment[];
  /** ?type= appointment type, passed through to the booking dialog. */
  type: string;
  hasUpcomingAppointment: boolean;
}

/**
 * The consultation in three steps: Clinical Note → Medications → Appointment,
 * with a ✓ on steps that have content. The current step lives in the URL
 * (?step=) so a refresh or Back keeps your place; unknown values (including
 * the old per-field steps) open the Clinical Note.
 */
const ConsultationSteps = ({
  consultation: c,
  templates,
  bookingAppointments,
  type,
  hasUpcomingAppointment,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const stepParam = searchParams.get("step");
  const step: StepKey = isStepKey(stepParam) ? stepParam : STEPS[0].key;
  const index = STEPS.findIndex((s) => s.key === step);
  const filled = (key: StepKey) => isStepFilled(key, c, hasUpcomingAppointment);

  // Starting content only: the editor owns the content after it mounts, and
  // is keyed by consultation so another patient always gets a fresh editor.
  const initialNote = useMemo(() => noteForConsultation(c), [c]);

  const goTo = (key: StepKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", key);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const prev = index > 0 ? STEPS[index - 1] : null;
  const next = index < STEPS.length - 1 ? STEPS[index + 1] : null;

  return (
    <Flex direction="column" gap="3">
      {/* Phones (below 768px): dropdown + previous/next */}
      <Flex display={{ initial: "flex", sm: "none" }} align="center" gap="2">
        <IconButton
          variant="soft"
          size="3"
          aria-label="Previous step"
          disabled={!prev}
          onClick={() => prev && goTo(prev.key)}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Box flexGrow="1" minWidth="0">
          <Select.Root
            value={step}
            onValueChange={(v) => isStepKey(v) && goTo(v)}
            size="3"
          >
            <Select.Trigger
              aria-label="Consultation step"
              style={{ width: "100%" }}
            >
              {STEPS[index].label}{" "}
              <Text color="gray" size="2">
                ({index + 1}/{STEPS.length})
              </Text>
              {filled(step) && " ✓"}
            </Select.Trigger>
            <Select.Content position="popper">
              {STEPS.map((s, i) => (
                <Select.Item key={s.key} value={s.key}>
                  {i + 1}. {s.label}
                  {filled(s.key) ? " ✓" : ""}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Box>
        <IconButton
          variant="soft"
          size="3"
          aria-label="Next step"
          disabled={!next}
          onClick={() => next && goTo(next.key)}
        >
          <ChevronRightIcon />
        </IconButton>
      </Flex>

      {/* Wider screens: one row of numbered step pills */}
      <nav aria-label="Consultation steps" className="hidden sm:block">
        <Flex gap="2" className="overflow-x-auto pb-1">
          {STEPS.map((s, i) => {
            const active = s.key === step;
            const done = filled(s.key);
            return (
              <Button
                key={s.key}
                size="2"
                radius="full"
                variant={active ? "solid" : done ? "soft" : "outline"}
                color={!active && done ? "green" : undefined}
                aria-current={active ? "step" : undefined}
                onClick={() => goTo(s.key)}
                style={{ flexShrink: 0 }}
              >
                {done ? <CheckCircledIcon /> : <Text size="1">{i + 1}</Text>}
                {s.label}
              </Button>
            );
          })}
        </Flex>
      </nav>

      {/* Current step. The note stays mounted (only hidden) so unsaved text
          and a pending autosave survive switching steps. */}
      <Box className={step === "note" ? "" : "hidden"}>
        <ClinicalNoteEditor
          key={c.consultation_id}
          consultationId={c.consultation_id}
          initialDoc={initialNote}
        />
      </Box>
      {step === "medications" && (
        <MedicationsForm
          slug="/api/consultation"
          id={c.consultation_id}
          medications={c.medications || []}
          templates={templates}
        />
      )}
      {step === "appointment" && (
        <AppointmentsTab
          registration_id={c.registration_id}
          consultation_id={c.consultation_id}
          type={type}
          appointments={bookingAppointments}
        />
      )}

      {/* Bottom previous/next, on every screen size */}
      <Flex justify="between" gap="2" pt="2" className="border-t">
        {prev ? (
          <Button variant="ghost" onClick={() => goTo(prev.key)}>
            <ChevronLeftIcon /> {prev.label}
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button variant="ghost" onClick={() => goTo(next.key)}>
            Next: {next.label} <ChevronRightIcon />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ConsultationSteps;
