"use client";

import { Admission_Discharge } from "@/generated/prisma";
import { Button, Flex, Select, TextField } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
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
  discharge_date: Date;
}

const DischargeForm = ({ admission }: Props) => {
  const [status, setStatus] = useState(admission.status || "");
  const [disMode, setDisMode] = useState<string>(
    admission.discharge_mode || ""
  );
  const router = useRouter();
  const [disDate, setDisDate] = useState(
    new Date(admission.discharge_date || "")
  );
  const [formChanged, setFormChanged] = useState(false);

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationKey: ["discharge"],
    mutationFn: async (data: DischargeData) => {
      const response = await axios.patch(
        "/api/admission/" + admission.admission_id,
        data
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
      discharge_date: new Date(disDate),
    };

    addMutation.mutate(disData);
  };

  return (
    <>
      <Toaster />
      <form>
        <Flex gap="5" p="4">
          <label htmlFor="status">Discharge Status</label>
          <Select.Root
            onValueChange={(value) => {
              setStatus(value);
              setFormChanged(true);
            }}
            value={status}
            size={"1"}
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
          {status === "DISCHARGED" && (
            <>
              <label>Mode</label>
              <Select.Root
                onValueChange={(value) => {
                  setDisMode(value);
                  setFormChanged(true);
                }}
                value={disMode}
                size={"1"}
              >
                <Select.Trigger placeholder="Select Discharge Status">
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
            </>
          )}
          {status === "DISCHARGED" && disMode !== "" && (
            <>
              <label>Discharge Date</label>
              <TextField.Root
                type="date"
                size={"1"}
                defaultValue={disDate && disDate.toString().split("T")[0]}
                onBlur={(e) => {
                  setDisDate(new Date(e.target.value));
                }}
                onChange={() => {
                  setFormChanged(true);
                }}
              />
            </>
          )}
          {formChanged && (
            <Button
              variant="soft"
              className="align-self-end"
              onClick={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              disabled={addMutation.isPending}
              size="1"
              // disabled={!formChanged}
            >
              Save
            </Button>
          )}
        </Flex>
      </form>
    </>
  );
};

export default DischargeForm;
