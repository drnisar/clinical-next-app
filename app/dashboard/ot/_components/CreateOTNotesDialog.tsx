"use client";
import { Admission_Discharge, OT } from "@/generated/prisma";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateOTNotesDialog = ({
  admission,
  otNotes,
}: {
  admission: Admission_Discharge;
  otNotes: OT[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const hasOTNotes = !isLoading && otNotes && otNotes.length > 0;
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
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1" variant="soft" color="grass">
          Create OT Notes
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Close className="absolute top-2 right-2">
          <Cross1Icon />
        </Dialog.Close>
        <Dialog.Title>Create OT Notes</Dialog.Title>
        <Flex direction="column" gap="4" mb="4">
          {hasOTNotes && (
            <div>
              <Heading size="2">Existing OT Notes</Heading>
              {otNotes.map((ot) => (
                <Flex key={ot.ot_id} justify="between" mb="2">
                  <Flex justify="between" gap="2">
                    <Text size="2" color="gray">
                      {ot.surgery_date?.toLocaleDateString()}
                    </Text>
                    <Text size="2" color="gray">
                      {ot.procedure_name || "Unnamed Procedure"}
                    </Text>
                  </Flex>
                  <Button
                    size="1"
                    variant="soft"
                    color="blue"
                    onClick={() => {
                      // Navigate to the OT notes details page
                      router.push(`/dashboard/ot/${ot.ot_id}`);
                    }}
                  >
                    {ot.finalize === 1 ? "View Details" : "Edit"}
                  </Button>
                </Flex>
              ))}
            </div>
          )}
          <Button
            size="1"
            variant="soft"
            color="teal"
            disabled={isLoading}
            onClick={handleClickCreateNew}
            className="w-full"
          >
            {isLoading ? "Creating..." : "Create New OT Notes"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateOTNotesDialog;
