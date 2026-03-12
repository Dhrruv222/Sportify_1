"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthRequired } from "../../components/auth-required";
import { LoadingSession } from "../../components/loading-session";
import { PageHeader } from "../../components/page-header";
import { apiClient } from "../../lib/api-client";
import { useAuth } from "../../lib/auth-context";

const updateSchema = z.object({
  jsonPayload: z
    .string()
    .min(2, "JSON payload is required")
    .refine((value) => {
      try {
        const parsed = JSON.parse(value) as unknown;
        return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed);
      } catch {
        return false;
      }
    }, "Payload must be a valid JSON object"),
});

type UpdateValues = z.infer<typeof updateSchema>;

type ProfileResponse = {
  status: string;
  data: Record<string, unknown>;
};

async function fetchProfile(accessToken: string) {
  const response = await apiClient.get<ProfileResponse>("/api/v1/profile/show", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

async function updateProfile(accessToken: string, payload: Record<string, unknown>) {
  const response = await apiClient.put("/api/v1/profile/update", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export default function ProfilePage() {
  const { authState, isReady } = useAuth();

  const form = useForm<UpdateValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      jsonPayload: "{}",
    },
  });

  const profileQuery = useQuery({
    queryKey: ["my-profile", authState?.user.id],
    queryFn: () => fetchProfile(authState!.accessToken),
    enabled: Boolean(authState?.accessToken),
  });

  const updateMutation = useMutation({
    mutationFn: (values: UpdateValues) =>
      updateProfile(authState!.accessToken, JSON.parse(values.jsonPayload) as Record<string, unknown>),
    onSuccess: async () => {
      await profileQuery.refetch();
    },
  });

  if (!isReady) {
    return <LoadingSession />;
  }

  if (!authState) {
    return <AuthRequired title="My Profile" message="Login is required to access profile routes." />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <PageHeader title="My Profile" />

        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-zinc-800">Session</h2>
          <p className="text-sm text-zinc-600">{authState.user.email}</p>
          <p className="text-xs text-zinc-500">Role: {authState.user.role}</p>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-zinc-800">Current profile data</h2>
          {profileQuery.isLoading && <p className="text-sm text-zinc-600">Loading profile...</p>}
          {profileQuery.isError && <p className="text-sm text-red-600">Failed to fetch profile.</p>}
          {!profileQuery.isLoading && !profileQuery.isError && (
            <pre className="overflow-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">
              {JSON.stringify(profileQuery.data ?? {}, null, 2)}
            </pre>
          )}
        </section>

        <form
          onSubmit={form.handleSubmit((values) => updateMutation.mutate(values))}
          className="rounded-xl border border-zinc-200 bg-white p-4"
        >
          <h2 className="mb-3 text-sm font-semibold text-zinc-800">Update profile payload (JSON)</h2>
          <textarea
            {...form.register("jsonPayload")}
            rows={8}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm outline-none focus:border-zinc-500"
          />
          {form.formState.errors.jsonPayload && (
            <p className="mt-1 text-xs text-red-600">{form.formState.errors.jsonPayload.message}</p>
          )}

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="mt-3 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
          >
            {updateMutation.isPending ? "Updating..." : "Update profile"}
          </button>

          {updateMutation.isError && (
            <p className="mt-2 text-xs text-red-600">
              Update failed. Ensure payload fields match your role profile model.
            </p>
          )}

          {updateMutation.isSuccess && <p className="mt-2 text-xs text-green-700">Profile updated.</p>}
        </form>
      </main>
    </div>
  );
}
