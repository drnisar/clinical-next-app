"use client";
import { Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

const RegistrationDetailsCard = ({
  registration_id,
}: {
  registration_id: string;
}) => {
  const {
    data: registration,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["registration", registration_id],
    queryFn: async () => {
      const response = await axios.get(
        `/api/registration/${registration_id}?registration_id=${registration_id}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!registration) {
    return <div>Registration not found</div>;
  }
  return (
    <Flex justify={"between"} className=" py-5 border-b">
      <Flex gap={"5"}>
        <Link
          color="teal"
          href={`/dashboard/registration/${registration_id}`}
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
