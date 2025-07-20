"use client";
import { Button, Dialog } from "@radix-ui/themes";
import AdmissionForm from "./AdmissionForm";
import { useState } from "react";

const CreateNewAdmissionButton = ({
  registration_id,
}: {
  registration_id: string;
}) => {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <Dialog.Root open={open}>
        <Dialog.Trigger>
          <Button variant="soft" color="gray" size="2">
            Create New Admission
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Create New Admission</Dialog.Title>
          <Dialog.Description>
            Fill in the details to create a new admission.
          </Dialog.Description>

          <AdmissionForm
            registration_id={registration_id}
            onSuccess={() => setIsOpen(false)}
          />

          {/* <Dialog.Close aria-label="close" className="place-items-end ">
            <Button size="1" variant="soft">
              Close
            </Button>
          </Dialog.Close> */}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default CreateNewAdmissionButton;
