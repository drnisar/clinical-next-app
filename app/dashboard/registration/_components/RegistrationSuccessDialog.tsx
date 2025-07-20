"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import AddToClinicQueueButton from "./AddToClinicQueueButton";
interface Props {
  isDialogOpen: boolean;
  id: string;
  regDataForDialog?: { first_name: string; mr_number: string };
}
const RegistrationSuccessDialog = ({
  isDialogOpen,
  id,
  regDataForDialog,
}: Props) => {
  const router = useRouter();

  return (
    <Dialog.Root open={isDialogOpen}>
      <Dialog.Content>
        <Dialog.Title color="blue">Further Actions</Dialog.Title>
        {regDataForDialog && (
          <div className="mb-4">
            <strong>Name:</strong> {regDataForDialog.first_name} <br />
            <strong>MR Number:</strong> {regDataForDialog.mr_number}
          </div>
        )}
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
