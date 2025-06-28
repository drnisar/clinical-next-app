import { Badge, Select } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: string;
}

const StatusChangeComponent = ({ status }: Props) => {
  // Determine badge color based on status
  let color: React.ComponentProps<typeof Badge>["color"] = "gray";
  if (status === "COMPLETED") color = "green";
  if (status === "QUEUED") color = "orange";
  if (status === "IN_PROGRESS") color = "blue";

  return (
    <Select.Root value={status} size={"1"}>
      <Select.Trigger
        placeholder={status}
        variant="soft"
        color={color}
        radius="full"
      >
        {status}
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
