import React, { useState } from "react";
import ButtonSaveNotes from "./ButtonSaveNotes";
import { Checkbox, Flex, Text, TextArea } from "@radix-ui/themes";
import { investigationsArray } from "../../_components/appConstants";
interface Props {
  defaultValue: string;
  consultation_id: string;
  registration_id: string;
  slug: string;
}
const ConsultationInvestigationsAdvisedForm = ({
  defaultValue,
  consultation_id,
  registration_id,
  slug,
}: Props) => {
  const [investigationsAdvised, setInvestigationsAdvised] = useState<string[]>(
    []
  );

  console.log(investigationsAdvised);

  return (
    <Flex gap="2" direction="column" mt="2">
      {/* <TextArea
        style={{ minHeight: "200px" }}
        defaultValue={defaultValue}
        onChange={(e) =>
          setInvestigationsAdvised({
            investigationsAdvised: e.target.value,
            registration_id: registration_id,
          })
        }
      />
       */}

      <Checkbox
        defaultChecked={defaultValue.includes("Blood Test")}
        onCheckedChange={(checked) =>
          setInvestigationsAdvised((prevState) => {
            if (checked) {
              return [...prevState, "Blood Test"];
            } else {
              return prevState.filter((item) => item !== "Blood Test");
            }
          })
        }
      />
      <Checkbox
        defaultChecked={defaultValue.includes("Urine Test")}
        onCheckedChange={(checked) =>
          setInvestigationsAdvised((prevState) => {
            if (checked) {
              return [...prevState, "Urine Test"];
            } else {
              return prevState.filter((item) => item !== "Urine Test");
            }
          })
        }
      />
      {investigationsArray.map((inv) => {
        const invValue = typeof inv === "string" ? inv : inv.value;
        const invLabel = typeof inv === "string" ? inv : inv.label;
        return (
          <div key={invValue}>
            <Text as="label">
              <Flex gap="2" align="center">
                <Checkbox
                  key={invValue}
                  defaultChecked={defaultValue.includes(invValue)}
                  onCheckedChange={(checked) =>
                    setInvestigationsAdvised((prev) => {
                      if (checked) {
                        return [...prev, invValue];
                      } else {
                        return prev.filter((item) => item !== invValue);
                      }
                    })
                  }
                />
                {invLabel}
              </Flex>
            </Text>
          </div>
        );
      })}
      <ButtonSaveNotes
        fieldData={investigationsAdvised}
        id={consultation_id}
        slug={slug}
      />
    </Flex>
  );
};

export default ConsultationInvestigationsAdvisedForm;
