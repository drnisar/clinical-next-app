"use client";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import AppointmentForm from "./AppointmentForm";

interface Props {
  registration_id: string;
  /** Pre-selected appointment type. */
  type: string;
}

const CreateAppointmentDialog = ({ registration_id, type }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="soft">
          <PlusCircledIcon />
          Create New Appointment
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="720px">
        <Flex justify="between" align="start">
          <Dialog.Title>New appointment</Dialog.Title>
          <Dialog.Close>
            <IconButton variant="ghost" color="gray" aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </Flex>
        <Dialog.Description size="2" color="gray" mb="3">
          The calendar shows how many patients are already booked each day.
        </Dialog.Description>
        <AppointmentForm
          registration_id={registration_id}
          defaultType={type}
          onSuccess={() => setOpen(false)}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateAppointmentDialog;
