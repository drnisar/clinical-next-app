import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

interface Props {
  onClick: () => void;
}

const ButtonRemoveFromFieldsArray = ({ onClick }: Props) => {
  return (
    <Cross2Icon
      onClick={onClick}
      className="w-5 h-5 font-bold text-red-500 bg-none align-middle items-center cursor-pointer"
    />
  );
};

export default ButtonRemoveFromFieldsArray;
