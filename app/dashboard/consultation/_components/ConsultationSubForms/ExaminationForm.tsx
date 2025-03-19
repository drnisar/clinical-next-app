"use client";
import { TextArea } from "@radix-ui/themes";
import React from "react";

const ExaminationForm = () => {
  return (
    <form>
      <label>
        <span>Examination</span>
        <TextArea onBlur={(e) => console.log("saving", e.target.value)} />
      </label>
    </form>
  );
};

export default ExaminationForm;
