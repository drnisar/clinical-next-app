"use client";
import { Select } from "@radix-ui/themes";
import React, { useState } from "react";
import { appointmentTypeOptions } from "../../_components/appConstants";
import { useAppointmentsStore } from "./AppointmentsStore";

const SelectAppointmentType = () => {
  // const defaultType = appointmentTypeOptions[0]?.value || "";
  const [selectedValue, setSelectedValue] = useState("");
  const { setType } = useAppointmentsStore();
  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setType(value); // Update the Zustand store
  };
  const appointmentTypes = appointmentTypeOptions;
  return (
    <Select.Root value={selectedValue} onValueChange={handleValueChange}>
      <Select.Trigger placeholder="Select Appointment Type" />
      <Select.Content>
        {appointmentTypes.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default SelectAppointmentType;
