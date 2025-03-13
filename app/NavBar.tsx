"use client";
import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

const NavBar = () => {
  const pathname = usePathname();
  return (
    <Flex
      direction={"row"}
      gap={"6"}
      className="border-b p-4 shadow-md print:!hidden"
    >
      <Link href={"/"}>Logo</Link>
      <Flex gap="6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={classNames("text-zinc-400", {
              "text-zinc-900": pathname === link.href,
            })}
          >
            {link.label}
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default NavBar;
