"use client";

import { useState } from "react";
import { AuthRequired } from "../../components/auth-required";
import { LoadingSession } from "../../components/loading-session";
import { ScoutShell } from "../../components/scout-shell";
import { useAuth } from "../../lib/auth-context";

type Highlight = {
  id: string;
  title: string;
  url: string;
  createdAt: string;
};

export default function HighlightsPage() {
  const { authState, isReady } = useAuth();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  if (!isReady) {
    return <LoadingSession />;
  }

  if (!authState) {
    return <AuthRequired title="My Highlights" message="Login is required to manage highlights." />;
  }

  const addHighlight = () => {
    if (!title.trim() || !url.trim()) {
      return;
    }

    setHighlights((prev) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        url: url.trim(),
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setTitle("");
    setUrl("");
  };

  const removeHighlight = (id: string) => {
    setHighlights((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ScoutShell title="My Highlights" subtitle="Add and manage your best short clips.">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="text-sm font-semibold text-slate-200">Add New Highlight (YouTube Short)</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Goals vs Team X"
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
            aria-label="Highlight title"
          />
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://youtube.com/shorts/..."
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
            aria-label="Highlight URL"
          />
        </div>
        <button
          type="button"
          onClick={addHighlight}
          className="mt-3 rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
        >
          Add Highlight
        </button>
      </section>

      <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">Manage Videos</h2>
        <div className="space-y-2">
          {highlights.length ? (
            highlights.map((item) => (
              <article key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-200">{item.title}</p>
                  <p className="truncate text-xs text-slate-400">{item.url}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeHighlight(item.id)}
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-500"
                >
                  Delete
                </button>
              </article>
            ))
          ) : (
            <p className="text-sm text-slate-400">No highlights yet.</p>
          )}
        </div>
      </section>
    </ScoutShell>
  );
}
