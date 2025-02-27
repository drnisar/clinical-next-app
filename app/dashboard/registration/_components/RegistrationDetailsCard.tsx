"use client";
import { Card, Flex, Text } from "@radix-ui/themes";
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
        `/api/registration/${registration_id}?registrtion_id=${registration_id}`
      );
      return response.data;
    },
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
    <Card>
      <Flex gap={"1"}>
        <Link color="teal" href={`/dashboard/registration/${registration_id}`}>
          {registration.first_name}
        </Link>
        <Text as="div" weight={"bold"} color="teal" size="4">
          {registration.last_name}
        </Text>
      </Flex>
      <Text as="div" color="gray">
        {registration.phone_number}
      </Text>
    </Card>
  );
};

export default RegistrationDetailsCard;
