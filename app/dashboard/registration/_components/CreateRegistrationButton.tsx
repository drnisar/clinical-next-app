"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

const CreateRegistrationButton = () => {
  return (
    <Flex justify="end">
      <Link
        href="/dashboard/registration/new"
        prefetch
        className="btn btn-primary items-end"
      >
        <Button size="2" color="gray" variant="soft">
          Create New Registration
        </Button>
      </Link>
    </Flex>
  );
};

export default CreateRegistrationButton;
