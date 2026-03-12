"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiClient } from "../../lib/api-client";

const filterSchema = z.object({
  locale: z.string().max(10, "Locale must be at most 10 characters").transform((value) => value.trim()),
});

type FilterValues = z.infer<typeof filterSchema>;

type NewsArticle = {
  id: string;
  title: string;
  summary?: string | null;
  source?: string | null;
  locale: string;
  publishedAt: string;
};

type NewsListResponse = {
  items: NewsArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

async function fetchNews(locale: string): Promise<NewsListResponse> {
  const params = locale ? { locale } : undefined;
  const response = await apiClient.get<ApiResponse<NewsListResponse>>("/api/v1/news", { params });
  return response.data.data;
}

export default function NewsPage() {
  const [activeLocale, setActiveLocale] = useState("");

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      locale: "",
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news-list", activeLocale],
    queryFn: () => fetchNews(activeLocale),
  });

  const onSubmit = (values: FilterValues) => {
    setActiveLocale(values.locale);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">News Feed</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back
          </Link>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 md:flex-row md:items-end"
        >
          <div className="w-full">
            <label htmlFor="locale" className="mb-1 block text-sm font-medium text-zinc-700">
              Locale filter
            </label>
            <input
              id="locale"
              placeholder="en"
              {...form.register("locale")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
            {form.formState.errors.locale && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.locale.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Apply
          </button>
        </form>

        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl border border-zinc-200 bg-white"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to load news feed.
            <br />
            {(error as Error)?.message}
          </div>
        )}

        {!isLoading && !isError && (
          <section className="space-y-3">
            {data?.items.map((article) => (
              <article key={article.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                <h2 className="text-base font-medium text-zinc-900">{article.title}</h2>
                <p className="mt-1 text-sm text-zinc-600">{article.summary ?? "No summary"}</p>
                <div className="mt-2 flex gap-3 text-xs text-zinc-500">
                  <span>{article.locale}</span>
                  <span>{new Date(article.publishedAt).toLocaleString()}</span>
                  {article.source && <span>{article.source}</span>}
                </div>
              </article>
            ))}
            {!data?.items.length && (
              <p className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
                No articles found.
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
