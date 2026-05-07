"use client";

import { ChevronRight, Play, Globe, Brain, Dumbbell, Coins } from "lucide-react";

export default function SportifyEcosystem() {
  return (
    <section className="relative overflow-hidden bg-[#000000] py-28 sm:py-36">
      {/* Ambient background orbs */}
      <div className="pointer-events-none absolute -left-60 top-0 h-[700px] w-[700px] rounded-full bg-[#1db954]/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-60 bottom-0 h-[600px] w-[600px] rounded-full bg-[#1db954]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Large display headline — 7 cols */}
          <div className="lg:col-span-7">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1db954]">
              The Ecosystem
            </p>
            <h2 className="text-5xl font-extrabold leading-[1.05] tracking-tighter text-white sm:text-6xl md:text-7xl">
              The Professional
              <br />
              Network for the
              <br />
              <span className="text-[#1db954]">Beautiful Game.</span>
            </h2>
          </div>

          {/* Sub-headline + CTA — 5 cols, vertically offset */}
          <div className="flex flex-col justify-end lg:col-span-5 lg:pb-4">
            <p className="text-base leading-relaxed text-[#b3b3b3] sm:text-lg">
              Sportify is the world&apos;s first unified platform connecting
              football talent, clubs, and industry professionals. Showcase your
              skills, get scouted through AI-driven data, and manage your
              physical wellness — all in one place.
            </p>
            <a
              href="/login"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#1db954] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[#1ed760]"
            >
              Explore the Platform
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* ── CLARITY BLOCK — BENTO ASYMMETRIC GRID ──────────────── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

          {/* ROW 1: Players — wide left, tall right */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#282828] bg-[#0d0d0d] p-8 transition hover:border-[#1db954]/30 sm:p-10 lg:col-span-7">
            {/* Glow */}
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#1db954]/10 blur-[80px] transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1db954]/10">
                <Play className="h-5 w-5 text-[#1db954]" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
                For Players
              </p>
              <h3 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Your Dynamic Video CV.
              </h3>
              <p className="max-w-lg text-[#b3b3b3]">
                Build a living football profile with highlight reels, AI-scored
                performance data, and verified stats. Get discovered by clubs
                worldwide — no agent required.
              </p>
              <a
                href="/login"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1db954] transition hover:gap-2.5"
              >
                Create Your Profile <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ROW 1 right: stat mock card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#282828] bg-[#0d0d0d] p-8 lg:col-span-5">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#1db954]/8 blur-[60px]" />
            {/* Mini profile mock */}
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1db954]/20 text-base font-extrabold text-[#1db954]">
                  KM
                </div>
                <div>
                  <p className="font-bold text-white">Karim Müller</p>
                  <p className="text-xs text-[#6a6a6a]">Defender · Age 21</p>
                </div>
                <span className="ml-auto rounded-full bg-[#1db954]/15 px-3 py-1 text-xs font-bold text-[#1db954]">
                  92 Rating
                </span>
              </div>
              <div className="h-px bg-[#282828]" />
              {[
                { label: "Pace", pct: 91 },
                { label: "Positioning", pct: 87 },
                { label: "Aerial", pct: 84 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-[#b3b3b3]">{s.label}</span>
                    <span className="font-bold text-white">{s.pct}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#282828]">
                    <div
                      className="h-full rounded-full bg-[#1db954]"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-1 rounded-xl border border-[#282828] bg-[#1a1a1a] p-3 text-center">
                <p className="text-xs text-[#6a6a6a]">Clubs interested</p>
                <p className="text-2xl font-extrabold text-white">14</p>
              </div>
            </div>
          </div>

          {/* ROW 2: AI Scouting — narrow left accent + wide right content */}
          <div className="relative overflow-hidden rounded-3xl border border-[#282828] bg-gradient-to-br from-[#0d1a12] to-[#0d0d0d] p-8 sm:p-10 lg:col-span-5">
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#1db954]/10 blur-[60px]" />
            <div className="relative">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1db954]/10">
                <Brain className="h-5 w-5 text-[#1db954]" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
                For Clubs &amp; Scouts
              </p>
              <h3 className="mb-3 text-3xl font-extrabold tracking-tight text-white">
                Football Intelligence,
                <br />
                Amplified by AI.
              </h3>
              <p className="text-[#b3b3b3]">
                Stop scrolling through highlight reels manually. Define your
                ideal player profile and let our AI surface ranked candidates
                with verified stats, positional heatmaps, and fit scores.
              </p>
              <a
                href="/login"
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1db954] transition hover:gap-2.5"
              >
                Start Scouting <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ROW 2 right: AI mock card */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#282828] bg-[#0d0d0d] p-8 lg:col-span-7">
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#b3b3b3]">AI Scout Results</span>
                <span className="rounded-full bg-[#1db954]/15 px-3 py-0.5 text-[10px] font-bold text-[#1db954]">
                  Live Match
                </span>
              </div>
              {[
                { initials: "KM", name: "Karim Müller", pos: "CB", score: 94 },
                { initials: "MS", name: "Marcus Silva", pos: "LW", score: 87 },
                { initials: "JT", name: "Jamal Touré", pos: "ST", score: 82 },
              ].map((p, i) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 rounded-xl border border-[#282828] bg-[#1a1a1a] p-3"
                >
                  <span className="w-4 text-xs font-bold text-[#6a6a6a]">
                    {i + 1}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1db954]/20 text-xs font-bold text-[#1db954]">
                    {p.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{p.name}</p>
                    <p className="text-[10px] text-[#6a6a6a]">{p.pos}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-[#1db954]">
                      {p.score}%
                    </p>
                    <p className="text-[10px] text-[#6a6a6a]">Fit</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 3: FIT-Pass — full width, split inside */}
          <div className="relative overflow-hidden rounded-3xl border border-[#282828] bg-[#0d0d0d] p-8 sm:p-10 lg:col-span-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-[#1db954]/6 blur-[80px]" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-20">
              <div className="flex flex-col justify-center">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1db954]/10">
                  <Dumbbell className="h-5 w-5 text-[#1db954]" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
                  FIT-Pass · For Everyone
                </p>
                <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Your Football Body.
                  <br />
                  Your Global Pass.
                </h3>
                <p className="max-w-md text-[#b3b3b3]">
                  Access elite training academies, performance gyms, and
                  sports wellness services worldwide with a single Sportify
                  FIT-Pass subscription. Built for professionals. Open to all.
                </p>
                <a
                  href="/login"
                  className="mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#1db954] transition hover:gap-2.5"
                >
                  Get Your FIT-Pass <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              {/* FIT-Pass mock access UI */}
              <div className="flex items-center">
                <div className="w-full rounded-2xl border border-[#282828] bg-[#1a1a1a] p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1db954]">
                      <Globe className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <p className="font-bold text-white">FIT-Pass Active</p>
                      <p className="text-xs text-[#6a6a6a]">Global Access · Pro Plan</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Academies", val: "340+" },
                      { label: "Countries", val: "48" },
                      { label: "Check-ins", val: "12" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-[#282828] bg-[#121212] p-3 text-center"
                      >
                        <p className="text-lg font-extrabold text-[#1db954]">
                          {s.val}
                        </p>
                        <p className="text-[10px] text-[#6a6a6a]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-xl border border-[#282828] bg-[#121212] p-3">
                    <p className="mb-2 text-xs font-semibold text-[#b3b3b3]">
                      Recent Check-ins
                    </p>
                    {[
                      "Elite FC Academy · Munich",
                      "ProSport Gym · Dubai",
                    ].map((loc) => (
                      <div
                        key={loc}
                        className="flex items-center gap-2 py-1"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1db954]" />
                        <span className="text-xs text-[#b3b3b3]">{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
