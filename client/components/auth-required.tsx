import Link from "next/link";

type Props = {
  title: string;
  message: string;
};

export function AuthRequired({ title, message }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <p className="text-sm text-slate-300">{message}</p>
        <Link href="/auth/login" className="text-sm font-medium text-sky-300 underline">
          Go to Login
        </Link>
      </main>
    </div>
  );
}
