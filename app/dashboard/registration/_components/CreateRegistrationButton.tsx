"use client";
import { Button } from "@radix-ui/themes";
import React from "react";
import { useRouter } from "next/navigation";

const CreateRegistrationButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/dashboard/registration/new")}>
      Create Registration
    </Button>
  );
};

export default CreateRegistrationButton;
