import Link from "next/link";
import { ScoutShell } from "../../components/scout-shell";

export default function DashboardPage() {
  return (
    <ScoutShell title="Dashboard" subtitle="Track your profile, highlights, and scouting activity.">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Profile Views</p>
          <p className="mt-2 text-2xl font-semibold text-white">2,194</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Followers</p>
          <p className="mt-2 text-2xl font-semibold text-white">748</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Highlights</p>
          <p className="mt-2 text-2xl font-semibold text-white">24</p>
        </article>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="text-base font-semibold text-white">Quick Access</h2>
          <div className="mt-3 grid gap-2">
            <Link href="/profile" className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700">
              Edit Profile
            </Link>
            <Link href="/highlights" className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700">
              Manage Highlights
            </Link>
            <Link href="/feed" className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700">
              Open Video Feed
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="text-base font-semibold text-white">Account</h2>
          <p className="mt-2 text-sm text-slate-300">Sign in or create an account to sync your scouting data.</p>
          <div className="mt-3 flex gap-2">
            <Link href="/auth/login" className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-500">
              Log in
            </Link>
            <Link href="/auth/register" className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800">
              Create account
            </Link>
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <Link
          href="/news"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
        >
          <h2 className="text-lg font-medium text-white">News Feed</h2>
          <p className="mt-1 text-sm text-slate-400">
            Query and browse published articles from `/api/v1/news`.
          </p>
        </Link>

        <Link
          href="/messages"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
        >
          <h2 className="text-lg font-medium text-white">Messages</h2>
          <p className="mt-1 text-sm text-slate-400">
            Messaging MVP UI scaffold, ready for backend endpoint integration.
          </p>
        </Link>

        <Link
          href="/network"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
        >
          <h2 className="text-lg font-medium text-white">Following / Followers</h2>
          <p className="mt-1 text-sm text-slate-400">
            Follow/unfollow users and review followers/following lists.
          </p>
        </Link>

        <Link
          href="/search"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
        >
          <h2 className="text-lg font-medium text-white">Search</h2>
          <p className="mt-1 text-sm text-slate-400">
            Search surface wired to currently available social data.
          </p>
        </Link>

        <Link
          href="/admin"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
        >
          <h2 className="text-lg font-medium text-white">Admin</h2>
          <p className="mt-1 text-sm text-slate-400">
            Admin panel scaffold with role guard messaging.
          </p>
        </Link>
      </section>
    </ScoutShell>
  );
}