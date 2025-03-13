"use client";
import { ConsultationMedications, medsTemplates } from "@prisma/client";
import { Button, Dialog, Flex, TextField, Text, Box } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  medsArray: ConsultationMedications[];
}

type MedsTemplate = medsTemplates;

const MedsAddToTemplateDialog = ({ medsArray }: Props) => {
  const [templateName, setTemplateName] = useState("");
  // const [arrayMeds setArrayMeds] = useState([]);
  const medsArrayTemplate = medsArray.map(
    ({ consult_med_id, visit_id, ...modifiedMed }) => modifiedMed
  );

  const mutation = useMutation({
    mutationFn: async (data: MedsTemplate) =>
      await axios.post("/api/medsTemplates", data),
    onSuccess: () => alert("Template added successfully"),
    onError: (error) => console.log("Error adding template", error),
  });

  const addToTemplate = () => {
    const data = { templateName, medsArrayTemplate };
    mutation.mutate(data);
  };
  return (
    <Box mt="5">
      <Text as="div">
        Do you want to add current medicines list to custom template?
      </Text>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="soft" color="red">
            Add
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add the drugs to template</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Suggest a name for the template
              </Text>
              <TextField.Root
                defaultValue=""
                placeholder="Enter the name of the template"
                onBlur={(e) => setTemplateName(e.target.value)}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={addToTemplate}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

export default MedsAddToTemplateDialog;
