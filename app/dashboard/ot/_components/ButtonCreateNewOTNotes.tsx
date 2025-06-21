"use client";

import { Button } from "@radix-ui/themes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ButtonCreateNewOTNotes = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: admission } = useQuery({
    queryKey: ["admission"],
    queryFn: async () => {
      const response = await axios.get(`/api/admission/${id}`);
      return response.data;
    },
  });

  console.log("Admission Data:", admission);
  const addMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/ot", {
        admission_id: id,
        registration_id: admission.registration_id,
      });
      return response.data;
    },
    onSuccess: (response) => {
      console.log("OT Notes created successfully:", response);
      // Optionally, you can redirect or show a success message here
      router.push(`/dashboard/ot/${response.ot_id}`);
    },
  });

  const handleClick = () => {
    addMutation.mutate();
  };
  return (
    <Button onClick={handleClick} variant="soft" size="1" color="green">
      Create New OT Notes
    </Button>
  );
};

export default ButtonCreateNewOTNotes;
