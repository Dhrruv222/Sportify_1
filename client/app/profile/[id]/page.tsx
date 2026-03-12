"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiClient } from "../../../lib/api-client";
import { useAuth } from "../../../lib/auth-context";

type AccountResponse = {
  status?: string;
  data?: {
    id: string;
    email: string;
    role: string;
    profilePhoto?: string | null;
    coverPhoto?: string | null;
    createdAt?: string;
  };
};

async function fetchMyAccount(accessToken: string) {
  const response = await apiClient.get<AccountResponse>("/api/v1/users/account", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

export default function PublicProfilePage() {
  const params = useParams<{ id: string }>();
  const { authState, isReady } = useAuth();

  const isSelf = Boolean(authState?.user.id && params?.id === authState.user.id);

  const accountQuery = useQuery({
    queryKey: ["profile-id-self", authState?.user.id],
    queryFn: () => fetchMyAccount(authState!.accessToken),
    enabled: Boolean(authState?.accessToken && isSelf),
  });

  if (!isReady) {
    return <div className="p-6 text-sm text-zinc-600">Loading session...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">Profile Detail</h1>
          <Link href="/profile" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back
          </Link>
        </div>

        <p className="rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-700">
          Requested profile id: <span className="font-mono">{params?.id}</span>
        </p>

        {!isSelf && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Public profile-by-id endpoint is pending in backend. This route is ready and currently supports self id preview only.
          </p>
        )}

        {isSelf && (
          <section className="rounded-xl border border-zinc-200 bg-white p-4">
            {accountQuery.isLoading && <p className="text-sm text-zinc-600">Loading account...</p>}
            {accountQuery.isError && <p className="text-sm text-red-600">Could not load account.</p>}
            {!accountQuery.isLoading && !accountQuery.isError && (
              <pre className="overflow-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">
                {JSON.stringify(accountQuery.data ?? {}, null, 2)}
              </pre>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
