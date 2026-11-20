"use client";
import { Select } from "@radix-ui/themes";
import { appointmentTypeOptions } from "../../_components/appConstants";

/** Value meaning "no type filter" (Radix Select items can't use ""). */
export const ALL_TYPES = "ALL";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SelectAppointmentType = ({ value, onChange }: Props) => (
  <Select.Root value={value} onValueChange={onChange}>
    <Select.Trigger aria-label="Filter by appointment type" />
    <Select.Content>
      <Select.Item value={ALL_TYPES}>All types</Select.Item>
      {appointmentTypeOptions.map((option) => (
        <Select.Item key={option.value} value={option.value}>
          {option.label}
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Root>
);

export default SelectAppointmentType;
