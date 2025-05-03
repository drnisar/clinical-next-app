"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react"; // Import useState, useEffect
import { Flex, Text, Button, IconButton, Skeleton } from "@radix-ui/themes"; // Import IconButton
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes"; // Import useTheme
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"; // Import icons

const NavBar = () => {
  const currentPath = usePathname();
  const { theme, setTheme } = useTheme();
  // State to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    // Add other main navigation links if needed
  ];

  // Render placeholder or null until mounted to avoid hydration errors
  const renderThemeToggle = () => {
    if (!mounted) {
      // Render a simple placeholder matching IconButton size
      return (
        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      );
    }

    const isDarkMode = theme === "dark";

    return (
      <IconButton
        variant="ghost"
        color="gray"
        onClick={() => setTheme(isDarkMode ? "light" : "dark")}
        title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <SunIcon width="18" height="18" />
        ) : (
          <MoonIcon width="18" height="18" />
        )}
      </IconButton>
    );
  };

  return (
    <nav className="border-b mb-5 px-5 py-3">
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
          {renderThemeToggle()}

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
      <Link className="nav-link" href="/api/auth/signin">
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
