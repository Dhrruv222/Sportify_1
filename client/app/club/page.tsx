"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import {
  Brain,
  Search,
  Bookmark,
  BookmarkCheck,
  BarChart3,
  Filter,
  ChevronDown,
  Star,
  TrendingUp,
  Users,
  Eye,
  MessageCircle,
  Loader2,
  Target,
  Zap,
  Clock,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   STATIC DEMO DATA
   ─────────────────────────────────────────────────────────────*/

const AI_RECOMMENDATIONS = [
  {
    id: "r1",
    initials: "KM",
    name: "Karim Müller",
    position: "Center Back",
    age: 21,
    club: "FC Bayern U21",
    fitScore: 94,
    rating: 9.2,
    stats: { pace: 88, tackle: 93, aerial: 91 },
    tag: "Top Match",
  },
  {
    id: "r2",
    initials: "MS",
    name: "Marcus Silva",
    position: "Left Winger",
    age: 19,
    club: "Benfica B",
    fitScore: 87,
    rating: 8.9,
    stats: { pace: 95, dribble: 88, shot: 82 },
    tag: "High Potential",
  },
  {
    id: "r3",
    initials: "JT",
    name: "Jamal Touré",
    position: "Striker",
    age: 23,
    club: "Free Agent",
    fitScore: 82,
    rating: 8.7,
    stats: { shot: 91, header: 85, press: 88 },
    tag: "Free Agent",
  },
];

const PLAYER_GRID = [
  { id: "p1", initials: "LO", name: "Luca Okafor", position: "Central Mid", age: 22, nationality: "🇨🇭", rating: 8.5, views: 142, available: true },
  { id: "p2", initials: "ER", name: "Elena Rossi", position: "Right Winger", age: 20, nationality: "🇮🇹", rating: 8.8, views: 98, available: true },
  { id: "p3", initials: "AR", name: "André Ramos", position: "Goalkeeper", age: 24, nationality: "🇧🇷", rating: 8.3, views: 75, available: false },
  { id: "p4", initials: "YA", name: "Yusuf Al-Rashid", position: "Defensive Mid", age: 21, nationality: "🇸🇦", rating: 8.6, views: 110, available: true },
  { id: "p5", initials: "SO", name: "Sofia Osei", position: "Left Back", age: 19, nationality: "🇬🇭", rating: 8.1, views: 64, available: true },
  { id: "p6", initials: "TK", name: "Tomáš Krejčí", position: "Center Back", age: 25, nationality: "🇨🇿", rating: 8.7, views: 89, available: false },
];

const SHORTLISTED = ["r1", "p2"];

const POSITIONS = ["All", "Goalkeeper", "Defender", "Midfielder", "Winger", "Striker"];
const AGE_RANGES = ["All Ages", "16–19", "20–23", "24–27", "28+"];

const RECENT_ACTIVITY = [
  { icon: Eye, text: "You viewed Karim Müller's profile", time: "2h ago", accent: false },
  { icon: BookmarkCheck, text: "Luca Okafor added to shortlist", time: "5h ago", accent: true },
  { icon: MessageCircle, text: "New message from Marcus Silva", time: "Yesterday", accent: false },
  { icon: Brain, text: "AI found 3 new matches for CB role", time: "Yesterday", accent: true },
];

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
   ─────────────────────────────────────────────────────────────*/

