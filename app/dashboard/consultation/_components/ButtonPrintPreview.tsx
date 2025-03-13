"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonPrintPreview = ({
  consultation_id,
}: {
  consultation_id: string;
}) => {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="soft"
        color="jade"
        onClick={() =>
          router.push("/dashboard/consultation/" + consultation_id)
        }
      >
        Preview Consultation Report
      </Button>
    </div>
  );
};

export default ButtonPrintPreview;
