"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDrugsInventoryStore } from "./DrugsInventoryStore";
import { Button, TextField } from "@radix-ui/themes";

const GenericNameInputForm = () => {
  const [genericName, setGenericName] = useState("");
  const router = useRouter();
  const { setDrug, setSearchString, addDrugButtonVisible } =
    useDrugsInventoryStore();

  const submitData = async (data: { generic_name: string }) => {
    try {
      const response = await axios.post("/api/drugs", data);

      if (!response) {
        throw new Error("Failed to submit data");
      }

      router.refresh();
      toast.success("Generic name added successfully!");
      setDrug(response.data); // Update the store with the new drug
      setSearchString(""); // Clear the search string
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitData({ generic_name: genericName });
    setGenericName(""); // Clear the input field after submission
  };
  return (
    <>
      <div className="flex flex-col  gap-4">
        <form onSubmit={handleSubmit}>
          <TextField.Root
            type="text"
            placeholder="Generic Name"
            value={genericName}
            onChange={(e) => {
              setGenericName(e.target.value.toLowerCase().trim());
              setSearchString(e.target.value);
            }}
          />
          {addDrugButtonVisible && <Button type="submit">Add Drug</Button>}
        </form>
      </div>
    </>
  );
};

export default GenericNameInputForm;
