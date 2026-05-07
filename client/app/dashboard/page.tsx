"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Loader2 } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import FeedCard from "@/components/FeedCard";
import { getSocialFeed } from "@/lib/api";
import type { FeedPost } from "@/types";

export default function HomePage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(
    async (p: number) => {
      try {
        const res = await getSocialFeed(p, 10);
        const newPosts = res.data;
        setPosts((prev) => (p === 1 ? newPosts : [...prev, ...newPosts]));
        setHasMore(
          res.pagination
            ? res.pagination.page < res.pagination.totalPages
            : newPosts.length === 10
        );
      } catch {
        if (p === 1) {
          setPosts(DEMO_POSTS);
          setHasMore(false);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          const nextPage = page + 1;
          setPage(nextPage);
          fetchPage(nextPage);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, page, fetchPage]);

  return (
    <DashboardShell>
      <Header />
      <main className="px-6 pb-10">
        {/* Hero */}
        <section className="mt-4 mb-6">
          <HeroCarousel posts={posts.slice(0, 5)} />
        </section>

        {/* Section title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Your Feed</h2>
          <span className="text-xs text-[var(--text-subdued)]">
            {posts.length} posts
          </span>
        </div>

        {/* Feed */}
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>

        {/* Infinite-scroll sentinel */}
        <div ref={loaderRef} className="flex justify-center py-8">
          {loading && (
            <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />
          )}
          {!hasMore && posts.length > 0 && (
            <p className="text-xs text-[var(--text-subdued)]">
              You&apos;re all caught up
            </p>
          )}
        </div>
      </main>
    </DashboardShell>
  );
}

/* ── demo data used when the API is unreachable ── */
const DEMO_POSTS: FeedPost[] = [
  {
    id: "demo-1",
    userId: "u1",
    type: "VIDEO",
    content:
      "Check out my latest training highlights from this week — working on speed drills and finishing accuracy 🎯⚽",
    mediaUrl: null,
    thumbnailUrl: null,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    user: {
      id: "u1",
      firstName: "Marcus",
      lastName: "Silva",
      avatarUrl: null,
      role: "PLAYER",
    },
    likesCount: 24,
    commentsCount: 5,
    isLiked: false,
  },
  {
    id: "demo-2",
    userId: "u2",
    type: "POST",
    content:
      "Excited to announce we are scouting for U-21 midfielders for the upcoming season. Send us your highlights! 🏟️",
    mediaUrl: null,
    thumbnailUrl: null,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    user: {
      id: "u2",
      firstName: "FC",
      lastName: "Barcelona Youth",
      avatarUrl: null,
      role: "CLUB",
    },
    likesCount: 89,
    commentsCount: 31,
    isLiked: true,
  },
  {
    id: "demo-3",
    userId: "u3",
    type: "POST",
    content:
      "Great session today with the squad. Focused on defensive transitions and pressing triggers 💪",
    mediaUrl: null,
    thumbnailUrl: null,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    user: {
      id: "u3",
      firstName: "Karim",
      lastName: "Müller",
      avatarUrl: null,
      role: "PLAYER",
    },
    likesCount: 17,
    commentsCount: 3,
    isLiked: false,
  },
  {
    id: "demo-4",
    userId: "u4",
    type: "POST",
    content:
      "Transfer window update: Top 10 moves that could reshape the league this summer. Full analysis on our blog.",
    mediaUrl: null,
    thumbnailUrl: null,
    createdAt: new Date(Date.now() - 28800000).toISOString(),
    user: {
      id: "u4",
      firstName: "Sportify",
      lastName: "News",
      avatarUrl: null,
      role: "COMPANY",
    },
    likesCount: 156,
    commentsCount: 42,
    isLiked: false,
  },
  {
    id: "demo-5",
    userId: "u5",
    type: "VIDEO",
    content:
      "Highlight reel from last night's cup match. Two assists and a clean sheet — proud of the team 🏆",
    mediaUrl: null,
    thumbnailUrl: null,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    user: {
      id: "u5",
      firstName: "Elena",
      lastName: "Rossi",
      avatarUrl: null,
      role: "PLAYER",
    },
    likesCount: 67,
    commentsCount: 12,
    isLiked: true,
  },
];
