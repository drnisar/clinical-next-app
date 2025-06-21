"use client";
import { Registration } from "@prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  registration: Registration;
}
const RegistrationDetailsCard = ({ registration }: Props) => {
  if (!registration) {
    return <div>Registration not found</div>;
  }
  return (
    <Flex
      justify={"between"}
      className=" p-5 border-b bg-green-50 dark:bg-transparent my-2"
    >
      <Flex gap={"5"}>
        <Link
          href={`/dashboard/registration/${registration.registration_id}`}
          className="font-bold"
        >
          {registration.first_name.toUpperCase()}{" "}
          {registration.last_name.toUpperCase()}
        </Link>
        <Text as="div" color="gray">
          {registration.gender.toUpperCase()}
        </Text>
        <Text as="div" color="gray">
          MR Number: {registration.mr_number}
        </Text>
      </Flex>
      <Text as="div" color="gray">
        {registration.code}
        {registration.phone_number}
      </Text>
    </Flex>
  );
};

export default RegistrationDetailsCard;
