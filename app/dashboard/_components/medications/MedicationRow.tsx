"use client";
import { IconButton, Text, TextField } from "@radix-ui/themes";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  useWatch,
  type Control,
  type UseFormGetValues,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { SelectInput } from "../FormComponents";
import {
  drugForms,
  drugRoutes,
  drugsFrequency,
  intervals,
} from "../appConstants";
import DrugSearch from "./DrugSearch";
import {
  applyUsual,
  summarizeRow,
  type FrequentDrug,
  type MedicationRowValues,
} from "./medicationHelpers";

export type MedsFormValues = { drugs: MedicationRowValues[] };

/** Column headings for the one-line layout (grid in globals.css, .med-row). */
export const MED_COLUMNS = [
  "",
  "Drug",
  "Dose",
  "Amount",
  "Form",
  "Route",
  "Frequency",
  "Duration",
  "Interval",
  "Instructions",
  "",
];

/** Field label: above the input in cards, a column header in the one-line layout. */
const Field = ({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <label className={`flex min-w-0 flex-col gap-0.5 ${className}`}>
    <Text size="1" color="gray" className="med-row__label">
      {label}
    </Text>
    {children}
  </label>
);

interface Props {
  index: number;
  isLast: boolean;
  /** Being edited. Rows without a drug name are always open. */
  open: boolean;
  onOpen: (index: number | null) => void;
  control: Control<MedsFormValues>;
  register: UseFormRegister<MedsFormValues>;
  setValue: UseFormSetValue<MedsFormValues>;
  getValues: UseFormGetValues<MedsFormValues>;
  onRemove: () => void;
  /** Enter in a field: add a row after the last one, otherwise move down. */
  onEnter: (index: number) => void;
  drugs: FrequentDrug[];
}

/**
 * One medicine.
 * - Cards (most screens): a filled-in medicine shows as one summary line; tap
 *   it to edit. While editing, the drug name is on top and the other fields
 *   sit in a tight grid; ✓ closes it again.
 * - Wide forms: always a single editable line under the header row.
 * The layout follows the form's own width (container queries in globals.css).
 */
const MedicationRow = ({
  index,
  isLast,
  open,
  onOpen,
  control,
  register,
  setValue,
  getValues,
  onRemove,
  onEnter,
  drugs,
}: Props) => {
  const base = `drugs.${index}` as const;
  const row = useWatch({ control, name: base });
  const name = String(row?.drug_name ?? "").trim();
  const isOpen = open || !name;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // never submit the form
      onEnter(index);
    }
  };

  // A chosen suggestion fills its usual dosing wherever the row is empty.
  const pick = (drug: FrequentDrug) => {
    setValue(`${base}.drug_name`, drug.drug_name, { shouldDirty: true });
    const updates = applyUsual(getValues(base), drug.usual);
    for (const [field, value] of Object.entries(updates)) {
      setValue(
        `${base}.${field as keyof MedicationRowValues}`,
        value as never,
        { shouldDirty: true },
      );
    }
  };

  const removeButton = (
    <IconButton
      type="button"
      variant="ghost"
      color="red"
      onClick={onRemove}
      aria-label={`Remove ${name || `medication ${index + 1}`}`}
      title="Remove"
    >
      <Cross2Icon />
    </IconButton>
  );

  return (
    <div
      className="med-row"
      data-open={isOpen}
      role="group"
      aria-label={`Medication ${index + 1}`}
    >
      {/* Collapsed card: one tappable line */}
      <div className="med-row__summary">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-baseline gap-2 text-left"
          onClick={() => onOpen(index)}
          aria-label={`Edit ${name}`}
        >
          <Text size="2" weight="bold" className="shrink-0">
            {index + 1}.
          </Text>
          <Text size="2" weight="bold" className="shrink-0 uppercase">
            {name}
          </Text>
          <Text size="1" color="gray" className="truncate">
            {row ? summarizeRow(row) : ""}
          </Text>
        </button>
        {removeButton}
      </div>

      {/* Editing card: number + name + done + remove; one-line layout: grid cells */}
      <div className="med-row__top">
        <Text size="2" weight="bold" className="med-row__num" aria-hidden>
          {index + 1}.
        </Text>
        <Field label="Drug" className="flex-1">
          <DrugSearch
            field={register(`${base}.drug_name`)}
            index={index}
            drugs={drugs}
            onPick={pick}
            onEnter={() => onEnter(index)}
          />
        </Field>
        {name && (
          <div className="med-row__done">
            <IconButton
              type="button"
              variant="soft"
              color="green"
              onClick={() => onOpen(null)}
              aria-label="Done editing"
              title="Done"
            >
              <CheckIcon />
            </IconButton>
          </div>
        )}
        {/* Plain wrapper carries the grid placement (Radix button CSS overrides it). */}
        <div className="med-row__remove">{removeButton}</div>
      </div>

      <Field label="Dose">
        <TextField.Root
          {...register(`${base}.drug_dose`)}
          placeholder="e.g. 500 mg"
          size="2"
          onKeyDown={onKeyDown}
        />
      </Field>
      <Field label="Amount">
        <TextField.Root
          type="number"
          inputMode="numeric"
          min={1}
          {...register(`${base}.amount`)}
          size="2"
          onKeyDown={onKeyDown}
        />
      </Field>
      <Field label="Form">
        <SelectInput
          name={`${base}.drug_form`}
          options={drugForms}
          control={control}
          size="2"
          className="w-full"
          placeholder="Form"
        />
      </Field>
      <Field label="Route">
        <SelectInput
          name={`${base}.route`}
          options={drugRoutes}
          control={control}
          size="2"
          className="w-full"
          placeholder="Route"
        />
      </Field>
      <Field label="Frequency">
        <SelectInput
          name={`${base}.frequency`}
          options={drugsFrequency}
          control={control}
          size="2"
          className="w-full"
          placeholder="Freq."
        />
      </Field>
      <Field label="Duration">
        <TextField.Root
          type="number"
          inputMode="numeric"
          min={1}
          {...register(`${base}.duration`)}
          size="2"
          onKeyDown={onKeyDown}
        />
      </Field>
      <Field label="Interval">
        <SelectInput
          name={`${base}.interval`}
          options={intervals}
          control={control}
          size="2"
          className="w-full"
          placeholder="Days…"
        />
      </Field>
      <Field label="Instructions" className="med-row__instructions">
        <TextField.Root
          {...register(`${base}.instructions`)}
          placeholder="e.g. after meals"
          size="2"
          onKeyDown={onKeyDown}
          enterKeyHint={isLast ? "done" : "next"}
        />
      </Field>
    </div>
  );
};

export default MedicationRow;
