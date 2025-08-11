"use client";
import { Flex, TextArea, Box, Button } from "@radix-ui/themes";
import ButtonSaveDischargeComponents from "../_components/ButtonSaveDischargeComponents";
import { useState } from "react";
import useDischargePageStore from "@/app/store/dischargePageStore";

interface Props {
  defaultValue: string;
  admission_id: string;
  onSave: () => void;
}

export function TherapeuticProceduresTab({
  defaultValue,
  admission_id,
  onSave,
}: Props) {
  const [therapeuticProcedures, setTherapeuticProcedures] = useState({
    therapeutic_procedures: defaultValue || "",
  });
  const { otNotesArray } = useDischargePageStore();

  const otNotes =
    otNotesArray.length > 0
      ? otNotesArray
          .map((ot) => {
            return `Surgery Date: ${
              ot.surgery_date?.toLocaleDateString("en-GB") || "Not recorded"
            }
Procedure: ${ot.procedure_name || "Not specified"}
Findings: ${ot.findings || "Not recorded"}
Operative Details: ${ot.operative_details || "Not recorded"}`;
          })
          .join("\n\n" + "─".repeat(50) + "\n\n")
      : "";

  const handleLoadOTNotes = () => {
    if (otNotes) {
      const newValue = therapeuticProcedures.therapeutic_procedures
        ? `${therapeuticProcedures.therapeutic_procedures}\n\n${otNotes}`
        : otNotes;

      setTherapeuticProcedures({
        therapeutic_procedures: newValue,
      });
    }
  };

  const handleClearAndLoadOTNotes = () => {
    if (otNotes) {
      setTherapeuticProcedures({
        therapeutic_procedures: otNotes,
      });
    }
  };

  return (
    <Flex direction="column" mt="2" className="h-full flex-grow">
      <Flex gap="2" style={{ marginBottom: "8px" }}>
        <Button
          onClick={handleClearAndLoadOTNotes}
          disabled={!otNotes}
          variant="soft"
          size="1"
        >
          Replace with OT Notes
        </Button>
        <Button
          onClick={handleLoadOTNotes}
          disabled={!otNotes}
          variant="outline"
          size="1"
        >
          Append OT Notes
        </Button>
        {otNotesArray.length > 0 && (
          <span
            style={{ fontSize: "14px", color: "gray", alignSelf: "center" }}
          >
            {otNotesArray.length} OT note(s) available
          </span>
        )}
      </Flex>

      <Box className="flex-grow h-[calc(100vh-400px)]">
        <TextArea
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
          }}
          placeholder="Therapeutic Procedures like Surgery, Plasmapharesis, Dialysis etc"
          value={therapeuticProcedures.therapeutic_procedures || ""}
          onChange={(e) =>
            setTherapeuticProcedures({
              therapeutic_procedures: e.target.value,
            })
          }
        />
      </Box>

      <Box className="mt-4">
        <ButtonSaveDischargeComponents
          admission_id={admission_id}
          fieldData={therapeuticProcedures}
          onSave={onSave}
        />
      </Box>
    </Flex>
  );
}
