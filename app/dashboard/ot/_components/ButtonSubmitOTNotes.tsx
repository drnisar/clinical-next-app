"use client";
import { Button } from "@radix-ui/themes";
import React from "react";

interface ButtonSubmitOTNotesProps {
  data: object;
}

const ButtonSubmitOTNotes = ({ data }: ButtonSubmitOTNotesProps) => {
  const handleSubmit = () => {
    alert(data);
  };
  return <Button onClick={handleSubmit}>Submit</Button>;
};

export default ButtonSubmitOTNotes;
