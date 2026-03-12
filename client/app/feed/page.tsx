"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AuthRequired } from "../../components/auth-required";
import { LoadingSession } from "../../components/loading-session";
import { PageHeader } from "../../components/page-header";
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
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <PageHeader title="Feed" />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFeedType("discover")}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              feedType === "discover" ? "bg-zinc-900 text-white" : "bg-white text-zinc-700 border border-zinc-200"
            }`}
          >
            Discover
          </button>
          <button
            type="button"
            onClick={() => setFeedType("following")}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              feedType === "following" ? "bg-zinc-900 text-white" : "bg-white text-zinc-700 border border-zinc-200"
            }`}
          >
            Following
          </button>
        </div>

        {query.isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-28 animate-pulse rounded-xl border border-zinc-200 bg-white" />
            ))}
          </div>
        )}

        {query.isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Could not load feed.
          </div>
        )}

        {!query.isLoading && !query.isError && (
          <section className="space-y-3">
            {items.map((video) => (
              <article key={video.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                <h2 className="text-base font-medium text-zinc-900">{video.title}</h2>
                <p className="mt-1 text-sm text-zinc-600">{video.description ?? "No description"}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500">
                  <span>
                    Player: {video.player?.firstName ?? "-"} {video.player?.lastName ?? ""}
                  </span>
                  <span>Likes: {video._count?.likes ?? 0}</span>
                  <span>Comments: {video._count?.comments ?? 0}</span>
                  <span>Views: {video.viewsCount ?? 0}</span>
                </div>
              </article>
            ))}

            {!items.length && <p className="text-sm text-zinc-600">No feed items available.</p>}

            {query.hasNextPage && (
              <button
                type="button"
                onClick={() => query.fetchNextPage()}
                disabled={query.isFetchingNextPage}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
              >
                {query.isFetchingNextPage ? "Loading more..." : "Load more"}
              </button>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
