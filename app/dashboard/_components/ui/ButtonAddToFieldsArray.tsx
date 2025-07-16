import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  onClick: (value: object) => void;
  buttonText?: string;
}

const ButtonAddToFieldsArray = ({ onClick, buttonText }: Props) => {
  return (
    <Button type="button" variant="ghost" color="green" onClick={onClick}>
      <PlusIcon /> {buttonText || "Add Item"}
    </Button>
  );
};

export default ButtonAddToFieldsArray;
