import React, { useState } from "react";
import ButtonSaveNotes from "./ButtonSaveNotes";
import { Flex, TextArea } from "@radix-ui/themes";
interface Props {
  defaultValue: string;
  consultation_id: string;
  registration_id: string;
  slug: string;
}
const ConsultationHistoryForm = ({
  defaultValue,
  consultation_id,
  registration_id,
  slug,
}: Props) => {
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
      <ButtonSaveNotes fieldData={history} id={consultation_id} slug={slug} />
    </Flex>
  );
};

export default ConsultationHistoryForm;
