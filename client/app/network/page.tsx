"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthRequired } from "../../components/auth-required";
import { LoadingSession } from "../../components/loading-session";
import { ScoutShell } from "../../components/scout-shell";
import { apiClient } from "../../lib/api-client";
import { useAuth } from "../../lib/auth-context";

const followSchema = z.object({
  targetUserId: z.string().min(1, "Target user id is required"),
});

type FollowValues = z.infer<typeof followSchema>;

type UserSummary = {
  id: string;
  email: string;
  role: string;
  profilePhoto?: string | null;
};

type SocialListResponse = {
  status: string;
  data: UserSummary[];
};

async function fetchFollowers(accessToken: string) {
  const response = await apiClient.get<SocialListResponse>("/api/v1/social/followers", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

async function fetchFollowing(accessToken: string) {
  const response = await apiClient.get<SocialListResponse>("/api/v1/social/following", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

async function followUser(accessToken: string, targetUserId: string) {
  const response = await apiClient.post(
    `/api/v1/social/follow/${targetUserId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
}

async function unfollowUser(accessToken: string, targetUserId: string) {
  const response = await apiClient.delete(`/api/v1/social/unfollow/${targetUserId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export default function NetworkPage() {
  const { authState, isReady } = useAuth();

  const form = useForm<FollowValues>({
    resolver: zodResolver(followSchema),
    defaultValues: {
      targetUserId: "",
    },
  });

  const followersQuery = useQuery({
    queryKey: ["followers", authState?.user.id],
    queryFn: () => fetchFollowers(authState!.accessToken),
    enabled: Boolean(authState?.accessToken),
  });

  const followingQuery = useQuery({
    queryKey: ["following", authState?.user.id],
    queryFn: () => fetchFollowing(authState!.accessToken),
    enabled: Boolean(authState?.accessToken),
  });

  const followMutation = useMutation({
    mutationFn: (values: FollowValues) => followUser(authState!.accessToken, values.targetUserId),
    onSuccess: async () => {
      form.reset({ targetUserId: "" });
      await Promise.all([followersQuery.refetch(), followingQuery.refetch()]);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: (values: FollowValues) => unfollowUser(authState!.accessToken, values.targetUserId),
    onSuccess: async () => {
      form.reset({ targetUserId: "" });
      await Promise.all([followersQuery.refetch(), followingQuery.refetch()]);
    },
  });

  if (!isReady) {
    return <LoadingSession />;
  }

  if (!authState) {
    return <AuthRequired title="Network" message="Login is required to use follow/unfollow actions." />;
  }

  return (
    <ScoutShell title="Network" subtitle="Manage your following and followers.">
        <form className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-3">
          <input
            {...form.register("targetUserId")}
            placeholder="Target user id"
            className="md:col-span-2 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
            aria-label="Target user id"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={form.handleSubmit((values) => followMutation.mutate(values))}
              disabled={followMutation.isPending}
              className="w-full rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-60"
            >
              {followMutation.isPending ? "Following..." : "Follow"}
            </button>
            <button
              type="button"
              onClick={form.handleSubmit((values) => unfollowMutation.mutate(values))}
              disabled={unfollowMutation.isPending}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 disabled:opacity-60"
            >
              {unfollowMutation.isPending ? "Unfollowing..." : "Unfollow"}
            </button>
          </div>

          {form.formState.errors.targetUserId && (
            <p className="md:col-span-3 text-xs text-red-600">{form.formState.errors.targetUserId.message}</p>
          )}

          {(followMutation.isError || unfollowMutation.isError) && (
            <p className="md:col-span-3 text-xs text-red-600">
              Action failed. Confirm target user id exists and is valid for this operation.
            </p>
          )}
        </form>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-200">Followers</h2>
            {followersQuery.isLoading && <p className="text-sm text-slate-400">Loading followers...</p>}
            {followersQuery.isError && <p className="text-sm text-red-400">Could not fetch followers.</p>}
            {!followersQuery.isLoading && !followersQuery.isError && (
              <div className="space-y-2">
                {followersQuery.data?.length ? (
                  followersQuery.data.map((user) => (
                    <div key={user.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                      <p className="text-sm font-medium text-slate-100">{user.email}</p>
                      <p className="text-xs text-slate-400">{user.role}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No followers yet.</p>
                )}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="mb-3 text-sm font-semibold text-slate-200">Following</h2>
            {followingQuery.isLoading && <p className="text-sm text-slate-400">Loading following...</p>}
            {followingQuery.isError && <p className="text-sm text-red-400">Could not fetch following list.</p>}
            {!followingQuery.isLoading && !followingQuery.isError && (
              <div className="space-y-2">
                {followingQuery.data?.length ? (
                  followingQuery.data.map((user) => (
                    <div key={user.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                      <p className="text-sm font-medium text-slate-100">{user.email}</p>
                      <p className="text-xs text-slate-400">{user.role}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">Not following anyone yet.</p>
                )}
              </div>
            )}
          </section>
        </div>
    </ScoutShell>
  );
}
