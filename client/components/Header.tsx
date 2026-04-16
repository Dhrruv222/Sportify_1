"use client";

import { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";
import { getProfile } from "@/lib/api";
import type { Profile } from "@/types";

export default function Header() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => {
        /* not logged in – keep null */
      });
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header
      className="sticky top-0 z-30 flex h-[var(--header-height)] items-center justify-between gap-4 px-8"
      style={{
        background:
          "linear-gradient(to bottom, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.78) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Greeting */}
      <h1 className="text-lg font-bold text-white whitespace-nowrap">
        {greeting()}
        {profile?.firstName ? `, ${profile.firstName}` : ""}
      </h1>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subdued)]" />
        <input
          type="text"
          placeholder="Search players, news, clubs…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 w-full rounded-full bg-[var(--bg-highlight)] pl-9 pr-4 text-sm text-white placeholder:text-[var(--text-subdued)] outline-none ring-1 ring-transparent focus:ring-[var(--accent)] transition-shadow"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-highlight)] hover:bg-[var(--bg-elevated)] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-[var(--text-secondary)]" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg-surface)]" />
        </button>

        {/* Avatar */}
        {profile?.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-[var(--bg-highlight)]"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-black">
            {profile ? (profile.firstName?.charAt(0) || "U").toUpperCase() : "S"}
          </div>
        )}
      </div>
    </header>
  );
}
