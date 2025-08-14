"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const GenericNameInputForm = () => {
  const [genericName, setGenericName] = useState("");
  const router = useRouter();

  const submitData = async (data: { generic_name: string }) => {
    try {
      const response = await axios.post("/api/drugs", data);

      if (!response) {
        throw new Error("Failed to submit data");
      }

      router.refresh();
      toast.success("Generic name added successfully!");
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Generic Name"
          value={genericName}
          onChange={(e) => setGenericName(e.target.value.toLowerCase().trim())}
        />
        <button type="submit">Add Drug</button>
      </form>
    </>
  );
};

export default GenericNameInputForm;
