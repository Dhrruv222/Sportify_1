"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import type { FeedPost } from "@/types";

interface HeroCarouselProps {
  posts: FeedPost[];
}

export default function HeroCarousel({ posts }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const items = posts.slice(0, 5);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, items.length]);

  if (items.length === 0) {
    return (
      <div className="relative h-64 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--bg-surface)] flex items-center justify-center border border-[var(--border)]">
        <div className="text-center">
          <TrendingUp className="mx-auto h-10 w-10 text-[var(--accent)] mb-2" />
          <p className="text-lg font-bold text-white">Trending Now</p>
          <p className="text-sm text-[var(--text-subdued)]">
            New highlights coming soon
          </p>
        </div>
      </div>
    );
  }

  const slide = items[current];

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden border border-[var(--border)] group">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)] via-[var(--bg-surface)] to-transparent z-10" />
      {slide.mediaUrl && (
        <img
          src={slide.thumbnailUrl ?? slide.mediaUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity duration-500"
        />
      )}

      {/* Content overlay */}
      <div className="relative z-20 flex h-full flex-col justify-end p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[10px] font-bold text-black uppercase">
            <TrendingUp className="h-3 w-3" />
            Trending
          </span>
        </div>
        <h2 className="text-xl font-bold text-white leading-tight max-w-lg">
          {slide.content
            ? slide.content.length > 90
              ? slide.content.slice(0, 90) + "…"
              : slide.content
            : `${slide.user.firstName} ${slide.user.lastName}`}
        </h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {slide.user.firstName} {slide.user.lastName} · {slide.user.role}
        </p>
      </div>

      {/* Nav arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current
                    ? "w-5 bg-[var(--accent)]"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
