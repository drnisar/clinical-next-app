import { Toast } from "radix-ui";
import React from "react";

interface Props {
  title: string;
  description: string;
}

const ToastMessage = ({ title, description }: Props) => {
  return (
    <Toast.Provider duration={3000}>
      <Toast.Root>
        <Toast.Title>{title}</Toast.Title>
        <Toast.Description>{description}</Toast.Description>
        <Toast.Action altText="close">Close</Toast.Action>
        <Toast.Close />
      </Toast.Root>

      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default ToastMessage;
