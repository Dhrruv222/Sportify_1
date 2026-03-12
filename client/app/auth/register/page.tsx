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
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Z])(?=.*\d).+$/, "Password must include one uppercase letter and one number"),
  role: z.enum(roles),
  gdprConsent: z.literal(true, {
    error: "You must explicitly accept GDPR consent",
  }),
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
  const response = await apiClient.post<RegisterResponse>("/api/v1/auth/register", payload);
  return response.data;
}

export default function RegisterPage() {
  const { setAuthState } = useAuth();
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
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
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900">Register</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back
          </Link>
        </div>

        <form className="space-y-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register("email")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...form.register("password")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-zinc-700">
              Role
            </label>
            <select
              id="role"
              {...form.register("role")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-start gap-2 text-sm text-zinc-700">
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
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending ? "Creating account..." : "Create account"}
          </button>
        </form>
      </main>
    </div>
  );
}
