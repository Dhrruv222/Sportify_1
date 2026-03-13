"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AuthRequired } from "../../components/auth-required";
import { LoadingSession } from "../../components/loading-session";
import { ScoutShell } from "../../components/scout-shell";
import { apiClient } from "../../lib/api-client";
import { useAuth } from "../../lib/auth-context";

type FeedVideo = {
  id: string;
  title: string;
  description?: string | null;
  url: string;
  thumbnail?: string | null;
  viewsCount?: number;
  createdAt: string;
  player?: {
    firstName?: string;
    lastName?: string;
    user?: {
      profilePhoto?: string | null;
    };
  };
  _count?: {
    likes?: number;
    comments?: number;
  };
};

type FeedResponse = {
  status: string;
  data: FeedVideo[];
  nextCursor: string | null;
  feedType: string;
};

async function fetchFeed(accessToken: string, feedType: "discover" | "following", cursor?: string) {
  const response = await apiClient.get<FeedResponse>("/api/v1/social/feed", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      type: feedType,
      limit: 10,
      ...(cursor ? { cursor } : {}),
    },
  });

  return response.data;
}

export default function FeedPage() {
  const { authState, isReady } = useAuth();
  const [feedType, setFeedType] = useState<"discover" | "following">("discover");

  const query = useInfiniteQuery({
    queryKey: ["social-feed", authState?.user.id, feedType],
    queryFn: ({ pageParam }) => fetchFeed(authState!.accessToken, feedType, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    enabled: Boolean(authState?.accessToken),
  });

  if (!isReady) {
    return <LoadingSession />;
  }

  if (!authState) {
    return <AuthRequired title="Social Feed" message="Login is required to access the feed." />;
  }

  const items = query.data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <ScoutShell title="Video Feed" subtitle="Discover and review latest player clips.">

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFeedType("discover")}
            className={`rounded-xl px-3 py-1.5 text-sm ${
              feedType === "discover" ? "bg-sky-600 text-white" : "bg-slate-900 text-slate-300 border border-slate-700"
            }`}
          >
            Discover
          </button>
          <button
            type="button"
            onClick={() => setFeedType("following")}
            className={`rounded-xl px-3 py-1.5 text-sm ${
              feedType === "following" ? "bg-sky-600 text-white" : "bg-slate-900 text-slate-300 border border-slate-700"
            }`}
          >
            Following
          </button>
        </div>

        {query.isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-28 animate-pulse rounded-2xl border border-slate-800 bg-slate-900" />
            ))}
          </div>
        )}

        {query.isError && (
          <div className="rounded-2xl border border-red-900/40 bg-red-900/10 p-4 text-sm text-red-300">
            Could not load feed.
          </div>
        )}

        {!query.isLoading && !query.isError && (
          <section className="space-y-3">
            {items.map((video) => (
              <article key={video.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
                <h2 className="text-base font-medium text-slate-100">{video.title}</h2>
                <p className="mt-1 text-sm text-slate-300">{video.description ?? "No description"}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span>
                    Player: {video.player?.firstName ?? "-"} {video.player?.lastName ?? ""}
                  </span>
                  <span>Likes: {video._count?.likes ?? 0}</span>
                  <span>Comments: {video._count?.comments ?? 0}</span>
                  <span>Views: {video.viewsCount ?? 0}</span>
                </div>
              </article>
            ))}

            {!items.length && <p className="text-sm text-slate-400">No feed items available.</p>}

            {query.hasNextPage && (
              <button
                type="button"
                onClick={() => query.fetchNextPage()}
                disabled={query.isFetchingNextPage}
                className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 disabled:opacity-60"
              >
                {query.isFetchingNextPage ? "Loading more..." : "Load more"}
              </button>
            )}
          </section>
        )}
    </ScoutShell>
  );
}
