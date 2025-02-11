import { Registration } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

const RegistrationDetailsCard = ({
  registration,
}: {
  registration: Registration;
}) => {
  return (
    <Card>
      <Flex gap={"1"}>
        <Text as="div" weight={"bold"} color="teal" size="4">
          {registration.first_name}
        </Text>
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
