"use client";

import {
  ChevronRight,
  Globe,
  Brain,
  Dumbbell,
  Coins,
  Users,
  Target,
  Zap,
  TrendingUp,
  Shield,
  Star,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#282828] bg-[#000000]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1db954]">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <span className="text-lg font-bold tracking-tight">Sportify</span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/login" className="rounded-full px-5 py-2 text-sm font-medium text-[#b3b3b3] transition hover:text-white">
              Log In
            </a>
            <a href="/login" className="rounded-full bg-[#1db954] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#1ed760]">
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* ── SECTION 1: HERO ───────────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        {/* Orbs */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[700px] w-[700px] rounded-full bg-[#1db954]/8 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#1db954]/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

            {/* Massive display headline — 8 cols */}
            <div className="lg:col-span-8">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#282828] bg-[#121212]/80 px-4 py-1.5 text-xs text-[#b3b3b3] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1db954]" />
                Our Mission
              </div>
              <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
                The Future
                <br />
                of Football
                <br />
                <span className="text-[#1db954]">is Connected.</span>
              </h1>
            </div>

            {/* Right sub-copy — 4 cols, bottom aligned */}
            <div className="flex flex-col justify-end lg:col-span-4 lg:pb-6">
              <p className="text-lg leading-relaxed text-[#b3b3b3]">
                Sportify was built on a single conviction: every football
                talent deserves a fair shot, and every club deserves a smarter
                way to find them. We are building the professional infrastructure
                the world&apos;s most popular sport never had.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1db954] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#1ed760]"
                >
                  Join the Platform
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Floating stat strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { val: "4B+", label: "Football fans worldwide" },
              { val: "250M+", label: "Registered players" },
              { val: "211", label: "FIFA member nations" },
              { val: "$3T", label: "Global football economy" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[#282828] bg-[#121212]/60 p-5 text-center backdrop-blur-sm"
              >
                <p className="text-3xl font-extrabold tracking-tight text-[#1db954]">
                  {s.val}
                </p>
                <p className="mt-1 text-xs text-[#6a6a6a]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE PROBLEM ────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[#282828] bg-[#070707] py-28 sm:py-36">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-red-900/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">

            {/* Stark label column — 3 cols */}
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b3b3b3]">
                Chapter 01
              </p>
              <div className="mt-4 h-px w-12 bg-[#282828]" />
              <p className="mt-6 text-4xl font-extrabold tracking-tight text-white">
                The Problem.
              </p>
            </div>

            {/* Problem copy — 9 cols */}
            <div className="lg:col-span-9">
              <p className="mb-12 text-2xl leading-relaxed text-[#b3b3b3] sm:text-3xl">
                Football is the most played sport on earth. Yet the
                infrastructure connecting talent to opportunity remains stuck
                in the past.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    title: "Talent is trapped by geography",
                    text: "Exceptional players in developing markets have no structured way to reach global clubs. A defender in Accra is invisible to a scout in Berlin.",
                  },
                  {
                    title: "Scouting is slow and biased",
                    text: "Most talent discovery still relies on physical attendance, personal networks, and gut instinct — leaving measurable, verifiable performance data on the table.",
                  },
                  {
                    title: "Data is fragmented and inconsistent",
                    text: "Player statistics exist across dozens of disconnected platforms with no unified identity layer. There is no single source of truth for a player&apos;s career.",
                  },
                  {
                    title: "Monetization is out of reach",
                    text: "Agents and intermediaries capture most of the value. Players — even established ones — lack direct tools to monetize their personal brand and IP.",
                  },
                ].map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-[#282828] bg-[#0d0d0d] p-6"
                  >
                    <div className="mb-3 h-0.5 w-8 bg-[#1db954]/40" />
                    <h3 className="mb-2 text-base font-bold text-white">
                      {p.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-[#6a6a6a]"
                      dangerouslySetInnerHTML={{ __html: p.text }}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE SOLUTION ───────────────────────── */}
      <section className="relative overflow-hidden border-t border-[#282828] py-28 sm:py-36">
        <div className="pointer-events-none absolute left-1/3 top-0 h-96 w-96 rounded-full bg-[#1db954]/6 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

          {/* Header row */}
          <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b3b3b3]">
                Chapter 02
              </p>
              <div className="mt-4 h-px w-12 bg-[#282828]" />
              <p className="mt-6 text-4xl font-extrabold tracking-tight text-white">
                The Solution.
              </p>
            </div>
            <div className="flex items-end lg:col-span-8">
              <p className="text-2xl leading-relaxed text-[#b3b3b3] sm:text-3xl">
                A single, unified ecosystem — digital, physical, and on-chain —
                built exclusively for the football industry.
              </p>
            </div>
          </div>

          {/* Three pillars */}
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                label: "Digital Layer",
                title: "Global Professional Network",
                text: "A LinkedIn-level professional identity for every player, club, agent, and scout. Verified career data, video highlights, and real-time performance metrics — accessible anywhere in the world.",
              },
              {
                icon: Dumbbell,
                label: "Physical Layer",
                title: "FIT-Pass Global Access",
                text: "A subscription passport granting access to elite training academies, performance gyms, and sports-science facilities worldwide. Your football journey doesn&apos;t stop when the game ends.",
              },
              {
                icon: Coins,
                label: "Web3 Layer",
                title: "Smart Contract Monetization",
                text: "On-chain career contracts, transparent agent agreements, and player token economies. Own your career data. Monetize your brand directly. No intermediaries.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-3xl border border-[#282828] bg-[#0d0d0d] p-8 transition hover:border-[#1db954]/30"
              >
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[#1db954]/8 blur-[60px] opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1db954]/10">
                    <p.icon className="h-5 w-5 text-[#1db954]" />
                  </div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
                    {p.label}
                  </p>
                  <h3 className="mb-3 text-xl font-extrabold text-white">
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[#b3b3b3]"
                    dangerouslySetInnerHTML={{ __html: p.text }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 4: CORE PILLARS (ALTERNATING) ────────── */}
      <section className="border-t border-[#282828] bg-[#070707] py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mb-20 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1db954]">
              Chapter 03
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Core Pillars.
            </h2>
          </div>

          <div className="flex flex-col gap-6">

            {/* PILLAR 1 — Talent Discovery: image left, copy right */}
            <div className="grid overflow-hidden rounded-3xl border border-[#282828] bg-[#0d0d0d] lg:grid-cols-12">
              <div className="relative flex items-center justify-center bg-gradient-to-br from-[#0a2e14] to-[#0d0d0d] p-10 lg:col-span-5">
                <div className="pointer-events-none absolute inset-0 rounded-tl-3xl rounded-bl-3xl bg-[#1db954]/5" />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1db954]/15">
                    <Globe className="h-10 w-10 text-[#1db954]" />
                  </div>
                  {/* Mini network mock */}
                  <div className="flex items-center gap-2">
                    {["KM", "MS", "LO", "JT", "ER"].map((i) => (
                      <div
                        key={i}
                        className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0d0d0d] bg-[#1db954]/20 text-[10px] font-bold text-[#1db954] first:ml-0"
                      >
                        {i}
                      </div>
                    ))}
                    <span className="ml-2 text-xs text-[#6a6a6a]">+2.3M</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center p-10 lg:col-span-7">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
                  Pillar 01
                </p>
                <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Global Talent Discovery
                  <br />
                  &amp; Networking.
                </h3>
                <p className="text-[#b3b3b3]">
                  Sportify creates professional identities for every participant
                  in football — from a 16-year-old winger in Nairobi to a
                  director of football at a Bundesliga club. A verified,
                  searchable, globally connected network. The LinkedIn for the
                  beautiful game — except your profile speaks in goals, assists,
                  and AI performance scores.
                </p>
              </div>
            </div>

            {/* PILLAR 2 — AI: copy left, visual right (reversed) */}
            <div className="grid overflow-hidden rounded-3xl border border-[#282828] bg-[#0d0d0d] lg:grid-cols-12">
              <div className="order-2 flex flex-col justify-center p-10 lg:order-1 lg:col-span-7">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
                  Pillar 02
                </p>
                <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Football Intelligence
                  <br />
                  &amp; AI Scouting.
                </h3>
                <p className="text-[#b3b3b3]">
                  Our AI doesn&apos;t just rank players — it understands football.
                  Positional tendencies, high-pressure performance, set-piece
                  involvement, and physical output are synthesized into a single
                  intelligence layer. Clubs receive a shortlist, not a
                  spreadsheet. Every recommendation is explainable, filterable,
                  and actionable in under five minutes.
                </p>
              </div>
              <div className="order-1 flex items-center justify-center bg-gradient-to-bl from-[#0a1a2e] to-[#0d0d0d] p-10 lg:order-2 lg:col-span-5">
                <div className="w-full max-w-xs rounded-2xl border border-[#282828] bg-[#121212] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#b3b3b3]">AI Match Engine</span>
                    <Brain className="h-4 w-4 text-[#1db954]" />
                  </div>
                  {[
                    { name: "Karim Müller", score: 94, pos: "CB" },
                    { name: "Marcus Silva", score: 87, pos: "LW" },
                    { name: "Luca Okafor", score: 82, pos: "CM" },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center gap-2 py-2">
                      <div className="h-7 w-7 rounded-full bg-[#1db954]/20 text-center text-[10px] font-bold leading-7 text-[#1db954]">
                        {p.pos}
                      </div>
                      <span className="flex-1 text-xs text-white">{p.name}</span>
                      <span className="text-sm font-extrabold text-[#1db954]">
                        {p.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PILLAR 3 — FIT-Pass: left visual, right copy */}
            <div className="grid overflow-hidden rounded-3xl border border-[#282828] bg-[#0d0d0d] lg:grid-cols-12">
              <div className="relative flex items-center justify-center bg-gradient-to-br from-[#1a0a2e] to-[#0d0d0d] p-10 lg:col-span-5">
                <div className="w-full max-w-xs rounded-2xl border border-[#282828] bg-[#121212] p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1db954]">
                      <Dumbbell className="h-4 w-4 text-black" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">FIT-Pass</p>
                      <p className="text-[10px] text-[#6a6a6a]">340 venues · 48 countries</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {["Elite FC Academy · Munich", "ProSport Gym · Dubai", "Flamengo Performance · Rio"].map((loc) => (
                      <div key={loc} className="flex items-center gap-2 rounded-lg border border-[#282828] bg-[#1a1a1a] px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1db954]" />
                        <span className="text-xs text-[#b3b3b3]">{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center p-10 lg:col-span-7">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
                  Pillar 03
                </p>
                <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  FIT-Pass Ecosystem.
                </h3>
                <p className="text-[#b3b3b3]">
                  Professional development doesn&apos;t stop at 90 minutes. The
                  FIT-Pass bridges Sportify&apos;s digital network with the physical
                  world — giving players, coaches, and fans access to top-tier
                  training and wellness infrastructure globally through a single
                  unified subscription. Think ClassPass, built for football
                  professionals.
                </p>
              </div>
            </div>

            {/* PILLAR 4 — Web3: copy left, visual right */}
            <div className="grid overflow-hidden rounded-3xl border border-[#282828] bg-[#0d0d0d] lg:grid-cols-12">
              <div className="order-2 flex flex-col justify-center p-10 lg:order-1 lg:col-span-7">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
                  Pillar 04
                </p>
                <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Web3 &amp;
                  <br />
                  Smart Contracts.
                </h3>
                <p className="text-[#b3b3b3]">
                  We are building the on-chain layer for professional football.
                  Smart contracts replace opaque agent deals. Player career data
                  becomes a verifiable, portable asset. Token-based reward
                  systems let fans co-invest in emerging talent — while players
                  retain direct ownership of their brand, stats, and future
                  earnings. Transparent by design. Player-first by default.
                </p>
              </div>
              <div className="order-1 flex items-center justify-center bg-gradient-to-br from-[#1a2e0a] to-[#0d0d0d] p-10 lg:order-2 lg:col-span-5">
                <div className="w-full max-w-xs rounded-2xl border border-[#282828] bg-[#121212] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#b3b3b3]">Smart Contract</span>
                    <Coins className="h-4 w-4 text-[#1db954]" />
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      { k: "Player", v: "K. Müller" },
                      { k: "Club", v: "FC Bayern U21" },
                      { k: "Duration", v: "24 months" },
                      { k: "Revenue share", v: "12%" },
                      { k: "Status", v: "Active" },
                    ].map((r) => (
                      <div key={r.k} className="flex justify-between rounded-lg border border-[#282828] bg-[#1a1a1a] px-3 py-2">
                        <span className="text-[#6a6a6a]">{r.k}</span>
                        <span className={`font-semibold ${r.k === "Status" ? "text-[#1db954]" : "text-white"}`}>
                          {r.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: WHO IT'S FOR ───────────────────────── */}
      <section className="relative overflow-hidden border-t border-[#282828] py-28 sm:py-36">
        <div className="pointer-events-none absolute left-0 bottom-0 h-96 w-96 rounded-full bg-[#1db954]/5 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#1db954]/5 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b3b3b3]">
                Chapter 04
              </p>
              <div className="mt-4 h-px w-12 bg-[#282828]" />
              <p className="mt-6 text-4xl font-extrabold tracking-tight text-white">
                Who It&apos;s For.
              </p>
            </div>
            <div className="flex items-end lg:col-span-8">
              <p className="text-xl leading-relaxed text-[#b3b3b3]">
                Sportify serves every participant in the football economy —
                from grassroots to global elite.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Star,
                audience: "Players",
                headline: "Own your narrative.",
                points: [
                  "Build a verified, living football profile",
                  "Share highlight reels & AI-rated performance",
                  "Connect directly with clubs and scouts",
                  "Monetize your brand on-chain",
                ],
              },
              {
                icon: Target,
                audience: "Clubs & Scouts",
                headline: "Find the right fit, fast.",
                points: [
                  "AI-ranked player recommendations",
                  "Positional heatmaps & fit scores",
                  "Verified stats, no agents required",
                  "Build your scout network globally",
                ],
              },
              {
                icon: Shield,
                audience: "Agents & Advisors",
                headline: "Work at the speed of data.",
                points: [
                  "Manage client profiles centrally",
                  "Smart contract deal transparency",
                  "Track market valuations in real time",
                  "Compliant, auditable deal records",
                ],
              },
              {
                icon: Users,
                audience: "Fans & Brands",
                headline: "Be part of the game.",
                points: [
                  "Follow and co-invest in emerging players",
                  "Exclusive content and behind-the-scenes",
                  "Sponsor talent at grassroots level",
                  "Token-based fan engagement rewards",
                ],
              },
            ].map((card) => (
              <div
                key={card.audience}
                className="group rounded-3xl border border-[#282828] bg-[#0d0d0d] p-7 transition hover:border-[#1db954]/30"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1db954]/10 transition group-hover:bg-[#1db954]/20">
                  <card.icon className="h-5 w-5 text-[#1db954]" />
                </div>
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
                  {card.audience}
                </p>
                <h3 className="mb-4 text-lg font-extrabold text-white">
                  {card.headline}
                </h3>
                <ul className="space-y-2">
                  {card.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1db954]/60" />
                      <span className="text-sm text-[#b3b3b3]">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CLOSING ───────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[#282828] bg-[#070707] py-36 sm:py-48">
        {/* Large ambient glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-[#1db954]/8 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#1db954]">
            The Future Starts Here
          </p>
          <h2 className="mb-8 text-5xl font-extrabold leading-[1.05] tracking-tighter text-white sm:text-6xl md:text-7xl">
            The game has evolved.
            <br />
            <span className="text-[#1db954]">Your network should too.</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-[#b3b3b3]">
            Welcome to Sportify — where every goal, every match, and every
            career milestone becomes part of a global, verified, and
            professionally connected record.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-[#1db954] px-8 py-3.5 text-base font-semibold text-black transition hover:bg-[#1ed760]"
            >
              Join as Player
              <ChevronRight className="h-5 w-5" />
            </a>
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-[#282828] bg-[#121212] px-8 py-3.5 text-base font-semibold text-white transition hover:border-[#1db954]/50 hover:bg-[#1a1a1a]"
            >
              Join as Club
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-[#282828] bg-[#000000]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1db954]">
              <Zap className="h-3.5 w-3.5 text-black" />
            </div>
            <span className="text-sm font-bold">Sportify</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#6a6a6a]">
            <a href="#" className="transition hover:text-[#b3b3b3]">About</a>
            <a href="#" className="transition hover:text-[#b3b3b3]">Contact</a>
            <a href="#" className="transition hover:text-[#b3b3b3]">Terms</a>
            <a href="#" className="transition hover:text-[#b3b3b3]">Privacy</a>
          </div>
          <p className="text-xs text-[#6a6a6a]">&copy; 2026 Sportify. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
