"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiClient } from "../../lib/api-client";
import { useAuth } from "../../lib/auth-context";

const subscribeSchema = z.object({
  planCode: z.string().min(1, "Plan code is required"),
});

const checkinSchema = z.object({
  qrValue: z.string().min(1, "QR value is required"),
  partnerId: z.string().min(1, "Partner id is required"),
});

type SubscribeValues = z.infer<typeof subscribeSchema>;
type CheckinValues = z.infer<typeof checkinSchema>;

type FitpassPlan = {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  priceCents: number;
  currency: string;
  durationDays: number;
  features?: string[];
  isActive: boolean;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

async function fetchPlans(): Promise<FitpassPlan[]> {
  const response = await apiClient.get<ApiResponse<FitpassPlan[]>>("/api/v1/fitpass/plans");
  return response.data.data;
}

async function fetchMyQr(userId: string) {
  const response = await apiClient.get<ApiResponse<{ qrImageUrl: string; qrValue: string; validTo: string }>>(
    "/api/v1/fitpass/me/qr",
    {
      headers: {
        "x-user-id": userId,
      },
    },
  );
  return response.data.data;
}

async function subscribeToPlan(userId: string, values: SubscribeValues) {
  const response = await apiClient.post("/api/v1/fitpass/subscribe", values, {
    headers: {
      "x-user-id": userId,
    },
  });
  return response.data;
}

async function checkin(values: CheckinValues) {
  const response = await apiClient.post("/api/v1/fitpass/checkin", values);
  return response.data;
}

function formatPrice(priceCents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(priceCents / 100);
}

export default function FitpassPage() {
  const { authState, isReady } = useAuth();

  const subscribeForm = useForm<SubscribeValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      planCode: "digital",
    },
  });

  const checkinForm = useForm<CheckinValues>({
    resolver: zodResolver(checkinSchema),
    defaultValues: {
      qrValue: "",
      partnerId: "partner-smoke",
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fitpass-plans"],
    queryFn: fetchPlans,
  });

  const qrQuery = useQuery({
    queryKey: ["fitpass-my-qr", authState?.user.id],
    queryFn: () => fetchMyQr(authState!.user.id),
    enabled: Boolean(authState?.user.id),
  });

  const subscribeMutation = useMutation({
    mutationFn: (values: SubscribeValues) => subscribeToPlan(authState!.user.id, values),
    onSuccess: async () => {
      await qrQuery.refetch();
    },
  });

  const checkinMutation = useMutation({
    mutationFn: checkin,
  });

  if (!isReady) {
    return <div className="p-6 text-sm text-zinc-600">Loading session...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">FitPass Plans</h1>
          <div className="flex items-center gap-3">
            <Link href="/fitpass/bookings" className="text-sm text-zinc-600 hover:text-zinc-900">
              Bookings
            </Link>
            <Link href="/fitpass/partners" className="text-sm text-zinc-600 hover:text-zinc-900">
              Partners
            </Link>
            {!authState && (
              <Link href="/auth/login" className="text-sm text-zinc-600 hover:text-zinc-900">
                Login
              </Link>
            )}
            <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
              Back
            </Link>
          </div>
        </div>

        {authState && (
          <section className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-4 md:grid-cols-2">
            <form className="space-y-3" onSubmit={subscribeForm.handleSubmit((values) => subscribeMutation.mutate(values))}>
              <h2 className="text-base font-medium text-zinc-900">Subscribe to plan</h2>
              <input
                {...subscribeForm.register("planCode")}
                placeholder="digital"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
              />
              {subscribeForm.formState.errors.planCode && (
                <p className="text-xs text-red-600">{subscribeForm.formState.errors.planCode.message}</p>
              )}
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </button>
              {subscribeMutation.isError && (
                <p className="text-xs text-red-600">Subscription failed. Check plan code.</p>
              )}
            </form>

            <div className="space-y-3">
              <h2 className="text-base font-medium text-zinc-900">My QR</h2>
              {qrQuery.isLoading && <p className="text-sm text-zinc-600">Loading QR...</p>}
              {qrQuery.isError && (
                <p className="text-xs text-zinc-600">
                  No active subscription yet. Subscribe first to generate QR.
                </p>
              )}
              {qrQuery.data && (
                <div className="rounded-lg border border-zinc-200 p-3 text-sm">
                  <p className="font-medium text-zinc-900">QR Value</p>
                  <p className="break-all text-zinc-600">{qrQuery.data.qrValue}</p>
                  <p className="mt-2 text-xs text-zinc-500">
                    Valid to: {new Date(qrQuery.data.validTo).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {authState && (
          <form
            onSubmit={checkinForm.handleSubmit((values) => checkinMutation.mutate(values))}
            className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 md:grid-cols-3"
          >
            <input
              {...checkinForm.register("qrValue")}
              placeholder="fitpass_xxx"
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
            <input
              {...checkinForm.register("partnerId")}
              placeholder="partner id"
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
            <button
              type="submit"
              disabled={checkinMutation.isPending}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkinMutation.isPending ? "Checking in..." : "Check-in"}
            </button>
            {checkinForm.formState.errors.qrValue && (
              <p className="md:col-span-3 text-xs text-red-600">{checkinForm.formState.errors.qrValue.message}</p>
            )}
            {checkinMutation.isError && (
              <p className="md:col-span-3 text-xs text-red-600">Check-in failed. Validate QR and partner id.</p>
            )}
            {checkinMutation.isSuccess && (
              <p className="md:col-span-3 text-xs text-green-700">Check-in accepted.</p>
            )}
          </form>
        )}

        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-xl border border-zinc-200 bg-white"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to load FitPass plans.
            <br />
            {(error as Error)?.message}
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid gap-4 md:grid-cols-2">
            {data?.map((plan) => (
              <article
                key={plan.id}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-zinc-900">{plan.name}</h2>
                  <span className="text-sm text-zinc-500">{plan.code}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-600">{plan.description ?? "No description"}</p>
                <p className="mt-4 text-xl font-semibold text-zinc-900">
                  {formatPrice(plan.priceCents, plan.currency)}
                </p>
                <p className="text-sm text-zinc-500">{plan.durationDays} days</p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
