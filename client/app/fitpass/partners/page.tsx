"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Partner = {
  id: string;
  name: string;
  city: string;
  type: string;
};

const partnerSeed: Partner[] = [
  { id: "p1", name: "Downtown Gym", city: "Berlin", type: "Gym" },
  { id: "p2", name: "River Club", city: "Munich", type: "Wellness" },
  { id: "p3", name: "Arena Fitness", city: "Hamburg", type: "Gym" },
];

export default function FitpassPartnersPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return partnerSeed;
    return partnerSeed.filter((partner) =>
      [partner.name, partner.city, partner.type].some((value) => value.toLowerCase().includes(text)),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">FitPass Partners</h1>
          <Link href="/fitpass" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back
          </Link>
        </div>

        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Partner discovery endpoint is pending in backend. This page provides ready-to-wire partner discovery UI.
        </p>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search partner or city"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500"
        />

        <section className="grid gap-3 md:grid-cols-2">
          {filtered.map((partner) => (
            <article key={partner.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <h2 className="text-base font-medium text-zinc-900">{partner.name}</h2>
              <p className="mt-1 text-sm text-zinc-600">
                {partner.city} · {partner.type}
              </p>
            </article>
          ))}
          {!filtered.length && <p className="text-sm text-zinc-600">No partners found.</p>}
        </section>
      </main>
    </div>
  );
}
