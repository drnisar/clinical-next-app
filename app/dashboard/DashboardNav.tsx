import { Flex } from "@radix-ui/themes";
import Link from "next/link";

const DashboardNav = () => {
  const links = [
    { name: "Registration", href: "/dashboard/registration" },
    { name: "Appointments", href: "/dashboard/appointments" },
    { name: "Admissions", href: "/dashboard/admissions" },
  ];
  return (
    <Flex gap="4" className="border-b shadow-sm mb-4 pb-4 print:!hidden">
      {links.map((link) => (
        <Link href={link.href} key={link.name} prefetch={true}>
          {link.name}
        </Link>
      ))}
    </Flex>
  );
};

export default DashboardNav;
