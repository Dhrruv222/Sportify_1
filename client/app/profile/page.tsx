"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthRequired } from "../../components/auth-required";
import { LoadingSession } from "../../components/loading-session";
import { ScoutShell } from "../../components/scout-shell";
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

  const profileData = useMemo(() => {
    return profileQuery.data ?? {};
  }, [profileQuery.data]);

  if (!isReady) {
    return <LoadingSession />;
  }

  if (!authState) {
    return <AuthRequired title="My Profile" message="Login is required to access profile routes." />;
  }

  return (
    <ScoutShell title="Edit Profile" subtitle="Manage cover photo, account details, and athletic info.">
      <section className="space-y-4">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-200">Cover Photo</p>
            <button type="button" className="text-xs text-slate-400 hover:text-white">Change Cover</button>
          </div>
          <div className="h-28 rounded-xl bg-gradient-to-r from-rose-900 via-blue-900 to-amber-700" />
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm font-semibold text-slate-200">Profile Photo</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-xs text-slate-300">
              {authState.user.email.slice(0, 2).toUpperCase()}
            </div>
            <p className="text-sm text-slate-300">Select New Photo</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm font-semibold text-slate-200">Account Information</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs text-slate-500">Email Address</p>
              <p className="text-sm text-slate-200">{authState.user.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Role</p>
              <p className="text-sm text-slate-200">{authState.user.role}</p>
            </div>
          </div>
        </article>

        <form
          onSubmit={form.handleSubmit((values) => updateMutation.mutate(values))}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
        >
          <p className="mb-3 text-sm font-semibold text-slate-200">Athletic Profile</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-slate-400">Primary Position</label>
              <input
                defaultValue={(profileData.primaryPosition as string | undefined) ?? "Attacking Midfielder"}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                aria-label="Primary position"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-400">Current Club</label>
              <input
                defaultValue={(profileData.currentClub as string | undefined) ?? "F.C. Barcelona"}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                aria-label="Current club"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-400">Height (cm)</label>
              <input
                defaultValue={(profileData.heightCm as string | number | undefined) ?? 172}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                aria-label="Height"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-400">Dominant Foot</label>
              <input
                defaultValue={(profileData.dominantFoot as string | undefined) ?? "Left"}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                aria-label="Dominant foot"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-xs text-slate-400">Advanced payload (JSON)</label>
            <textarea
              {...form.register("jsonPayload")}
              rows={6}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-100 outline-none focus:border-sky-500"
              aria-label="Profile payload JSON"
            />
            {form.formState.errors.jsonPayload && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.jsonPayload.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="mt-4 rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-60"
          >
            {updateMutation.isPending ? "Saving..." : "Save Profile Info"}
          </button>

          {updateMutation.isError && (
            <p className="mt-2 text-xs text-red-500">Update failed. Ensure payload fields match your role profile model.</p>
          )}
          {updateMutation.isSuccess && <p className="mt-2 text-xs text-emerald-400">Profile updated.</p>}
        </form>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-200">Security</p>
          <p className="text-xs text-slate-400">Password reset is currently handled by auth endpoints only.</p>
        </article>

        {profileQuery.isLoading && <p className="text-sm text-slate-400">Loading profile...</p>}
        {profileQuery.isError && <p className="text-sm text-red-400">Failed to fetch profile.</p>}
      </section>
    </ScoutShell>
  );
}
