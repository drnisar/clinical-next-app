"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  fieldData: object;
  id: string;
  slug: string;
  className?: string;
}

const ButtonSaveNotes = ({ fieldData, id, slug, className }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const handleSave = async () => {
  //   if (!id) {
  //     toast.error("Consultation ID is required");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     console.log("Saving data:", fieldData);

  //     const response = await fetch(`${slug}/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(fieldData),
  //       next: {
  //         tags: ["consultation", `consultation-${id}`, "consultaton-by-id"],
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to save notes");
  //     }

  //     const result = await response.json();
  //     console.log("Save successful:", result);
  //     router.refresh(); // Refresh the page to reflect changes
  //     toast.success("Notes saved successfully!");
  //   } catch (error) {
  //     console.error("Error saving notes:", error);
  //     toast.error(
  //       error instanceof Error ? error.message : "Failed to save notes"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSave = async () => {
    if (!id) {
      toast.error("ID is required");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Saving data:", fieldData);

      const response = await fetch(`${slug}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Handle different error types
        if (response.status === 404) {
          throw new Error("Record not found");
        } else if (response.status === 400) {
          throw new Error(responseData.message || "Invalid data provided");
        } else if (response.status === 500) {
          throw new Error(responseData.message || "Server error occurred");
        } else {
          throw new Error(responseData.message || `Error: ${response.status}`);
        }
      }

      console.log("Save successful:", responseData);
      router.refresh();
      toast.success(responseData.message || "Data saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);

      // Enhanced error message handling
      let errorMessage = "Failed to save data";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
      }

      toast.error(errorMessage);
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
      className={className}
    >
      {isLoading ? "Saving..." : "Save Notes"}
    </Button>
  );
};

export default ButtonSaveNotes;
