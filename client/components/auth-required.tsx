import Link from "next/link";

type Props = {
  title: string;
  message: string;
};

export function AuthRequired({ title, message }: Props) {
  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-xl flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-zinc-900">{title}</h1>
        <p className="text-sm text-zinc-600">{message}</p>
        <Link href="/auth/login" className="text-sm font-medium text-zinc-900 underline">
          Go to Login
        </Link>
      </main>
    </div>
  );
}
