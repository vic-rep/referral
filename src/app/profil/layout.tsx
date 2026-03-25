"use client";

import { Typography, Icon } from "@vic-rep/design-system/atoms";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDEBAR_ITEMS = [
  { href: "/profil", label: "Начало", icon: "fa-house" },
  { href: "/profil/pokani-priyatel", label: "Покани приятел", icon: "fa-user-plus" },
  { href: "/profil/portfeyl", label: "Портфейл", icon: "fa-wallet" },
  { href: "/profil/tier-progress", label: "Нива", icon: "fa-layer-group" },
];

export default function ProfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: 260,
          padding: "var(--lg)",
          borderRight: "1px solid var(--neutral-200)",
          backgroundColor: "var(--surface)",
        }}
      >
        <div style={{ marginBottom: "var(--xl)" }}>
          <Typography variant="h5" bold>
            Trusti
          </Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--xs)" }}>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--sm)",
                  padding: "var(--sm) var(--md)",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  backgroundColor: isActive
                    ? "var(--accent-100)"
                    : "transparent",
                  color: "inherit",
                }}
              >
                <Icon name={item.icon} size="md" weight={isActive ? "solid" : "regular"} />
                <Typography
                  variant="text"
                  color={isActive ? "accent" : "primary"}
                  bold={isActive}
                >
                  {item.label}
                </Typography>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: "var(--xl)",
          backgroundColor: "var(--neutral-50)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
