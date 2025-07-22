"use client";
import { DataList, Dialog, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import ButtonPostData from "../../_components/functional_components/ButtonPostData";

interface Props {
  procedure: string;
  findings: string;
  operative_details: string;
  closure: string;
  instructions: string;
}

const AddToOTTemplateDialog = ({
  procedure,
  findings,
  operative_details,
  closure,
  instructions,
}: Props) => {
  const [template_name, setTemplate_name] = useState("");
  const [open, setOpen] = useState(false);

  const data = {
    procedure,
    findings,
    operative_details,
    closure,
    instructions,
    template_name,
  };
  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <button className="btn btn-primary">Add to OT Template</button>
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
          <Dialog.Title>Add to OT Template</Dialog.Title>
          <DataList.Root>
            <DataList.Item>
              <DataList.Label>Procedure</DataList.Label>
              <DataList.Value>{procedure}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Findings</DataList.Label>
              <DataList.Value>{findings}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Operative Details</DataList.Label>
              <DataList.Value>{operative_details}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Closure</DataList.Label>
              <DataList.Value>{closure}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Instructions</DataList.Label>
              <DataList.Value>{instructions}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Name</DataList.Label>
              <DataList.Value>
                <TextField.Root
                  size="1"
                  className="w-full"
                  name="temp_name"
                  onBlur={(e) => setTemplate_name(e.target.value)}
                />
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
          <Dialog.Description></Dialog.Description>

          {/* <Button
            onClick={() => console.log(data)}
            variant="soft"
            color="gray"
            size="1"
          >
            Save Template
          </Button> */}
          <ButtonPostData
            buttonText="Save Template"
            slug="/api/templates/ot_templates"
            fieldData={data}
            onSuccess={() => setOpen(true)}
          />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default AddToOTTemplateDialog;
