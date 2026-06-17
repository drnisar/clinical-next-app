import { Button, Dialog } from "@radix-ui/themes";
import React from "react";

interface Props {
  triggerButtonText: string;
  triggerButtonSize?: "small" | "medium" | "large";
  triggerButtonVariant?: React.ComponentProps<typeof Button>["variant"];
  triggerButtonColor?:
    | "ruby"
    | "gray"
    | "gold"
    | "bronze"
    | "brown"
    | "yellow"
    | "amber"
    | "orange"
    | "tomato"
    | "red"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "lime"
    | "mint"
    | "sky"
    | undefined;
  titleText: string;
  content: React.ReactNode;
}

const DialogComponent = ({
  triggerButtonText,
  triggerButtonVariant,
  triggerButtonColor,
  titleText,
  content,
}: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant={triggerButtonVariant} color={triggerButtonColor}>
          {triggerButtonText}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{titleText}</Dialog.Title>
        {content}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogComponent;
