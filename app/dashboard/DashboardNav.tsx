"use client";

import { Button, Flex, IconButton, Spinner, Text } from "@radix-ui/themes";
import {
  BedDouble,
  CalendarDays,
  Menu,
  Stethoscope,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = { name: string; href: string; icon: LucideIcon };

const links: NavLink[] = [
  { name: "Registration", href: "/dashboard/registration", icon: UsersRound },
  { name: "Appointments", href: "/dashboard/appointments", icon: CalendarDays },
  { name: "Admissions", href: "/dashboard/admissions", icon: BedDouble },
  // { name: "Consultations", href: "/dashboard/consultation", icon: ClipboardList },
  {
    name: "Todays Patients",
    href: "/dashboard/consultation/today",
    icon: Stethoscope,
  },
];

// Active on the section page itself and on its sub-pages
// (e.g. /dashboard/registration/123 highlights Registration).
const isActiveLink = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

// Spinner while this link's navigation is in flight (must render inside <Link>).
const PendingIndicator = () => {
  const { pending } = useLinkStatus();
  return pending ? <Spinner size="1" /> : null;
};

const DashboardNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu once navigation lands on a new page.
  useEffect(() => setOpen(false), [pathname]);

  const activeLink = links.find((link) => isActiveLink(pathname, link.href));

  return (
    <nav
      aria-label="Dashboard sections"
      // Sticky: stays at the top while the page scrolls. Solid theme
      // background (light/dark) so content doesn't show through; z-index
      // keeps it above tables and cards.
      className="sticky top-0 z-40 border-b shadow-sm mb-4 pt-2 pb-4 print:!hidden"
      style={{ background: "var(--color-background)" }}
    >
      {/* Mobile (below 768px): current section + menu toggle */}
      <Flex
        display={{ initial: "flex", sm: "none" }}
        justify="between"
        align="center"
        gap="2"
      >
        <Flex align="center" gap="2">
          {activeLink && <activeLink.icon size={18} aria-hidden />}
          <Text weight="medium">{activeLink?.name ?? "Dashboard"}</Text>
        </Flex>
        <IconButton
          variant="soft"
          size="2"
          aria-label={open ? "Close sections menu" : "Open sections menu"}
          aria-expanded={open}
          aria-controls="dashboard-nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </IconButton>
      </Flex>

      {/* Links: a vertical drop-down on mobile when open, a row on wider screens */}
      <Flex
        id="dashboard-nav-links"
        display={{ initial: open ? "flex" : "none", sm: "flex" }}
        direction={{ initial: "column", sm: "row" }}
        gap={{ initial: "2", sm: "3" }}
        mt={{ initial: "3", sm: "0" }}
        wrap="wrap"
      >
        {links.map((link) => {
          const active = isActiveLink(pathname, link.href);
          const Icon = link.icon;
          return (
            <Button
              key={link.href}
              asChild
              variant={active ? "surface" : "soft"}
              color={active ? "yellow" : "blue"}
              size={{ initial: "3", sm: "1" }}
              className="max-md:justify-start"
            >
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon size={16} aria-hidden />
                {link.name}
                <PendingIndicator />
              </Link>
            </Button>
          );
        })}
      </Flex>
    </nav>
  );
};

export default DashboardNav;
