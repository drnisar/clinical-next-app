import { Box, Flex, TextArea } from "@radix-ui/themes";
import { useState } from "react";
import ButtonSaveDischargeComponents from "./ButtonSaveDischargeComponents";

interface Props {
  defaultValue: string;
  admission_id: string;
  onSave: () => void;
}

export function Diagnosis({ defaultValue, admission_id, onSave }: Props) {
  const [diagnosis, setDiagnosis] = useState({});

  return (
    <Flex direction="column" mt="2" className="h-full flex-grow">
      <Box className="flex-grow h-[calc(100vh-400px)]">
        <TextArea
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
          }}
          placeholder="Diagnosis"
          defaultValue={defaultValue}
          onChange={(e) =>
            setDiagnosis({
              diagnosis: e.target.value,
            })
          }
        />
      </Box>
      <Box className="mt-4">
        <ButtonSaveDischargeComponents
          admission_id={admission_id}
          fieldData={diagnosis}
          onSave={onSave}
        />
      </Box>
    </Flex>
  );
}
export function DischargeSummary({
  defaultValue,
  admission_id,
  onSave,
}: Props) {
  const [summary, setSummary] = useState({});

  return (
    <Flex direction="column" mt="2" className="h-full flex-grow">
      <Box className="flex-grow h-[calc(100vh-400px)]">
        <TextArea
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
          }}
          placeholder="Hospital Stay Summary"
          defaultValue={defaultValue}
          onChange={(e) =>
            setSummary({
              discharge_summary: e.target.value,
            })
          }
        />
      </Box>
      <Box className="mt-4">
        <ButtonSaveDischargeComponents
          admission_id={admission_id}
          fieldData={summary}
          onSave={onSave}
        />
      </Box>
    </Flex>
  );
}

export function HospitalInvestigations({
  defaultValue,
  admission_id,
  onSave,
}: Props) {
  const [hospitalInvestigations, setHospitalInvestigations] = useState({});

  return (
    <Flex direction="column" mt="2" className="h-full flex-grow">
      <Box className="flex-grow h-[calc(100vh-400px)]">
        <TextArea
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
          }}
          placeholder="Investigations Done in Hospital"
          defaultValue={defaultValue}
          onChange={(e) =>
            setHospitalInvestigations({
              hospital_investigations: e.target.value,
            })
          }
        />
      </Box>
      <Box className="mt-4">
        <ButtonSaveDischargeComponents
          admission_id={admission_id}
          fieldData={hospitalInvestigations}
          onSave={onSave}
        />
      </Box>
    </Flex>
  );
}
export function DiagnosticProcedures({
  defaultValue,
  admission_id,
  onSave,
}: Props) {
  const [diagnosticProcedures, setDiagnosticProcedures] = useState({});

  return (
    <Flex direction="column" mt="2" className="h-full flex-grow">
      <Box className="flex-grow h-[calc(100vh-400px)]">
        <TextArea
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
          }}
          placeholder="Diagnostic Procedures like Endoscopy, Colonoscopy, Exercise Tolerance Test etc"
          defaultValue={defaultValue}
          onChange={(e) =>
            setDiagnosticProcedures({
              diagnostic_procedures: e.target.value,
            })
          }
        />
      </Box>
      <Box className="mt-4">
        <ButtonSaveDischargeComponents
          admission_id={admission_id}
          fieldData={diagnosticProcedures}
          onSave={onSave}
        />
      </Box>
    </Flex>
  );
}
export function TherapeuticProcudures({
  defaultValue,
  admission_id,
  onSave,
}: Props) {
  const [therapeuticProcedures, setTherapeuticProcedures] = useState({});

  return (
    <Flex direction="column" mt="2" className="h-full flex-grow">
      <Box className="flex-grow h-[calc(100vh-400px)]">
        <TextArea
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
          }}
          placeholder="Therapeutic Procedures like Surgery, Plasmapharesis, Dialysis etc"
          defaultValue={defaultValue}
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
export function Instructions({ defaultValue, admission_id, onSave }: Props) {
  const [instructions, setInstructions] = useState({});

  return (
    <Flex direction="column" mt="2" className="h-full flex-grow">
      <Box className="flex-grow h-[calc(100vh-400px)]">
        <TextArea
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
          }}
          placeholder="Write intstructions for the patient like diet, exercise, follow up etc"
          defaultValue={defaultValue}
          onChange={(e) =>
            setInstructions({
              instructions: e.target.value,
            })
          }
        />
      </Box>
      <Box className="mt-4">
        <ButtonSaveDischargeComponents
          admission_id={admission_id}
          fieldData={instructions}
          onSave={onSave}
        />
      </Box>
    </Flex>
  );
}
export function MedicalRest({ defaultValue, admission_id, onSave }: Props) {
  const [medicalRest, setMedicalRest] = useState({});

  return (
    <Flex direction="column" mt="2" className="h-full flex-grow">
      <Box className="flex-grow h-[calc(100vh-400px)]">
        <TextArea
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            boxSizing: "border-box",
          }}
          placeholder="Medical Rest if advisable"
          defaultValue={defaultValue}
          onChange={(e) =>
            setMedicalRest({
              medical_leave: e.target.value,
            })
          }
        />
      </Box>
      <Box className="mt-4">
        <ButtonSaveDischargeComponents
          admission_id={admission_id}
          fieldData={medicalRest}
          onSave={onSave}
        />
      </Box>
    </Flex>
  );
}
