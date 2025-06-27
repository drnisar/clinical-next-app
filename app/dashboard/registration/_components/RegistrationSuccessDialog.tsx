"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import AddToClinicQueueButton from "./AddToClinicQueueButton";
interface Props {
  isDialogOpen: boolean;
  id: string;
}
const RegistrationSuccessDialog = ({ isDialogOpen, id }: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/dashboard/registration");
  }, [router]);
  // const handleAddToConsultationQueue = () => {
  //   router.push("/dashboard/consultation");
  // };
  return (
    <Dialog.Root open={isDialogOpen}>
      <Dialog.Content>
        <Dialog.Title color="blue">Further Actions</Dialog.Title>
        <Dialog.Description>
          Click one of the options below to proceed:
        </Dialog.Description>
        <Flex justify={"between"} className="mt-5">
          <AddToClinicQueueButton registration_id={id} />
          <Button
            color="blue"
            variant="soft"
            size="1"
            onClick={() => router.push("/dashboard/registration")}
          >
            Go to Registrations Page
          </Button>
          <Button
            color="green"
            variant="soft"
            size="1"
            onClick={() => router.push("/dashboard/registration/" + id)}
          >
            Further Details
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default RegistrationSuccessDialog;
