import React from "react";
import Link from "next/link";

const SettingsPage = () => {
  const links = [
    { label: "Drugs Inventory", href: "/dashboard/settings/drugsInventory" },
    // Add other settings links if needed
  ];
  return (
    <>
      <h1>Settings</h1>
      <p>Manage your settings here.</p>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SettingsPage;
