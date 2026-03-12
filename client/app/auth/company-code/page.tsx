"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  companyCode: z.string().min(3, "Company code is required"),
});

type Values = z.infer<typeof schema>;

export default function CompanyCodePage() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyCode: "",
    },
  });

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900">Company Code</h1>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Back
          </Link>
        </div>

        <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Backend endpoint for company code validation is not yet exposed in the current monolith.
          This UI is ready and can be wired as soon as endpoint contract is added.
        </p>

        <form className="space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
          <div>
            <label htmlFor="companyCode" className="mb-1 block text-sm font-medium text-zinc-700">
              Company code
            </label>
            <input
              id="companyCode"
              {...form.register("companyCode")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
              placeholder="ABC123"
            />
            {form.formState.errors.companyCode && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.companyCode.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Validate Code
          </button>
        </form>
      </main>
    </div>
  );
}
