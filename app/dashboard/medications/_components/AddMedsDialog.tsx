"use client";

import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import MedsEntryForm from "./MedsEntryForm";

const AddMedsDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="soft" color="teal">
          Add New Drug to Database
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Drug Details</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter details of new drug
        </Dialog.Description>

        <MedsEntryForm setOpen={() => setOpen(false)} />

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddMedsDialog;
