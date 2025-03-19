"use client";
import { Button, TextArea } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const HistoryForm = () => {
  const [history, setHistory] = useState("");
  const mutation = useMutation({
    mutationFn: async (data: string) => await console.log(data),
  });
  const handleSaveHistory = () => {
    mutation.mutate(history);
  };
  return (
    <label>
      <span>History</span>
      <TextArea onBlur={(e) => setHistory(e.target.value)} />
      <Button onClick={handleSaveHistory}>Save</Button>
    </label>
  );
};

export default HistoryForm;
