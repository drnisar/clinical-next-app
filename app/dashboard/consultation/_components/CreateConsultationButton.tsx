"use client";

import { Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  registration_id: string;
}

const CreateConsultationButton = ({ registration_id }: Props) => {
  const router = useRouter();

  const addMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/api/consultation`, {
        registration_id: parseInt(registration_id),
        visit_date: new Date(),
      });
      return response.data;
    },
    onSuccess: (response) => {
      router.push(`/dashboard/consultation/edit/${response.visit_id}`);
    },
    onError: (error) => {
      console.log("onError", error);
    },
  });
  const createConsult = async () => {
    addMutation.mutate();
  };
  return (
    <Button
      variant="ghost"
      color="teal"
      onClick={createConsult}
      disabled={addMutation.isPending}
    >
      Create Consultation
    </Button>
  );
};

export default CreateConsultationButton;
