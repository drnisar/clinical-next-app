"use client";
import { TextArea, Flex } from "@radix-ui/themes";
import { useState } from "react";
import ButtonSaveConsultationNotes from "./ButtonSaveConsultationNotes";

interface Props {
  defaultValue: string;
  consultation_id: string;
  registration_id: string;
}

export function History({
  defaultValue,
  consultation_id,
  registration_id,
}: Props) {
  const [history, setHistory] = useState({});

  return (
    <Flex gap="2" direction="column" mt="2">
      <TextArea
        style={{ minHeight: "200px" }}
        defaultValue={defaultValue}
        onChange={(e) =>
          setHistory({
            history: e.target.value,
            registration_id: registration_id,
          })
        }
      />
      <ButtonSaveConsultationNotes
        consultation_id={consultation_id}
        fieldData={history}
      />
    </Flex>
  );
}
export function Examination({
  defaultValue,
  consultation_id,
  registration_id,
}: Props) {
  const [examination, setExamination] = useState({});

  return (
    <Flex gap="2" direction="column" mt="2">
      <TextArea
        style={{ minHeight: "200px" }}
        defaultValue={defaultValue}
        onChange={(e) =>
          setExamination({
            examination: e.target.value,
            registration_id: registration_id,
          })
        }
      />
      <ButtonSaveConsultationNotes
        consultation_id={consultation_id}
        fieldData={examination}
      />
    </Flex>
  );
}
export function Investigations({
  defaultValue,
  consultation_id,
  registration_id,
}: Props) {
  const [investigations, setInvestigations] = useState({});

  return (
    <Flex gap="2" direction="column" mt="2">
      <TextArea
        style={{ minHeight: "200px" }}
        defaultValue={defaultValue}
        onChange={(e) =>
          setInvestigations({
            investigations: e.target.value,
            registration_id: registration_id,
          })
        }
      />
      <ButtonSaveConsultationNotes
        consultation_id={consultation_id}
        fieldData={investigations}
      />
    </Flex>
  );
}
export function Diagnosis({
  defaultValue,
  consultation_id,
  registration_id,
}: Props) {
  const [diagnosis, setDiagnosis] = useState({});

  return (
    <Flex gap="2" direction="column" mt="2">
      <TextArea
        style={{ minHeight: "200px" }}
        defaultValue={defaultValue}
        onChange={(e) =>
          setDiagnosis({
            diagnosis: e.target.value,
            registration_id: registration_id,
          })
        }
      />
      <ButtonSaveConsultationNotes
        consultation_id={consultation_id}
        fieldData={diagnosis}
      />
    </Flex>
  );
}
export function Plan({
  defaultValue,
  consultation_id,
  registration_id,
}: Props) {
  const [plan, setPlan] = useState({});

  return (
    <Flex gap="2" direction="column" mt="2">
      <TextArea
        style={{ minHeight: "200px" }}
        defaultValue={defaultValue}
        onChange={(e) =>
          setPlan({
            plan: e.target.value,
            registration_id: registration_id,
          })
        }
      />
      <ButtonSaveConsultationNotes
        consultation_id={consultation_id}
        fieldData={plan}
      />
    </Flex>
  );
}
export function Instructions({
  defaultValue,
  consultation_id,
  registration_id,
}: Props) {
  const [instructions, setInstructions] = useState({});

  return (
    <Flex gap="2" direction="column" mt="2">
      <TextArea
        style={{ minHeight: "200px" }}
        defaultValue={defaultValue}
        onChange={(e) =>
          setInstructions({
            instructions: e.target.value,
            registration_id: registration_id,
          })
        }
      />
      <ButtonSaveConsultationNotes
        consultation_id={consultation_id}
        fieldData={instructions}
      />
    </Flex>
  );
}
