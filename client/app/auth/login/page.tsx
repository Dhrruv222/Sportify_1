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
      router.push("/dashboard");
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <main className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-[1280px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 md:grid-cols-2 md:min-h-[calc(100vh-4rem)]">
        <section
          className="relative hidden md:flex"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(2, 6, 23, 0.65), rgba(2, 6, 23, 0.9)), url('https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-auto p-10">
            <p className="max-w-md text-3xl font-semibold leading-tight text-white">
              Champions aren&apos;t made in gyms. Champions are made from something deep inside them.
            </p>
            <p className="mt-3 text-sm text-slate-300">— Muhammad Ali</p>
          </div>
        </section>

        <section className="flex items-center justify-center bg-[#030d24] px-6 py-10 md:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-400">ScoutMarket</p>
              <h1 className="mt-2 text-4xl font-semibold text-white">Login</h1>
              <p className="mt-2 text-base text-slate-400">Enter your credentials to access your dashboard</p>
            </div>

            <form className="space-y-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500"
                  placeholder="email@example.com"
                  aria-label="Email address"
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-xs text-red-500">{form.formState.errors.email.message}</p>
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
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500"
                  placeholder="Password"
                  aria-label="Password"
                />
                {form.formState.errors.password && (
                  <p className="mt-1 text-xs text-red-500">{form.formState.errors.password.message}</p>
                )}
              </div>

              {mutation.isError && (
                <div className="rounded-xl border border-rose-900/40 bg-rose-900/20 p-3 text-sm text-rose-300">
                  Login failed. Check credentials and try again.
                </div>
              )}

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {mutation.isPending ? "Signing in..." : "Login"}
              </button>

              <p className="text-center text-sm text-slate-400">
                Need an account?{" "}
                <Link href="/auth/register" className="font-medium text-slate-100 underline">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
