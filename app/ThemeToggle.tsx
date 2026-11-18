"use client";

import { IconButton } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** Light/dark mode switch, shared by the main NavBar and DashboardNav. */
const ThemeToggle = ({ size = "2" }: { size?: "1" | "2" }) => {
  const { theme, setTheme } = useTheme();
  // The theme is only known in the browser; render a placeholder until mounted
  // to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
    );
  }

  const isDarkMode = theme === "dark";
  const label = isDarkMode ? "Switch to light mode" : "Switch to dark mode";

  return (
    <IconButton
      variant="ghost"
      color="gray"
      size={size}
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      title={label}
      aria-label={label}
    >
      {isDarkMode ? (
        <SunIcon width="18" height="18" />
      ) : (
        <MoonIcon width="18" height="18" />
      )}
    </IconButton>
  );
};

export default ThemeToggle;
