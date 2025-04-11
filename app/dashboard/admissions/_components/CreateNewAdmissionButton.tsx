"use client";
import { Button, Dialog } from "@radix-ui/themes";
import AdmissionForm from "./AdmissionForm";

const CreateNewAdmissionButton = ({
  registration_id,
}: {
  registration_id: number;
}) => {
  return (
    <>
      <Dialog.Root>
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

          <AdmissionForm registration_id={registration_id} />

          <Dialog.Close aria-label="close" className="items-end">
            <Button size="1" variant="soft">
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default CreateNewAdmissionButton;
