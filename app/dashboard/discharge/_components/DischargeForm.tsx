"use client";

import { Admission_Discharge } from "@/generated/prisma";
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  dateYYYYMMDD,
  dischargeModes,
  dischargeStatuses,
} from "../../_components/appConstants";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  admission: Admission_Discharge;
}
interface DischargeData {
  status: string;
  discharge_mode: string;
  discharge_date: Date | null;
}

// Label + control, stacked on phones (full-width control) and inline on wider
// screens.
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Flex
    direction={{ initial: "column", sm: "row" }}
    align={{ initial: "stretch", sm: "center" }}
    gap={{ initial: "1", sm: "2" }}
  >
    <Text as="label" size="2" weight="medium">
      {label}
    </Text>
    {children}
  </Flex>
);

const DischargeForm = ({ admission }: Props) => {
  const [status, setStatus] = useState(admission.status || "");
  const [disMode, setDisMode] = useState<string>(
    admission.discharge_mode || "",
  );
  const router = useRouter();
  // null when the admission has no discharge date yet (input shows empty).
  const [disDate, setDisDate] = useState<Date | null>(
    admission.discharge_date ? new Date(admission.discharge_date) : null,
  );
  const [formChanged, setFormChanged] = useState(false);

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationKey: ["discharge"],
    mutationFn: async (data: DischargeData) => {
      const response = await axios.patch(
        "/api/admission/" + admission.admission_id,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admission"] });
      // Show success toast
      toast.success("Discharge status updated successfully", {
        duration: 3000,
      });
      setFormChanged(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error("Failed to update discharge status", {
        duration: 3000,
      });

      console.error("Error updating discharge:", error);
    },
  });
  const onSubmit = () => {
    const disData = {
      status: status,
      discharge_mode: disMode,
      discharge_date: disDate,
    };

    addMutation.mutate(disData);
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {/* Phones: fields stacked full-width, larger controls, full-width Save.
            Wider screens: one row, as before. */}
        <Flex
          direction={{ initial: "column", sm: "row" }}
          align={{ initial: "stretch", sm: "center" }}
          wrap="wrap"
          gap={{ initial: "3", sm: "5" }}
          p={{ initial: "3", sm: "4" }}
        >
          <Field label="Discharge Status">
            <Select.Root
              onValueChange={(value) => {
                setStatus(value);
                setFormChanged(true);
              }}
              value={status}
              size={{ initial: "3", sm: "1" }}
            >
              <Select.Trigger placeholder="Select Discharge Status">
                {status}
              </Select.Trigger>
              <Select.Content>
                {dischargeStatuses.map((status) => (
                  <Select.Item key={status.value} value={status.value}>
                    {status.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Field>

          {status === "DISCHARGED" && (
            <Field label="Mode">
              <Select.Root
                onValueChange={(value) => {
                  setDisMode(value);
                  setFormChanged(true);
                }}
                value={disMode}
                size={{ initial: "3", sm: "1" }}
              >
                <Select.Trigger placeholder="Select Discharge Mode">
                  {disMode}
                </Select.Trigger>
                <Select.Content>
                  {dischargeModes.map((mode) => (
                    <Select.Item key={mode.value} value={mode.value}>
                      {mode.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Field>
          )}

          {status === "DISCHARGED" && disMode !== "" && (
            <Field label="Discharge Date">
              <TextField.Root
                type="date"
                size={{ initial: "3", sm: "1" }}
                defaultValue={disDate ? dateYYYYMMDD(disDate) : ""}
                // onChange, not onBlur: mobile date pickers often don't blur
                // before Save is tapped.
                onChange={(e) => {
                  setDisDate(e.target.value ? new Date(e.target.value) : null);
                  setFormChanged(true);
                }}
              />
            </Field>
          )}

          {formChanged && (
            <Button
              type="submit"
              variant="soft"
              disabled={addMutation.isPending}
              size={{ initial: "3", sm: "1" }}
            >
              {addMutation.isPending ? "Saving..." : "Save"}
            </Button>
          )}
        </Flex>
      </form>
    </>
  );
};

export default DischargeForm;
