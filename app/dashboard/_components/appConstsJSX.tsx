import { Box } from "@radix-ui/themes";

type Instruction = {
  instruction: string;
};

export function renderInstructions(
  instructions: Instruction[] | string | { instruction: string } | null
) {
  if (!instructions) return null;

  // If it's a string, display as-is
  if (typeof instructions === "string") {
    return (
      <span style={{ fontSize: "1rem", whiteSpace: "pre-line" }}>
        {instructions}
      </span>
    );
  }

  // If it's an array, render each instruction
  if (Array.isArray(instructions)) {
    return (
      <Box>
        {instructions.map((item: Instruction, index: number) => (
          <p
            key={index}
            style={{
              fontSize: "1rem",
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <span style={{ marginRight: "8px", color: "#059669" }}>•</span>
            <span>{typeof item === "string" ? item : item.instruction}</span>
          </p>
        ))}
      </Box>
    );
  }

  // If it's an object with instruction property
  if (typeof instructions === "object" && instructions.instruction) {
    return (
      <span style={{ fontSize: "1rem", whiteSpace: "pre-line" }}>
        {instructions.instruction}
      </span>
    );
  }

  return null;
}
