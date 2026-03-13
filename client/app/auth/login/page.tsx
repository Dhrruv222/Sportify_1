"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiClient } from "../../../lib/api-client";
import { useAuth } from "../../../lib/auth-context";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

type LoginResponse = {
  status: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
};

async function loginRequest(payload: LoginValues): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/api/v1/auth/login", payload);
  return response.data;
}

export default function LoginPage() {
  const router = useRouter();
  const { setAuthState } = useAuth();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      setAuthState({
        accessToken: response.data.accessToken,
        user: response.data.user,
      });
      router.push("/");
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <main className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium text-slate-400">ScoutMarket</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-400">Log in to continue to your scouting dashboard.</p>
        </div>

        <form className="space-y-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register("email")}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
              aria-label="Email address"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...form.register("password")}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
              aria-label="Password"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.password.message}</p>
            )}
          </div>

          {mutation.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              Login failed. Check credentials and try again.
            </div>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Need an account?{" "}
            <Link href="/auth/register" className="font-medium text-slate-100 underline">
              Create one
            </Link>
          </p>
        </form>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-300">
            Back to dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
