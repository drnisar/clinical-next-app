"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Flex, Text, Button, Skeleton } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const currentPath = usePathname();

  // Inside the dashboard, DashboardNav takes over (with a Home link back here).
  // Placed after all hooks so hook order stays stable.
  if (currentPath === "/dashboard" || currentPath?.startsWith("/dashboard/")) {
    return null;
  }

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings", href: "/dashboard/settings" },
    // Add other main navigation links if needed
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3 print:!hidden">
      <Flex justify="between" align="center">
        <Flex align="center" gap="3">
          <Link href="/">
            <Text>Logo</Text> {/* Replace with your actual logo */}
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={classnames({
                    "nav-link": true, // Add a common class for styling if needed
                    "text-zinc-900 dark:text-zinc-100 font-semibold":
                      link.href === currentPath,
                    "text-zinc-500 dark:text-zinc-400":
                      link.href !== currentPath,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>

        <Flex align="center" gap="4">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Auth Status */}
          <AuthStatus />
        </Flex>
      </Flex>
    </nav>
  );
};

// Separate component for AuthStatus for clarity
const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />; // Use your Skeleton component

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/auth/signin">
        Login
      </Link>
    );

  return (
    <Flex align="center" gap="2">
      <Text size="2">{session!.user!.name}</Text>
      <Link href="/api/auth/signout">
        <Button variant="soft" color="gray" size="1">
          Log Out
        </Button>
      </Link>
    </Flex>
  );
};

export default NavBar;