export default function ClubPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePosition, setActivePosition] = useState("All");
  const [activeAge, setActiveAge] = useState("All Ages");
  const [shortlist, setShortlist] = useState<string[]>(SHORTLISTED);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  const toggleShortlist = (id: string) => {
    setShortlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredPlayers = PLAYER_GRID.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPos =
      activePosition === "All" ||
      p.position.toLowerCase().includes(activePosition.toLowerCase());
    return matchesSearch && matchesPos;
  });

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)]">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  return (
    <DashboardShell>
      <div className="px-6 pb-12 pt-6 max-w-[1100px]">

        {/* ── 1. HERO HEADER ─────────────────────────────── */}
        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#0a2e14] via-[var(--bg-surface)] to-[var(--bg-surface)] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-highlight)] px-3 py-1 text-[11px] text-[var(--text-secondary)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                Club Workspace
              </div>
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                Recruitment Dashboard
              </h1>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                AI-powered scouting and talent discovery
              </p>
            </div>
            <a
              href="#discovery"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[var(--accent-hover)]"
            >
              <Search className="h-4 w-4" />
              Find Players
            </a>
          </div>

          {/* Key metrics */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Brain, label: "AI Matches", val: "12" },
              { icon: Users, label: "Players Viewed", val: "48" },
              { icon: Bookmark, label: "Shortlisted", val: shortlist.length.toString() },
              { icon: TrendingUp, label: "New This Week", val: "7" },
            ].map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]/60 px-4 py-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                  <m.icon className="h-4 w-4 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-lg font-extrabold leading-none text-white">
                    {m.val}
                  </p>
                  <p className="text-[10px] text-[var(--text-subdued)]">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. AI RECOMMENDATIONS ──────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-[var(--accent)]" />
              <h2 className="text-base font-bold text-white">AI Recommendations</h2>
            </div>
            <span className="rounded-full bg-[var(--accent)]/15 px-3 py-0.5 text-[11px] font-semibold text-[var(--accent)]">
              Live Match
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {AI_RECOMMENDATIONS.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition hover:border-[var(--accent)]/30"
              >
                {/* Fit score badge */}
                <div className="absolute right-4 top-4 text-right">
                  <p className="text-2xl font-extrabold leading-none text-[var(--accent)]">
                    {p.fitScore}%
                  </p>
                  <p className="text-[9px] text-[var(--text-subdued)]">Fit Score</p>
                </div>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-sm font-extrabold text-[var(--accent)]">
                    {p.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{p.name}</p>
                    <p className="text-[11px] text-[var(--text-subdued)]">
                      {p.position} · {p.club}
                    </p>
                  </div>
                </div>

                {/* Stat bars */}
                <div className="mb-4 flex flex-col gap-1.5">
                  {Object.entries(p.stats).map(([k, v]) => (
                    <div key={k}>
                      <div className="mb-0.5 flex justify-between text-[10px]">
                        <span className="capitalize text-[var(--text-subdued)]">{k}</span>
                        <span className="font-bold text-white">{v}</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-[var(--bg-highlight)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{ width: `${v}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tag + actions */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[var(--bg-highlight)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--text-secondary)]">
                    {p.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleShortlist(p.id)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                        shortlist.includes(p.id)
                          ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--text-subdued)] hover:text-white"
                      }`}
                      aria-label={shortlist.includes(p.id) ? "Remove from shortlist" : "Add to shortlist"}
                    >
                      {shortlist.includes(p.id) ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-subdued)] transition hover:text-white">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3 + 4. SEARCH / FILTER + PLAYER DISCOVERY GRID ── */}
        <section id="discovery" className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-[var(--accent)]" />
            <h2 className="text-base font-bold text-white">Player Discovery</h2>
          </div>

          {/* Search bar + filter row */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subdued)]" />
              <input
                type="text"
                placeholder="Search by name or position…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-full border border-[var(--border)] bg-[var(--bg-highlight)] pl-9 pr-4 text-sm text-white placeholder:text-[var(--text-subdued)] outline-none focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/20 transition-shadow"
              />
            </div>

            {/* Position filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
              <Filter className="h-4 w-4 shrink-0 text-[var(--text-subdued)]" />
              {POSITIONS.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setActivePosition(pos)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    activePosition === pos
                      ? "bg-[var(--accent)] text-black"
                      : "border border-[var(--border)] bg-[var(--bg-highlight)] text-[var(--text-secondary)] hover:text-white"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>

            {/* Age filter dropdown */}
            <div className="relative shrink-0">
              <select
                value={activeAge}
                onChange={(e) => setActiveAge(e.target.value)}
                className="h-10 appearance-none rounded-full border border-[var(--border)] bg-[var(--bg-highlight)] pl-4 pr-8 text-xs font-semibold text-[var(--text-secondary)] outline-none focus:border-[var(--accent)]/60 transition"
              >
                {AGE_RANGES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-subdued)]" />
            </div>
          </div>

          {/* Player grid */}
          {filteredPlayers.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <p className="text-sm text-[var(--text-subdued)]">No players match your filters.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPlayers.map((p) => (
                <div
                  key={p.id}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition hover:border-[var(--accent)]/30"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-highlight)] text-sm font-extrabold text-[var(--accent)]">
                        {p.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{p.name}</p>
                        <p className="text-[11px] text-[var(--text-subdued)]">
                          {p.nationality} · {p.position}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        p.available
                          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "bg-[var(--bg-highlight)] text-[var(--text-subdued)]"
                      }`}
                    >
                      {p.available ? "Available" : "Contracted"}
                    </span>
                  </div>

                  <div className="mb-4 flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-[var(--accent)]" />
                      {p.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {p.views} views
                    </span>
                    <span>Age {p.age}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleShortlist(p.id)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-semibold transition ${
                        shortlist.includes(p.id)
                          ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "border-[var(--border)] text-[var(--text-secondary)] hover:text-white"
                      }`}
                    >
                      {shortlist.includes(p.id) ? (
                        <><BookmarkCheck className="h-3.5 w-3.5" /> Shortlisted</>
                      ) : (
                        <><Bookmark className="h-3.5 w-3.5" /> Shortlist</>
                      )}
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-subdued)] transition hover:text-white">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── 5. SHORTLIST ───────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-[var(--accent)]" />
              <h2 className="text-base font-bold text-white">My Shortlist</h2>
              <span className="rounded-full bg-[var(--bg-highlight)] px-2 py-0.5 text-xs font-bold text-[var(--text-secondary)]">
                {shortlist.length}
              </span>
            </div>
          </div>

          {shortlist.length === 0 ? (
            <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg-surface)]">
              <p className="text-sm text-[var(--text-subdued)]">
                No players shortlisted yet — bookmark players above.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {[...AI_RECOMMENDATIONS, ...PLAYER_GRID]
                .filter((p) => shortlist.includes(p.id))
                .map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-5 py-3 transition hover:border-[var(--accent)]/20"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-extrabold text-[var(--accent)]">
                      {p.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{p.name}</p>
                      <p className="text-[11px] text-[var(--text-subdued)]">{p.position}</p>
                    </div>
                    {"fitScore" in p && (
                      <span className="text-sm font-extrabold text-[var(--accent)]">
                        {p.fitScore}%
                      </span>
                    )}
                    {"rating" in p && !("fitScore" in p) && (
                      <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <Star className="h-3.5 w-3.5 text-[var(--accent)]" />
                        {p.rating}
                      </span>
                    )}
                    <button
                      onClick={() => toggleShortlist(p.id)}
                      className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] transition hover:bg-[var(--accent)]/20"
                      aria-label="Remove from shortlist"
                    >
                      <BookmarkCheck className="h-4 w-4" />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* ── 6 + 7. ANALYTICS + RECENT ACTIVITY ─────────── */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Recruitment Analytics */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[var(--accent)]" />
              <h2 className="text-base font-bold text-white">Recruitment Analytics</h2>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Players Scouted", val: "48", change: "+12 this week" },
                  { label: "Shortlist Rate", val: "23%", change: "+4% vs last week" },
                  { label: "Avg Fit Score", val: "81%", change: "Top position: CB" },
                  { label: "Pending Contacts", val: "6", change: "3 unread replies" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3"
                  >
                    <p className="text-lg font-extrabold text-white">{s.val}</p>
                    <p className="text-[10px] font-semibold text-[var(--text-subdued)]">{s.label}</p>
                    <p className="mt-1 text-[10px] text-[var(--accent)]">{s.change}</p>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <p className="mb-2 text-[11px] font-semibold text-[var(--text-subdued)]">
                Players scouted by position
              </p>
              <div className="flex items-end gap-2">
                {[
                  { pos: "GK", val: 4 },
                  { pos: "CB", val: 14 },
                  { pos: "LB", val: 6 },
                  { pos: "CM", val: 12 },
                  { pos: "LW", val: 8 },
                  { pos: "ST", val: 4 },
                ].map((b) => (
                  <div key={b.pos} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm bg-[var(--accent)]/20"
                      style={{ height: `${b.val * 3}px` }}
                    >
                      <div
                        className="w-full rounded-sm bg-[var(--accent)]"
                        style={{ height: `${b.val * 1.8}px`, marginTop: `${b.val * 1.2}px` }}
                      />
                    </div>
                    <span className="text-[9px] text-[var(--text-subdued)]">{b.pos}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[var(--accent)]" />
              <h2 className="text-base font-bold text-white">Recent Activity</h2>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
              <div className="flex flex-col divide-y divide-[var(--border)]">
                {RECENT_ACTIVITY.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        item.accent
                          ? "bg-[var(--accent)]/10"
                          : "bg-[var(--bg-highlight)]"
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${
                          item.accent ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{item.text}</p>
                      <p className="text-[11px] text-[var(--text-subdued)]">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="mt-4 flex items-center justify-center gap-1 text-xs font-semibold text-[var(--accent)] transition hover:underline"
              >
                View all activity <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </section>

        </div>
      </div>
    </DashboardShell>
  );
}
