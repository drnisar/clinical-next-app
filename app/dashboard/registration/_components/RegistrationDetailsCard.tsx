"use client";
import { Registration } from "@/generated/prisma";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { calculateAge } from "../../_components/appConstants";

interface Props {
  registration: Registration;
}

// Patient header used across the dashboard (registration, consultation,
// admission, OT, discharge, HMIS pages) and on printouts.
// Phones (below 768px): name on top, details wrapping underneath, phone and
// HMIS link on their own line. Wider screens and print: one row, as before.
const RegistrationDetailsCard = ({ registration }: Props) => {
  if (!registration) {
    return <div>Registration not found</div>;
  }

  const age = calculateAge(registration.date_of_birth?.toString() ?? "");
  // Only when there is a number (not just the country code).
  const phone = registration.phone_number
    ? `${registration.code ?? ""}${registration.phone_number}`
    : "";

  return (
    <Flex
      direction={{ initial: "column", sm: "row" }}
      justify="between"
      gap={{ initial: "2", sm: "5" }}
      p={{ initial: "3", sm: "5" }}
      my="2"
      className="border-b bg-green-50 dark:bg-transparent print:!flex-row print:!p-5"
    >
      <Flex
        direction={{ initial: "column", sm: "row" }}
        gap={{ initial: "1", sm: "5" }}
        className="print:!flex-row print:!gap-5"
      >
        <Link
          href={`/dashboard/registration/${registration.registration_id}`}
          className="font-bold"
          style={{ wordBreak: "break-word" }}
        >
          {registration.first_name.toUpperCase()}{" "}
          {registration.last_name.toUpperCase()}
        </Link>
        <Flex gap={{ initial: "3", sm: "5" }} wrap="wrap">
          {age && (
            <Text as="div" color="gray">
              {age} Years
            </Text>
          )}
          <Text as="div" color="gray">
            {registration.gender.toUpperCase()}
          </Text>
        </Flex>
      </Flex>

      <Flex gap={{ initial: "3", sm: "5" }} wrap="wrap" align="center">
        <Text as="div" color="gray">
          MR Number: {registration.mr_number}
        </Text>
        {phone && (
          <Text as="div" color="gray" className="print:!hidden">
            <a href={`tel:${phone}`}>{phone}</a>
          </Text>
        )}
        <Link
          href={`/dashboard/hmis?mrn=${registration.mr_number}`}
          className="print:!hidden"
        >
          HMIS
        </Link>
      </Flex>
    </Flex>
  );
};

export default RegistrationDetailsCard;
