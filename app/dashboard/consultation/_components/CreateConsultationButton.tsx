"use client";

import { Button } from "@radix-ui/themes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  registration_id: string;
}

const CreateConsultationButton = ({ registration_id }: Props) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const { data: todaysConsults } = useQuery({
    queryKey: ["todaysConsults"],
    queryFn: async () => {
      const response = await axios.get(
        "/api/consultation/today/" + registration_id
      );
      return response.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      setDisabled(true);
      const response = await axios.post(`/api/consultation`, {
        registration_id: registration_id,
        visit_date: new Date(),
      });
      return response.data;
    },
    onSuccess: (response) => {
      setDisabled(false);
      router.push(`/dashboard/consultation/edit/${response.consultation_id}`);
    },
    onError: (error) => {
      console.log("onError", error);
    },
  });
  const createConsult = async () => {
    if (todaysConsults) {
      if (todaysConsults.length > 0) {
        alert(
          "Consultation already created for today" +
            JSON.stringify(todaysConsults)
        );
      } else {
        addMutation.mutate();
      }
    } else {
      addMutation.mutate();
    }
  };
  return (
    <Button
      variant="soft"
      color="purple"
      onClick={createConsult}
      disabled={disabled}
    >
      Create Consultation
    </Button>
  );
};

export default CreateConsultationButton;
