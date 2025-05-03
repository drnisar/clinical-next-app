"use client";

import { Button } from "@radix-ui/themes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  registration_id: number;
}

const AddToClinicQueueButton = ({ registration_id }: Props) => {
  const router = useRouter();

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
      const response = await axios.post(`/api/consultation`, {
        registration_id: registration_id,
        visit_date: new Date(),
        status: "QUEUED",
      });
      return response.data;
    },
    onSuccess: () => {
      router.push(`/dashboard/consultation`);
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
      size="1"
      onClick={createConsult}
      disabled={addMutation.isPending}
    >
      Add to Clinic Queue
    </Button>
  );
};

export default AddToClinicQueueButton;
