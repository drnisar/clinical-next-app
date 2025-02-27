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
        onClick={() =>
          router.push("/dashboard/consultation/" + consultation_id)
        }
      >
        Print Preview
      </Button>
    </div>
  );
};

export default ButtonPrintPreview;
