import { Medication } from "@/generated/prisma";
import { DataList, Dialog, TextField } from "@radix-ui/themes";
import { useState } from "react";
import MedsDisplayEnglish from "./MedsDisplayEnglish";
import ButtonPostData from "./functional_components/ButtonPostData";

interface Props {
  drugsArray: Medication[];
}

const AddToMedsTemplateDialog = ({ drugsArray }: Props) => {
  const [templateName, setTemplateName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dataForSubmission = {
    template_name: templateName,
    meds: drugsArray,
  };
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger>
        <button className="btn btn-primary">Add to Meds Template</button>
      </Dialog.Trigger>
      <Dialog.Content onPointerDownOutside={(e) => e.preventDefault()}>
        <Dialog.Close
          aria-label="close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
          }}
        >
          <button className="btn btn-ghost">✕</button>
        </Dialog.Close>
        <Dialog.Title>Add to Medications Template</Dialog.Title>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Medicines List</DataList.Label>
            <DataList.Value>
              <MedsDisplayEnglish meds={drugsArray} />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Template Name</DataList.Label>
            <DataList.Value>
              <TextField.Root
                name="template_name"
                type="text"
                onBlur={(e) => setTemplateName(e.target.value)}
              />
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        {/* <Label>Suggest Template Name</Label> */}

        <ButtonPostData
          slug={"/api/templates/meds_templates"}
          fieldData={dataForSubmission}
          buttonText="Save Template"
          onSuccess={() => {
            setIsDialogOpen(false);
          }}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddToMedsTemplateDialog;
