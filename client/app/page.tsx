import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-zinc-900">Sportify Frontend</h1>
          <p className="text-sm text-zinc-600">
            MVP integration surface for FitPass, news, and company flows.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Link
            href="/auth/login"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">Authentication</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Login flow for protected API modules.
            </p>
          </Link>

          <Link
            href="/auth/register"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">Registration</h2>
            <p className="mt-1 text-sm text-zinc-600">
              7-role signup with GDPR consent validation.
            </p>
          </Link>

          <Link
            href="/fitpass"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">FitPass Dashboard</h2>
            <p className="mt-1 text-sm text-zinc-600">
              View active plans from `/api/v1/fitpass/plans`.
            </p>
          </Link>

          <Link
            href="/fitpass/bookings"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">FitPass Bookings</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Booking calendar MVP scaffold.
            </p>
          </Link>

          <Link
            href="/fitpass/partners"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">FitPass Partners</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Partner discovery UI scaffold.
            </p>
          </Link>

          <Link
            href="/news"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">News Feed</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Query and browse published articles from `/api/v1/news`.
            </p>
          </Link>

          <Link
            href="/feed"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">Social Feed</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Browse discover/following streams from `/api/v1/social/feed`.
            </p>
          </Link>

          <Link
            href="/profile"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">My Profile</h2>
            <p className="mt-1 text-sm text-zinc-600">
              View and update role-based profile data via `/api/v1/profile/*`.
            </p>
          </Link>

          <Link
            href="/network"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">Network</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Follow/unfollow users and review followers/following lists.
            </p>
          </Link>

          <Link
            href="/messages"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">Messages</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Messaging MVP UI scaffold, ready for backend endpoint integration.
            </p>
          </Link>

          <Link
            href="/company"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">Company Portal</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Manage employees via `/api/v1/company/employees`.
            </p>
          </Link>

          <Link
            href="/search"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">Search</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Search surface wired to currently available social data.
            </p>
          </Link>

          <Link
            href="/admin"
            className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
          >
            <h2 className="text-lg font-medium text-zinc-900">Admin</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Admin panel scaffold with role guard messaging.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
