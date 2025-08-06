"use client";
import { Badge, Select, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface Props {
  status: string;
  consultation_id: string; // Assuming you need consultation_id for the API call
}

const StatusChangeComponent = ({ status, consultation_id }: Props) => {
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // Determine badge color based on status
  let color: React.ComponentProps<typeof Badge>["color"] = "gray";
  if (value === "COMPLETED") color = "green";
  if (value === "QUEUED") color = "orange";
  if (value === "IN_PROGRESS") color = "blue";

  const valueChange = (value: string) => {
    startTransition(async () => {
      setValue(value);
      // Here you can add logic to handle the status change, e.g., API call
      await axios
        .patch(`/api/consultation/${consultation_id}`, { status: value })
        .then((response) => {
          console.log("Status updated successfully:", response.data);
          router.refresh();
          toast.success(`Status changed to ${value}`);
        })
        .catch((error) => {
          console.error("Error updating status:", error);
          toast.error("Failed to update status");
          setValue(status); // Reset to original status on error
        });
    });
  };

  return (
    <Select.Root
      value={value}
      size={"1"}
      onValueChange={valueChange}
      disabled={isPending}
    >
      <Select.Trigger
        placeholder={value}
        variant="soft"
        color={color}
        radius="full"
      >
        {!isPending ? value : <Spinner size="1" />}
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="QUEUED">QUEUED</Select.Item>
        <Select.Item value="IN_PROGRESS">IN_PROGRESS</Select.Item>
        <Select.Item value="COMPLETED">COMPLETED</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusChangeComponent;
