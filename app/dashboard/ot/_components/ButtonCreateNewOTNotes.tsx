"use client";

import { Admission_Discharge, OT } from "@/generated/prisma";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  admission: Admission_Discharge;
  otNotes: OT[];
}

const ButtonCreateNewOTNotes = ({ admission, otNotes }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const hasUnfinalizedOTNotes = otNotes.some((ot) => ot.finalize !== 1);
  const firstUnfinalizedNotes = otNotes.find((ot) => ot.finalize !== 1);

  const handleClickCreateNew = async () => {
    setIsLoading(true);
    if (hasUnfinalizedOTNotes) {
      toast.error(
        "You have unfinalized OT notes. Please finalize them before creating new ones."
      );
      router.push(`/dashboard/ot/${firstUnfinalizedNotes?.ot_id}`);
    } else {
      try {
        const response = await axios.post("/api/ot", {
          admission_id: admission.admission_id,
          registration_id: admission.registration_id,
        });
        if (response.status >= 200 && response.status < 300) {
          const newOT = response.data;
          console.log("New OT Notes created:", newOT);
          // Redirect to the newly created OT notes page
          router.push(`/dashboard/ot/${newOT.ot_id}`);
        }
      } catch (error) {
        console.error("Error creating new OT notes:", error);
        throw new Error("Failed to create new OT notes");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          size="1"
          variant="soft"
          color="teal"
          // disabled={isLoading}
          // onClick={handleClickCreateNew}
          // className="w-full"
        >
          {isLoading ? "Creating..." : "Create New OT Notes"}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Create New OT Notes</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to create new OT notes? Ensure all previous
          notes are finalized.
        </AlertDialog.Description>
        <Flex gap="2" mt="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleClickCreateNew}>
            <Button variant="soft" color="teal" disabled={isLoading}>
              {isLoading ? "Creating..." : "Confirm Create"}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ButtonCreateNewOTNotes;
