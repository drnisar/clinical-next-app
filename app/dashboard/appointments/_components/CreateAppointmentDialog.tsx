import { Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm";
import { Appointment, Registration } from "@/generated/prisma";
import RecentAppointmentsTable from "./RecentAppointmentsTable";
import { CircleIcon, PlusCircledIcon } from "@radix-ui/react-icons";

interface Props {
  registration_id: string;
  type: string;
  appointments: ({ registration: Registration } & Appointment)[];
  searchParams: { type: string };
}

const CreateAppointmentDialog = ({
  registration_id,
  appointments,
  searchParams,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="soft" size="1">
          <PlusCircledIcon />
          Create New Appointment
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-90vW h-90vh" maxWidth={"90vw"}>
        <Dialog.Close>
          <CircleIcon className="fixed right-4, top-4" />
        </Dialog.Close>
        <Dialog.Title>Create new appointment</Dialog.Title>
        <Flex gap="4" width={"100%"} direction="column">
          <AppointmentForm
            registration_id={registration_id}
            successFn={() => setOpen(false)}
          />
          {/* <AppointmentsTable appointments={appointments} /> */}
          {appointments && appointments.length > 0 && (
            <RecentAppointmentsTable
              appointments={appointments}
              searchParams={searchParams}
            />
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateAppointmentDialog;
