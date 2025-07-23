import { Medication } from "@/generated/prisma";
import { Dialog } from "@radix-ui/themes";
import React from "react";
import MedsDisplayEnglish from "./MedsDisplayEnglish";

interface Props {
  drugsArray: Medication[];
}

const AddToMedsTemplateDialog = ({ drugsArray }: Props) => {
  return (
    <Dialog.Root>
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
        <MedsDisplayEnglish meds={drugsArray} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddToMedsTemplateDialog;
