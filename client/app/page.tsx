"use client";

import {
  Upload,
  BrainCircuit,
  Eye,
  ChevronRight,
  Shield,
  Target,
  Zap,
  Users,
  TrendingUp,
  Star,
  BarChart3,
} from "lucide-react";
import SportifyEcosystem from "@/components/SportifyEcosystem";

/* ================================================================
   SPORTIFY — PUBLIC LANDING PAGE
   Route: /
   All sub-components are co-located below the default export.
   ================================================================ */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
      <PlayerPreview />
      <SportifyEcosystem />
      <AISection />
      <SplitSection />
      <CTASection />
      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------------
   1. NAVBAR
   ---------------------------------------------------------------- */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#282828] bg-[#000000]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1db954]">
            <Zap className="h-4 w-4 text-black" />
          </div>
          <span className="text-lg font-bold tracking-tight">Sportify</span>
        </a>
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="rounded-full px-5 py-2 text-sm font-medium text-[#b3b3b3] transition hover:text-white"
          >
            Log In
          </a>
          <a
            href="/login"
            className="rounded-full bg-[#1db954] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#1ed760]"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ----------------------------------------------------------------
   2. HERO SECTION
   ---------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a2e14] via-[#000000] to-[#000000]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#1db954]/5 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#282828] bg-[#121212] px-4 py-1.5 text-xs text-[#b3b3b3]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1db954]" />
            AI-Powered Football Platform
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Discover Football
            <br />
            Talent with{" "}
            <span className="text-[#1db954]">AI</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#b3b3b3] sm:text-lg">
            Players showcase their skills. Clubs find the right talent faster
            using data and video.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-[#1db954] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[#1ed760]"
            >
              Join as Player
              <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-[#282828] bg-[#121212] px-7 py-3 text-sm font-semibold text-white transition hover:border-[#1db954]/50 hover:bg-[#1a1a1a]"
            >
              Join as Club
            </a>
          </div>

          <p className="mt-5 text-xs text-[#6a6a6a]">
            Free to start&nbsp;&nbsp;&bull;&nbsp;&nbsp;Trusted by players &amp; clubs
          </p>
        </div>

        {/* Right - Mock UI */}
        <div className="hidden items-center justify-center lg:flex">
          <div className="relative w-full max-w-md">
            <div className="rounded-2xl border border-[#282828] bg-[#121212] p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#b3b3b3]">
                  Player Dashboard
                </span>
                <span className="rounded-full bg-[#1db954]/15 px-2.5 py-0.5 text-xs font-semibold text-[#1db954]">
                  Live
                </span>
              </div>
              <div className="mb-5 flex items-end gap-2">
                {[40, 65, 50, 80, 55, 72, 90, 60, 78, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-[#1db954]/20"
                    style={{ height: `${h}px` }}
                  >
                    <div
                      className="w-full rounded-sm bg-[#1db954]"
                      style={{ height: `${h * 0.6}px`, marginTop: `${h * 0.4}px` }}
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Views", val: "2.4K" },
                  { label: "Scouts", val: "18" },
                  { label: "Rating", val: "8.7" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-[#282828] bg-[#1a1a1a] p-3 text-center"
                  >
                    <p className="text-lg font-bold text-white">{s.val}</p>
                    <p className="text-[10px] text-[#6a6a6a]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -left-6 -bottom-4 rounded-xl border border-[#282828] bg-[#1a1a1a] p-3 shadow-2xl sm:-left-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1db954]/20 text-sm font-bold text-[#1db954]">
                  KM
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Karim M&#252;ller</p>
                  <p className="text-[10px] text-[#6a6a6a]">Defender &#183; 92 Rating</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-8 rounded-xl border border-[#282828] bg-[#1a1a1a] p-3 shadow-2xl sm:-right-8">
              <p className="text-[10px] text-[#6a6a6a]">Fit Score</p>
              <p className="text-2xl font-extrabold text-[#1db954]">87%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   3. TRUST STRIP
   ---------------------------------------------------------------- */

function TrustStrip() {
  return (
    <section className="border-y border-[#282828] bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <p className="text-sm text-[#6a6a6a]">
          Trusted by players, academies, and scouts
        </p>
        <div className="flex items-center gap-8">
          {["Academies", "Clubs", "Scouts"].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 text-sm font-semibold text-[#b3b3b3]"
            >
              <Shield className="h-4 w-4 text-[#1db954]/60" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   4. HOW IT WORKS
   ---------------------------------------------------------------- */

function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Highlights",
      text: "Share your best match moments and training clips in seconds.",
    },
    {
      icon: BrainCircuit,
      title: "AI Analyzes Performance",
      text: "Our AI evaluates speed, technique, positioning, and more.",
    },
    {
      icon: Eye,
      title: "Get Discovered",
      text: "Clubs and scouts find you based on real, data-driven performance.",
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
            How It Works
          </p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Three Simple Steps
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group rounded-2xl border border-[#282828] bg-[#121212] p-8 transition hover:border-[#1db954]/30"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1db954]/10 text-[#1db954] transition group-hover:bg-[#1db954]/20">
                <step.icon className="h-5 w-5" />
              </div>
              <p className="mb-1 text-xs font-bold text-[#6a6a6a]">
                Step {i + 1}
              </p>
              <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#b3b3b3]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   5. PLAYER PREVIEW
   ---------------------------------------------------------------- */

function PlayerPreview() {
  const players = [
    { initials: "KM", name: "Karim M\u00fcller", role: "Defender", rating: 8.9 },
    { initials: "MS", name: "Marcus Silva", role: "Winger", rating: 9.1 },
    { initials: "LO", name: "Luca Okafor", role: "Midfielder", rating: 8.5 },
    { initials: "JT", name: "Jamal Tour\u00e9", role: "Striker", rating: 9.3 },
  ];

  return (
    <section className="border-t border-[#282828] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
            Featured Players
          </p>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Rising Talent on Sportify
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {players.map((p) => (
            <div
              key={p.name}
              className="group rounded-2xl border border-[#282828] bg-[#121212] p-6 transition hover:border-[#1db954]/30"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1db954]/15 text-base font-bold text-[#1db954]">
                {p.initials}
              </div>
              <h3 className="text-base font-bold">{p.name}</h3>
              <p className="mb-3 text-xs text-[#6a6a6a]">{p.role}</p>
              <div className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 text-[#1db954]" />
                <span className="text-sm font-semibold text-[#b3b3b3]">
                  {p.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   6. AI FOR CLUBS
   ---------------------------------------------------------------- */

function AISection() {
  const bullets = [
    { icon: Target, text: "Find players that match your needs" },
    { icon: TrendingUp, text: "Save time on manual scouting" },
    { icon: BarChart3, text: "Get ranked recommendations instantly" },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col justify-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1db954]">
            For Clubs
          </p>
          <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl">
            AI-Powered Scouting
            <br />
            for Clubs
          </h2>

          <ul className="mb-8 flex flex-col gap-4">
            {bullets.map((b) => (
              <li key={b.text} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1db954]/10">
                  <b.icon className="h-3.5 w-3.5 text-[#1db954]" />
                </div>
                <span className="text-[#b3b3b3]">{b.text}</span>
              </li>
            ))}
          </ul>

          <a
            href="/login"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1db954] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[#1ed760]"
          >
            Start as a Club
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-[#282828] bg-[#121212] p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#b3b3b3]">
                Scout Dashboard
              </span>
              <span className="rounded-full bg-[#1db954]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#1db954]">
                AI Match
              </span>
            </div>

            <div className="mb-4 rounded-xl border border-[#282828] bg-[#1a1a1a] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1db954]/20 text-sm font-bold text-[#1db954]">
                  KM
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Karim M&#252;ller</p>
                  <p className="text-[10px] text-[#6a6a6a]">
                    Defender &#183; FC Bayern U21
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-[#1db954]">87%</p>
                  <p className="text-[10px] text-[#6a6a6a]">Fit Score</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Pace", val: "91" },
                { label: "Tackle", val: "88" },
                { label: "Vision", val: "79" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-[#282828] bg-[#0a0a0a] py-2 text-center"
                >
                  <p className="text-sm font-bold">{s.val}</p>
                  <p className="text-[10px] text-[#6a6a6a]">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              {[
                { name: "Marcus Silva", score: "82%" },
                { name: "Luca Okafor", score: "78%" },
              ].map((r) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between rounded-lg border border-[#282828] bg-[#1a1a1a] px-3 py-2"
                >
                  <span className="text-xs text-[#b3b3b3]">{r.name}</span>
                  <span className="text-xs font-semibold text-[#1db954]">
                    {r.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   7. FOR PLAYERS / FOR CLUBS SPLIT
   ---------------------------------------------------------------- */

function SplitSection() {
  return (
    <section className="border-t border-[#282828] bg-[#0a0a0a] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 sm:px-8">
        <div className="rounded-2xl border border-[#282828] bg-[#121212] p-8 sm:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1db954]/10">
            <Users className="h-5 w-5 text-[#1db954]" />
          </div>
          <h3 className="mb-2 text-xl font-bold">For Players</h3>
          <p className="mb-6 text-sm leading-relaxed text-[#b3b3b3]">
            Build your football profile and get discovered by top clubs and
            scouts worldwide.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-[#1db954] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[#1ed760]"
          >
            Create Profile
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="rounded-2xl border border-[#282828] bg-[#121212] p-8 sm:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1db954]/10">
            <Target className="h-5 w-5 text-[#1db954]" />
          </div>
          <h3 className="mb-2 text-xl font-bold">For Clubs</h3>
          <p className="mb-6 text-sm leading-relaxed text-[#b3b3b3]">
            Discover and recruit talent using AI-driven scouting tools and
            ranked recommendations.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-full border border-[#282828] bg-[#1a1a1a] px-6 py-2.5 text-sm font-semibold text-white transition hover:border-[#1db954]/50"
          >
            Find Players
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   8. FINAL CTA
   ---------------------------------------------------------------- */

function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">
          Start Your Journey on{" "}
          <span className="text-[#1db954]">Sportify</span>
        </h2>
        <p className="mb-8 text-[#b3b3b3]">
          Whether you&apos;re a player looking to get noticed or a club searching
          for the next star — this is where it starts.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-[#1db954] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[#1ed760]"
          >
            Join as Player
            <ChevronRight className="h-4 w-4" />
          </a>
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-full border border-[#282828] bg-[#121212] px-7 py-3 text-sm font-semibold text-white transition hover:border-[#1db954]/50 hover:bg-[#1a1a1a]"
          >
            Join as Club
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   9. FOOTER
   ---------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-[#282828] bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1db954]">
            <Zap className="h-3.5 w-3.5 text-black" />
          </div>
          <span className="text-sm font-bold">Sportify</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#6a6a6a]">
          <a href="#" className="transition hover:text-[#b3b3b3]">
            About
          </a>
          <a href="#" className="transition hover:text-[#b3b3b3]">
            Contact
          </a>
          <a href="#" className="transition hover:text-[#b3b3b3]">
            Terms
          </a>
          <a href="#" className="transition hover:text-[#b3b3b3]">
            Privacy
          </a>
        </div>

        <p className="text-xs text-[#6a6a6a]">
          &copy; 2026 Sportify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
