"use client";
import { Button } from "@radix-ui/themes";
import React from "react";

const ButtonPrintPage = () => {
  return (
    <Button
      variant="soft"
      className="print:!hidden"
      color="blue"
      onClick={() => {
        window.print();
      }}
    >
      Print
    </Button>
  );
};

export default ButtonPrintPage;
