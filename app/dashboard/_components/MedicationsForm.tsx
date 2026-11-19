"use client";
import type { Medication, MedsTemplate } from "@/generated/prisma";
import { PlusIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  useFieldArray,
  useForm,
  useWatch,
  type Control,
} from "react-hook-form";
import { patchJson, useQueuedAutosave } from "@/lib/useQueuedAutosave";
import AddToMedsTemplateDialog from "./AddToMedsTemplateDialog";
import MedsTemplateSelectionDialog from "./MedsTemplateSelectionDialog";
import MedicationRow, {
  MED_COLUMNS,
  type MedsFormValues,
} from "./medications/MedicationRow";
import {
  cleanMedications,
  emptyMedicationRow,
  formatUsual,
  type MedicationLine,
  type MedicationRowValues,
} from "./medications/medicationHelpers";
import { useFrequentMeds } from "./medications/useFrequentMeds";

interface Props {
  slug: string; // "/api/consultation" or "/api/admission"
  id: string;
  medications: Medication[];
  templates: MedsTemplate[];
}

const toRow = (m: Partial<Medication>): MedicationRowValues => ({
  ...emptyMedicationRow(),
  ...Object.fromEntries(
    Object.entries(m).filter(([, v]) => v !== null && v !== undefined),
  ),
});

/** "Save as template" with the current list; re-renders on its own. */
const SaveAsTemplate = ({ control }: { control: Control<MedsFormValues> }) => {
  const drugs = useWatch({ control, name: "drugs" });
  return (
    <AddToMedsTemplateDialog
      drugsArray={cleanMedications(drugs ?? []) as Medication[]}
    />
  );
};

/**
 * Medications for a consultation or a discharge.
 * - Drug names suggest what you prescribe most; picking one fills its usual
 *   dosing into empty fields. Enter adds/moves to the next row.
 * - Labelled fields: one line per medicine where the form is wide, else a card.
 * - Autosaves 2 s after the last change (plus Save); blank rows are skipped and
 *   empty Amount/Duration are saved safely (see cleanMedications).
 */
