"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Search,
  MessageCircle,
  User,
  Building2,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search Players", icon: Search },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/dashboard/club", label: "Company", icon: Building2 },
  { href: "/fitpass", label: "FIT-Pass", icon: Zap },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[var(--sidebar-width)] flex-col bg-[var(--bg-base)] border-r border-[var(--border)]">
      {/* Logo */}
      <div className="flex h-[var(--header-height)] items-center gap-2 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]">
          <Zap className="h-4 w-4 text-black" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Sportify
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium
                transition-colors duration-150
                ${
                  isActive
                    ? "bg-[var(--bg-highlight)] text-white"
                    : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-elevated)]"
                }
              `}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-[var(--accent)]" />
              )}
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom user section */}
      <div className="border-t border-[var(--border)] p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[var(--bg-highlight)] flex items-center justify-center">
            <User className="h-4 w-4 text-[var(--text-secondary)]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white">Player</span>
            <span className="text-[11px] text-[var(--text-subdued)]">
              Free Plan
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
