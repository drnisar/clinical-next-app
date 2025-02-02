import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const DashboardNav = () => {
  const links = [
    { name: "Registration", href: "/dashboard/registration" },
    { name: "Appointments", href: "/dashboard/appointments" },
  ];
  return (
    <Flex gap="4" className="border-b shadow-sm mb-4 pb-4">
      {links.map((link) => (
        <Link href={link.href} key={link.name}>
          {link.name}
        </Link>
      ))}
    </Flex>
  );
};

export default DashboardNav;