const MedicationsForm = ({ id, slug, medications, templates }: Props) => {
  const router = useRouter();
  const listId = useId();
  const { drugs: frequent, byKey: frequentByKey } = useFrequentMeds();

  const { control, register, setValue, getValues, watch } =
    useForm<MedsFormValues>({
      defaultValues: { drugs: (medications ?? []).map(toRow) },
    });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "drugs",
  });

  const { status, statusText, markChanged, saveNow, setBaseline } =
    useQueuedAutosave<MedicationLine[]>({
      save: (meds, opts) =>
        patchJson(`${slug}/${id}`, { medications: meds }, opts),
      onSaved: () => router.refresh(),
    });

  // Autosave on change, without re-rendering the form on every keystroke.
  // Only real changes to what would be saved count (adding a blank row doesn't).
  const lastPayload = useRef(
    JSON.stringify(cleanMedications(medications ?? [])),
  );
  useEffect(() => {
    setBaseline(cleanMedications(getValues("drugs")));
    const sub = watch((values) => {
      const cleaned = cleanMedications(
        (values.drugs ?? []) as MedicationRowValues[],
      );
      const json = JSON.stringify(cleaned);
      if (json === lastPayload.current) return;
      lastPayload.current = json;
      markChanged(cleaned);
    });
    return () => sub.unsubscribe();
  }, [watch, getValues, markChanged, setBaseline]);

  // Enter: add a row after the last one, otherwise go to the next row.
  const focusRow = (index: number) =>
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLInputElement>(`[data-med-name="${index}"]`)
        ?.focus(),
    );
  const onEnter = (index: number) => {
    if (index === fields.length - 1) append(emptyMedicationRow());
    focusRow(index + 1);
  };
  const addRow = () => {
    append(emptyMedicationRow());
    focusRow(fields.length);
  };

  // Templates: fill an empty list; otherwise ask Add or Replace.
  const [pendingTemplate, setPendingTemplate] = useState<
    MedicationRowValues[] | null
  >(null);
  const handleTemplateSelect = useCallback(
    (selected: MedsTemplate[]) => {
      const rows = (selected?.[0]?.meds ?? []).map(toRow);
      if (rows.length === 0) return;
      if (cleanMedications(getValues("drugs")).length === 0) replace(rows);
      else setPendingTemplate(rows);
    },
    [getValues, replace],
  );
  const applyTemplate = (mode: "add" | "replace") => {
    if (!pendingTemplate) return;
    if (mode === "replace") {
      replace(pendingTemplate);
    } else {
      // Drop trailing blank rows before adding.
      const kept = getValues("drugs").filter((r) =>
        String(r.drug_name ?? "").trim(),
      );
      replace([...kept, ...pendingTemplate]);
    }
    setPendingTemplate(null);
  };

  return (
    <Flex direction="column" gap="3">
      <Flex justify="between" align="center" gap="2" wrap="wrap">
        <Text weight="bold" size="4">
          Medications{fields.length > 0 && ` (${fields.length})`}
        </Text>
        <Flex align="center" gap="2" wrap="wrap">
          <Text
            size="1"
            color={status === "error" ? "red" : "gray"}
            aria-live="polite"
          >
            {statusText}
          </Text>
          <Button
            type="button"
            size="2"
            variant={status === "error" ? "solid" : "soft"}
            color={status === "error" ? "red" : undefined}
            onClick={saveNow}
            disabled={status === "saving"}
          >
            {status === "error" ? "Retry save" : "Save medications"}
          </Button>
        </Flex>
      </Flex>

      {/* Suggestions: the drugs you prescribe most, with usual dosing */}
      <datalist id={listId}>
        {frequent.map((d) => (
          <option
            key={d.drug_name}
            value={d.drug_name}
            label={formatUsual(d.usual)}
          />
        ))}
      </datalist>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="med-list flex flex-col gap-2"
      >
        {fields.length > 0 && (
          <div className="med-header" aria-hidden>
            {MED_COLUMNS.map((c, i) => (
              <Text key={i} size="1" weight="medium" color="gray">
                {c}
              </Text>
            ))}
          </div>
        )}

        {fields.map((field, index) => (
          <MedicationRow
            key={field.id}
            index={index}
            isLast={index === fields.length - 1}
            control={control}
            register={register}
            setValue={setValue}
            getValues={getValues}
            onRemove={() => remove(index)}
            onEnter={onEnter}
            suggestionsListId={listId}
            frequentByKey={frequentByKey}
          />
        ))}

        {fields.length === 0 && (
          <Text size="2" color="gray">
            No medications yet. Add one, or start from a template.
          </Text>
        )}
      </form>

      <Flex gap="2" wrap="wrap" align="center">
        <Button type="button" variant="soft" color="green" onClick={addRow}>
          <PlusIcon /> Add medication
        </Button>
        <MedsTemplateSelectionDialog
          templates={templates}
          onTemplateSelect={handleTemplateSelect}
        />
        <SaveAsTemplate control={control} />
      </Flex>

      <AlertDialog.Root
        open={pendingTemplate !== null}
        onOpenChange={(open) => !open && setPendingTemplate(null)}
      >
        <AlertDialog.Content maxWidth="420px">
          <AlertDialog.Title>Apply template</AlertDialog.Title>
          <AlertDialog.Description size="2">
            This list already has medicines. Add the template&apos;s{" "}
            {pendingTemplate?.length ?? 0} medicine(s) to it, or replace the
            list?
          </AlertDialog.Description>
          <Flex gap="2" mt="4" justify="end" wrap="wrap">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <Button
              variant="soft"
              color="red"
              onClick={() => applyTemplate("replace")}
            >
              Replace list
            </Button>
            <Button onClick={() => applyTemplate("add")}>Add to list</Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Flex>
  );
};

export default MedicationsForm;
