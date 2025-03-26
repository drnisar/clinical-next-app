"use client";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateRegistrationButton = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/dashboard/registration/new");
  }, [router]);

  return (
    <Flex justify="end">
      <Button onClick={() => router.push("/dashboard/registration/new")}>
        Create Registration
      </Button>
    </Flex>
  );
};

export default CreateRegistrationButton;
