"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  fieldData: object;
  id: string;
}

const ButtonSaveNotes = ({ fieldData, id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!id) {
      toast.error("Consultation ID is required");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Saving data:", fieldData);

      const response = await fetch(`/api/consultation/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldData),
        next: {
          tags: ["consultation", `consultation-${id}`, "consultaton-by-id"],
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save notes");
      }

      const result = await response.json();
      console.log("Save successful:", result);
      router.refresh(); // Refresh the page to reflect changes
      toast.success("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save notes"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="soft"
      color="red"
      onClick={handleSave}
      disabled={isLoading}
      className="max-w-[100px]"
    >
      {isLoading ? "Saving..." : "Save Notes"}
    </Button>
  );
};

export default ButtonSaveNotes;
