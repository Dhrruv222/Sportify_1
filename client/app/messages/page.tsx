"use client";

import { useState } from "react";
import { AuthRequired } from "../../components/auth-required";
import { LoadingSession } from "../../components/loading-session";
import { PageHeader } from "../../components/page-header";
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
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <PageHeader title="Messages" />

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Messaging backend endpoints are not yet exposed in the current monolith route map.
          This page provides an MVP UI scaffold and local draft state only.
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="mb-2 text-sm font-semibold text-zinc-800">Conversation (UI scaffold)</h2>
          <div className="mb-3 space-y-2">
            {draftMessages.length ? (
              draftMessages.map((message) => (
                <div key={message.id} className="rounded-lg border border-zinc-200 p-3">
                  <p className="text-sm text-zinc-900">{message.text}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {message.fromSelf ? "You" : "Peer"} · {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-600">No messages yet.</p>
            )}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type a message..."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
            <button
              type="button"
              onClick={sendDraftMessage}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              Send
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
