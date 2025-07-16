import { Flex, TextArea } from "@radix-ui/themes";
import React, { useState } from "react";
import ButtonSaveNotes from "./ButtonSaveNotes";

interface Props {
  defaultValue: string;
  consultation_id: string;
  registration_id: string;
  slug: string;
}
const ConsultationPlanForm = ({
  defaultValue,
  consultation_id,
  registration_id,
  slug,
}: Props) => {
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
      <ButtonSaveNotes fieldData={plan} id={consultation_id} slug={slug} />
    </Flex>
  );
};

export default ConsultationPlanForm;
