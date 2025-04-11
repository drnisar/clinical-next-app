"use client";
import { Button } from "@radix-ui/themes";
import React from "react";

const ButtonPrintPage = ({ disabled }: { disabled: boolean }) => {
  return (
    <Button
      variant="soft"
      className="print:!hidden"
      color="blue"
      onClick={() => {
        window.print();
      }}
      disabled={disabled}
    >
      Print
    </Button>
  );
};

export default ButtonPrintPage;
