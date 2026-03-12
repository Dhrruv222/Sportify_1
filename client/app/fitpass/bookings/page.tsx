"use client";

import Link from "next/link";
import { useState } from "react";

type BookingSlot = {
  id: string;
  label: string;
  time: string;
  location: string;
};

const slots: BookingSlot[] = [
  { id: "1", label: "Strength Session", time: "08:30", location: "Downtown Gym" },
  { id: "2", label: "Cardio Class", time: "11:00", location: "River Club" },
  { id: "3", label: "Mobility Session", time: "17:30", location: "Arena Fitness" },
];

export default function FitpassBookingsPage() {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">FitPass Bookings</h1>
          <Link href="/fitpass" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back
          </Link>
        </div>

        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Booking API contract is pending in backend. This UI is prepared as MVP booking flow scaffold.
        </p>

        <section className="space-y-3">
          {slots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              onClick={() => setSelectedSlotId(slot.id)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selectedSlotId === slot.id
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300"
              }`}
            >
              <h2 className="text-sm font-semibold">{slot.label}</h2>
              <p className="mt-1 text-xs opacity-80">
                {slot.time} · {slot.location}
              </p>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}
