"use client";

import { useState } from "react";
import { AuthRequired } from "../../components/auth-required";
import { LoadingSession } from "../../components/loading-session";
import { ScoutShell } from "../../components/scout-shell";
import { useAuth } from "../../lib/auth-context";

type DraftMessage = {
  id: string;
  text: string;
  createdAt: string;
  fromSelf: boolean;
};

export default function MessagesPage() {
  const { authState, isReady } = useAuth();
  const [input, setInput] = useState("");
  const [draftMessages, setDraftMessages] = useState<DraftMessage[]>([]);

  const sendDraftMessage = () => {
    if (!input.trim()) {
      return;
    }

    setDraftMessages((prev) => [
      {
        id: crypto.randomUUID(),
        text: input.trim(),
        createdAt: new Date().toISOString(),
        fromSelf: true,
      },
      ...prev,
    ]);
    setInput("");
  };

  if (!isReady) {
    return <LoadingSession />;
  }

  if (!authState) {
    return <AuthRequired title="Messages" message="Login is required to access messages." />;
  }

  return (
    <ScoutShell title="Messages" subtitle="Direct messages and conversation history.">
        <section className="rounded-2xl border border-amber-900/40 bg-amber-900/10 p-4 text-sm text-amber-200">
          Messaging backend endpoints are not yet exposed in the current monolith route map.
          This page provides an MVP UI scaffold and local draft state only.
        </section>

        <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="mb-2 text-sm font-semibold text-slate-200">Conversation (UI scaffold)</h2>
          <div className="mb-3 space-y-2">
            {draftMessages.length ? (
              draftMessages.map((message) => (
                <div key={message.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <p className="text-sm text-slate-100">{message.text}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {message.fromSelf ? "You" : "Peer"} · {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No messages yet.</p>
            )}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type a message..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
              aria-label="Message input"
            />
            <button
              type="button"
              onClick={sendDraftMessage}
              className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
            >
              Send
            </button>
          </div>
        </section>
    </ScoutShell>
  );
}
