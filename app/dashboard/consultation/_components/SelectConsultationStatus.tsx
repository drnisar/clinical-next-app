"use client";
import { Status } from "@/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useConsultationStatus } from "./ConsultationStore";
import { useEffect } from "react";

const SelectConsultationStatus = () => {
  // const defaultType = appointmentTypeOptions[0]?.value || "";

  const statuses: { label: string; value?: Status | "ALL" }[] = [
    { label: "All", value: "ALL" },
    { label: "QUEUED", value: Status.QUEUED },
    { label: "IN_PROGRESS", value: Status.IN_PROGRESS },
    { label: "COMPLETED", value: Status.COMPLETED },
  ];

  const { setStatus, status } = useConsultationStatus();
  const handleValueChange = (value: string) => {
    setStatus(value);
  };
  useEffect(() => {
    console.log("Status changed:", status);
  });

  return (
    <Select.Root onValueChange={handleValueChange} value={status}>
      <Select.Trigger placeholder="Select Status" />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default SelectConsultationStatus;
