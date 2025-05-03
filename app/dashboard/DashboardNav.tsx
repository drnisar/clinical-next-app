"use client";

import { Button, Flex } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";

const DashboardNav = () => {
  const currentPath = usePathname();

  const links = [
    { name: "Registration", href: "/dashboard/registration" },
    { name: "Appointments", href: "/dashboard/appointments" },
    { name: "Admissions", href: "/dashboard/admissions" },
    { name: "Consultations", href: "/dashboard/consultation" },
  ];

  const router = useRouter();

  return (
    <Flex gap="4" className="border-b shadow-sm mb-4 pb-4 print:!hidden">
      {links.map((link) => {
        const isActive = currentPath.startsWith(link.href);

        return (
          <Button
            variant={isActive ? "surface" : "soft"}
            color={isActive ? "yellow" : "blue"}
            size="1"
            title="bookmark"
            key={link.name}
            onClick={() => router.push(link.href)}
          >
            {link.name}
          </Button>
        );
      })}
    </Flex>
  );
};

export default DashboardNav;
