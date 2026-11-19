"use client";
import { IconButton, Text, TextField } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import type {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { SelectInput } from "../FormComponents";
import {
  drugForms,
  drugRoutes,
  drugsFrequency,
  intervals,
} from "../appConstants";
import {
  applyUsual,
  drugKey,
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

/** Field label: visible above the input on smaller screens, a column header on large ones. */
const Field = ({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <label className={`flex min-w-0 flex-col gap-1 ${className}`}>
    <Text size="1" color="gray" className="med-row__label">
      {label}
    </Text>
    {children}
  </label>
);

interface Props {
  index: number;
  isLast: boolean;
  control: Control<MedsFormValues>;
  register: UseFormRegister<MedsFormValues>;
  setValue: UseFormSetValue<MedsFormValues>;
  getValues: UseFormGetValues<MedsFormValues>;
  onRemove: () => void;
  /** Enter in a field: add a row after the last one, otherwise move down. */
  onEnter: (index: number) => void;
  suggestionsListId: string;
  frequentByKey: Map<string, FrequentDrug>;
}

/**
 * One medicine. Where the form is wide: a single line under the header row.
 * Otherwise a card with the drug name on top and labelled fields below. The
 * layout follows the form's own width (container queries in globals.css).
 * Choosing a suggested drug fills in its usual dosing wherever the row is empty.
 */
const MedicationRow = ({
  index,
  isLast,
  control,
  register,
  setValue,
  getValues,
  onRemove,
  onEnter,
  suggestionsListId,
  frequentByKey,
}: Props) => {
  const base = `drugs.${index}` as const;
  const nameField = register(`${base}.drug_name`);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // never submit the form
      onEnter(index);
    }
  };

  const fillUsualFor = (name: string) => {
    const match = frequentByKey.get(drugKey(name));
    if (!match) return;
    const updates = applyUsual(getValues(base), match.usual);
    for (const [field, value] of Object.entries(updates)) {
      setValue(
        `${base}.${field as keyof MedicationRowValues}`,
        value as never,
        {
          shouldDirty: true,
        },
      );
    }
  };

  return (
    <div
      className="med-row"
      role="group"
      aria-label={`Medication ${index + 1}`}
    >
      {/* Card: number + name + remove on one line; one-line layout: grid cells */}
      <div className="med-row__top">
        <Text size="2" weight="bold" className="med-row__num" aria-hidden>
          {index + 1}.
        </Text>
        <Field label="Drug" className="flex-1">
          <TextField.Root
            {...nameField}
            onChange={(e) => {
              nameField.onChange(e);
              fillUsualFor(e.target.value);
            }}
            list={suggestionsListId}
            autoComplete="off"
            placeholder="Start typing a drug…"
            size="2"
            className="uppercase"
            data-med-name={index}
            onKeyDown={onKeyDown}
          />
        </Field>
        {/* Plain wrapper carries the grid placement (Radix button CSS overrides it). */}
        <div className="med-row__remove">
          <IconButton
            type="button"
            variant="ghost"
            color="red"
            onClick={onRemove}
            aria-label={`Remove medication ${index + 1}`}
            title="Remove"
          >
            <Cross2Icon />
          </IconButton>
        </div>
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
