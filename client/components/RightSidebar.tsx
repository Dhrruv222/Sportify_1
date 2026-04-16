"use client";

import { useEffect, useState } from "react";
import { QrCode, CreditCard, MessageCircle } from "lucide-react";
import { getConversations, getFitpassQr } from "@/lib/api";
import type { Conversation, FitpassQr } from "@/types";

export default function RightSidebar() {
  const [qr, setQr] = useState<FitpassQr | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [qrError, setQrError] = useState(false);
  const [convError, setConvError] = useState(false);

  useEffect(() => {
    getFitpassQr()
      .then(setQr)
      .catch(() => setQrError(true));

    getConversations()
      .then(setConversations)
      .catch(() => setConvError(true));
  }, []);

  return (
    <aside className="fixed right-0 top-0 z-30 flex h-screen w-[var(--right-sidebar-width)] flex-col gap-4 overflow-y-auto border-l border-[var(--border)] bg-[var(--bg-base)] p-4 pt-[calc(var(--header-height)+16px)]">
      {/* ── FIT-Pass QR Card ── */}
      <div className="rounded-xl bg-[var(--bg-surface)] p-5 border border-[var(--border)]">
        <div className="flex items-center gap-2 mb-4">
          <QrCode className="h-5 w-5 text-[var(--accent)]" />
          <h3 className="text-sm font-semibold text-white">FIT-Pass</h3>
        </div>

        {qrError ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="h-28 w-28 rounded-lg bg-[var(--bg-highlight)] flex items-center justify-center">
              <QrCode className="h-12 w-12 text-[var(--text-subdued)]" />
            </div>
            <p className="text-xs text-[var(--text-subdued)] text-center">
              Subscribe to a plan to get your QR code
            </p>
          </div>
        ) : qr ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={qr.qrCodeUrl}
              alt="FIT-Pass QR Code"
              className="h-28 w-28 rounded-lg bg-white p-1"
            />
            <div className="text-center">
              <p className="text-xs font-medium text-[var(--accent)]">
                {qr.planName}
              </p>
              <p className="text-[11px] text-[var(--text-subdued)]">
                Expires{" "}
                {new Date(qr.expiresAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-6">
            <div className="h-28 w-28 animate-pulse rounded-lg bg-[var(--bg-highlight)]" />
          </div>
        )}
      </div>

      {/* ── Subscription Status Card ── */}
      <div className="rounded-xl bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-elevated)] p-5 border border-[var(--border)]">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="h-5 w-5 text-[var(--accent)]" />
          <h3 className="text-sm font-semibold text-white">Subscription</h3>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-white">Free</span>
          <span className="text-xs text-[var(--text-subdued)]">plan</span>
        </div>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          Upgrade to Pro for advanced analytics
        </p>
        <button className="mt-4 w-full rounded-full bg-[var(--accent)] py-2 text-xs font-semibold text-black hover:bg-[var(--accent-hover)] transition-colors">
          Upgrade Plan
        </button>
      </div>

      {/* ── Recent Chats ── */}
      <div className="rounded-xl bg-[var(--bg-surface)] p-5 border border-[var(--border)] flex-1 min-h-0">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-5 w-5 text-[var(--accent)]" />
          <h3 className="text-sm font-semibold text-white">Recent Chats</h3>
        </div>

        {convError ? (
          <p className="text-xs text-[var(--text-subdued)]">
            Sign in to see your messages
          </p>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <MessageCircle className="h-8 w-8 text-[var(--text-subdued)]" />
            <p className="text-xs text-[var(--text-subdued)] text-center">
              No conversations yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {conversations.slice(0, 5).map((conv) => (
              <a
                key={conv.id}
                href={`/messages/${conv.recipientId}`}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-[var(--bg-highlight)] transition-colors"
              >
                {conv.recipientAvatar ? (
                  <img
                    src={conv.recipientAvatar}
                    alt={conv.recipientName}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--bg-highlight)] text-xs font-bold text-[var(--text-secondary)]">
                    {conv.recipientName.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white truncate">
                      {conv.recipientName}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span className="ml-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-black">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--text-subdued)] truncate">
                    {conv.lastMessage ?? "No messages yet"}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
