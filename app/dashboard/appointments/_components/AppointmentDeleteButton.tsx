"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const AppointmentDeleteButton = ({
  appointment_id,
}: {
  appointment_id: number;
}) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => axios.delete("/api/appointment/" + appointment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.refresh();
    },
    onError: (error) => {
      alert("Error deleting appointment");
      console.error(error);
    },
  });
  const deleteAppointment = async () => {
    deleteMutation.mutate();
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="soft">
          Delete Appointment
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Delete Appointment</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure? This record will be deleted permanently.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={deleteAppointment}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Appointment"}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default AppointmentDeleteButton;
