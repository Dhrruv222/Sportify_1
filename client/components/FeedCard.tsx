"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { FeedPost } from "@/types";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

interface FeedCardProps {
  post: FeedPost;
}

export default function FeedCard({ post }: FeedCardProps) {
  return (
    <article className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/20">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-2">
        {post.user.avatarUrl ? (
          <img
            src={post.user.avatarUrl}
            alt={`${post.user.firstName} ${post.user.lastName}`}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-highlight)] text-sm font-bold text-[var(--accent)]">
          {(post.user.firstName?.charAt(0) || "?").toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {post.user.firstName} {post.user.lastName}
          </p>
          <p className="text-xs text-[var(--text-subdued)]">
            {post.user.role} · {timeAgo(post.createdAt)}
          </p>
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <p className="px-4 pb-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {post.content}
        </p>
      )}

      {/* Media */}
      {post.mediaUrl && (
        <div className="relative aspect-video bg-[var(--bg-highlight)]">
          {post.type === "VIDEO" ? (
            <video
              src={post.mediaUrl}
              poster={post.thumbnailUrl ?? undefined}
              controls
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={post.mediaUrl}
              alt="Post media"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 px-4 py-3 border-t border-[var(--border)]">
        <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
          <Heart
            className={`h-4 w-4 ${post.isLiked ? "fill-[var(--accent)] text-[var(--accent)]" : ""}`}
          />
          <span className="text-xs">{post.likesCount}</span>
        </button>
        <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-white transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">{post.commentsCount}</span>
        </button>
        <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-white transition-colors ml-auto">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
