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
    <Flex justify={"between"} className=" py-5 border-b">
      <Flex gap={"5"}>
        <Link
          color="teal"
          href={`/dashboard/registration/${registration.registration_id}`}
          className="font-bold text-gray-700"
        >
          {registration.first_name} {registration.last_name}
        </Link>
        <Text as="div" color="gray">
          {registration.gender.toUpperCase()}
        </Text>
        <Text as="div" color="gray">
          MR Number: {registration.mr_number}
        </Text>
      </Flex>
      <Text as="div" color="gray">
        {registration.phone_number}
      </Text>
    </Flex>
  );
};

export default RegistrationDetailsCard;
