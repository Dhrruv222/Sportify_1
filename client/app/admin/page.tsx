"use client";

import Link from "next/link";
import { useAuth } from "../../lib/auth-context";

export default function AdminPage() {
  const { authState, isReady } = useAuth();

  if (!isReady) {
    return <div className="p-6 text-sm text-zinc-600">Loading session...</div>;
  }

  if (!authState) {
    return (
      <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
        <main className="mx-auto flex w-full max-w-xl flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6">
          <h1 className="text-xl font-semibold text-zinc-900">Admin</h1>
          <p className="text-sm text-zinc-600">Login is required to access admin views.</p>
          <Link href="/auth/login" className="text-sm font-medium text-zinc-900 underline">
            Go to Login
          </Link>
        </main>
      </div>
    );
  }

  const hasAdminRole = authState.user.role === "ADMIN";

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">Admin Panel</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back
          </Link>
        </div>

        {!hasAdminRole && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            Your current role is {authState.user.role}. This page is restricted to ADMIN role users.
          </p>
        )}

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-zinc-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-zinc-800">User Verification</h2>
            <p className="mt-1 text-sm text-zinc-600">UI scaffold ready for verification toggles.</p>
          </article>

          <article className="rounded-xl border border-zinc-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-zinc-800">Feed Moderation</h2>
            <p className="mt-1 text-sm text-zinc-600">UI scaffold ready for moderation queue listing.</p>
          </article>
        </section>
      </main>
    </div>
  );
}
