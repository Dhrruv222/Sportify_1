import Link from "next/link";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

export default async function InvitePage({ params }: Props) {
  const { token } = await params;

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900">Invite Token</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back
          </Link>
        </div>

        <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
          Token received: <span className="font-mono">{token}</span>
        </p>

        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Invite redemption backend endpoint is pending. Keep this page as the final UX target for `/auth/invite/[token]`.
        </p>
      </main>
    </div>
  );
}
