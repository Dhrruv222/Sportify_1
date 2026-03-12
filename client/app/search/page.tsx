"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";
import { apiClient } from "../../lib/api-client";
import { useAuth } from "../../lib/auth-context";

type UserSummary = {
  id: string;
  email: string;
  role: string;
  profilePhoto?: string | null;
};

type SocialListResponse = {
  status: string;
  data: UserSummary[];
};

async function fetchFollowing(accessToken: string) {
  const response = await apiClient.get<SocialListResponse>("/api/v1/social/following", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

export default function SearchPage() {
  const { authState, isReady } = useAuth();
  const [query, setQuery] = useState("");

  const followingQuery = useQuery({
    queryKey: ["search-following", authState?.user.id],
    queryFn: () => fetchFollowing(authState!.accessToken),
    enabled: Boolean(authState?.accessToken),
  });

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    const items = followingQuery.data ?? [];
    if (!text) return items;
    return items.filter((user) => `${user.email} ${user.role}`.toLowerCase().includes(text));
  }, [followingQuery.data, query]);

  if (!isReady) {
    return <div className="p-6 text-sm text-zinc-600">Loading session...</div>;
  }

  if (!authState) {
    return (
      <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
        <main className="mx-auto flex w-full max-w-xl flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6">
          <h1 className="text-xl font-semibold text-zinc-900">Search</h1>
          <p className="text-sm text-zinc-600">Login is required to use search.</p>
          <Link href="/auth/login" className="text-sm font-medium text-zinc-900 underline">
            Go to Login
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">Search</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back
          </Link>
        </div>

        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Dedicated player search endpoint is not yet available. This page currently searches within your following list.
        </p>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by email or role"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500"
        />

        {followingQuery.isLoading && <p className="text-sm text-zinc-600">Loading...</p>}
        {followingQuery.isError && <p className="text-sm text-red-600">Could not load source data for search.</p>}

        {!followingQuery.isLoading && !followingQuery.isError && (
          <section className="space-y-2">
            {filtered.map((user) => (
              <article key={user.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-zinc-900">{user.email}</p>
                <p className="text-xs text-zinc-500">{user.role}</p>
              </article>
            ))}
            {!filtered.length && <p className="text-sm text-zinc-600">No results found.</p>}
          </section>
        )}
      </main>
    </div>
  );
}
