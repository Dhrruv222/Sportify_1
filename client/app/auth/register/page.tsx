"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiClient } from "../../../lib/api-client";
import { useAuth } from "../../../lib/auth-context";

const roles = ["PLAYER", "CLUB", "AGENT", "SCOUT", "COACH", "FAN", "COMPANY"] as const;

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, "Password must include one uppercase letter and one number"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
  role: z.enum(roles),
  gdprConsent: z.literal(true, {
    error: "You must explicitly accept GDPR consent",
  }),
}).refine((values) => values.password === values.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type RegisterValues = z.infer<typeof registerSchema>;

type RegisterResponse = {
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

async function registerRequest(payload: RegisterValues): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>("/api/v1/auth/register", {
    email: payload.email,
    password: payload.password,
    role: payload.role,
    gdprConsent: payload.gdprConsent,
  });
  return response.data;
}

export default function RegisterPage() {
  const { setAuthState } = useAuth();
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "FAN",
      gdprConsent: true,
    },
  });

  const mutation = useMutation({
    mutationFn: registerRequest,
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
          <h1 className="mt-2 text-3xl font-semibold text-white">Create an account</h1>
          <p className="mt-1 text-sm text-slate-400">Enter your details below to create your account</p>
        </div>

        <form className="space-y-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-200">
              Name
            </label>
            <input
              id="fullName"
              type="text"
              {...form.register("fullName")}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
              placeholder="Full name"
              aria-label="Full name"
            />
            {form.formState.errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-slate-200">
              I am a...
            </label>
            <select
              id="role"
              {...form.register("role")}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
              aria-label="User role"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role === "PLAYER" ? "Football Player" : role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register("email")}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
              placeholder="email@example.com"
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
              placeholder="Password"
              aria-label="Password"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-200">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...form.register("confirmPassword")}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
              placeholder="Confirm password"
              aria-label="Confirm password"
            />
            {form.formState.errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <label className="flex items-start gap-2 text-sm text-slate-300">
            <input type="checkbox" {...form.register("gdprConsent")} className="mt-1" />
            <span>I consent to GDPR-compliant data processing.</span>
          </label>
          {form.formState.errors.gdprConsent && (
            <p className="text-xs text-red-600">{form.formState.errors.gdprConsent.message}</p>
          )}

          {mutation.isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              Registration failed. The email may already exist or the payload is invalid.
            </div>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-slate-100 underline">
              Log in
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
