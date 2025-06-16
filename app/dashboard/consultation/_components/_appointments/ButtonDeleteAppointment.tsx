"use client";
import { Button, Flex, AlertDialog } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const ButtonDeleteAppointment = ({
  consultation_id,
}: {
  consultation_id: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete("/api/appointment/consultation_id/" + id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
      queryClient.resetQueries({ queryKey: ["appointment"] });
    },
    onError: () => {
      console.log("Error deleting appointment");
    },
  });

  const deleteAppointment = () => {
    mutation.mutate(consultation_id);
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="soft">
          Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "450px" }}>
        <AlertDialog.Title>Confirm Delete Appointment</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure to delete the appointment?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={deleteAppointment}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ButtonDeleteAppointment;
