import React from "react";
import { Heading, Text } from "@radix-ui/themes";
import { Instruction } from "@/generated/prisma";

interface Props {
  instructions: Instruction[];
}

const InstructionsDisplayEnglish = ({ instructions }: Props) => {
  return (
    <>
      {instructions.length > 0 && (
        <div>
          <Heading size="2">Instructions</Heading>
          {instructions.map((instruction) => (
            <Text
              as="p"
              key={instruction.instruction}
              size="2"
              className="pl-4"
            >
              {instruction.instruction}
            </Text>
          ))}
        </div>
      )}
    </>
  );
};

export default InstructionsDisplayEnglish;
