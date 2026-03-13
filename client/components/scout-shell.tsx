"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useAuth } from "../lib/auth-context";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  rightSlot?: ReactNode;
};

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Messages", href: "/messages" },
  { label: "Following", href: "/network" },
  { label: "Followers", href: "/network" },
  { label: "My Highlights", href: "/highlights" },
  { label: "Edit Profile", href: "/profile" },
  { label: "Video Feed", href: "/feed" },
];

export function ScoutShell({ title, subtitle, children, rightSlot }: Props) {
  const pathname = usePathname();
  const { authState } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-[1440px]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-800 bg-slate-950 px-5 py-6 lg:flex lg:flex-col">
          <div>
            <p className="text-xl font-semibold text-white">ScoutMarket</p>
            <p className="text-sm text-slate-400">Player Scouting</p>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">Platform</p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                      active
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
            <p className="truncate text-sm font-medium text-white">
              {authState?.user.email ?? "Guest User"}
            </p>
            <p className="text-xs text-slate-400">{authState?.user.role ?? "Unauthenticated"}</p>
          </div>
        </aside>

        <div className="w-full p-4 md:p-8">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-2xl font-semibold text-white md:text-3xl">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
            </div>
            {rightSlot}
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
