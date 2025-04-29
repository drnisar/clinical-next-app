"use client";
import { Button, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  // { href: "/dashboard", label: "Dashboard" },
];

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  return (
    <Flex
      direction={"row"}
      gap={"6"}
      className="border-b p-4 shadow-md print:!hidden"
      justify={"between"}
    >
      <Flex gap="6">
        <Link href={"/"}>Logo</Link>
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
        {status === "authenticated" && <Link href="/dashboard">DashBoard</Link>}
      </Flex>
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">
          <Button size="1" color="blue" variant="soft">
            Login
          </Button>
        </Link>
      )}
      {status === "authenticated" && (
        <div>
          {session.user!.name}{" "}
          <Link className="ml-3" href="/api/auth/signout">
            Logout
          </Link>
        </div>
      )}
    </Flex>
  );
};

export default NavBar;
