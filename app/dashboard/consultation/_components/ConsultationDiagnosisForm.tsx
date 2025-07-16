import { Flex, TextArea } from "@radix-ui/themes";
import React, { useState } from "react";
import ButtonSaveNotes from "./ButtonSaveNotes";

interface Props {
  defaultValue: string;
  consultation_id: string;
  registration_id: string;
  slug: string;
}
const ConsultationDiagnosisForm = ({
  defaultValue,
  consultation_id,
  registration_id,
  slug,
}: Props) => {
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
      <ButtonSaveNotes fieldData={diagnosis} id={consultation_id} slug={slug} />
    </Flex>
  );
};

export function Diagnosis() {}

export default ConsultationDiagnosisForm;
