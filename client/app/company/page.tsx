"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthRequired } from "../../components/auth-required";
import { LoadingSession } from "../../components/loading-session";
import { PageHeader } from "../../components/page-header";
import { apiClient } from "../../lib/api-client";
import { useAuth } from "../../lib/auth-context";

const addEmployeeSchema = z.object({
  email: z.email("Enter a valid employee email"),
  planCode: z.string().min(1, "Plan code is required"),
});

type AddEmployeeValues = z.infer<typeof addEmployeeSchema>;

type EmployeeRow = {
  id: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
  plan: {
    id: string;
    code: string;
    name: string;
  };
};

type EmployeesResponse = {
  success: boolean;
  data: {
    items: EmployeeRow[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  };
};

type AddEmployeeResponse = {
  success: boolean;
};

async function fetchEmployees(accessToken: string) {
  const response = await apiClient.get<EmployeesResponse>("/api/v1/company/employees", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

async function addEmployee(accessToken: string, values: AddEmployeeValues) {
  const response = await apiClient.post<AddEmployeeResponse>("/api/v1/company/employees", values, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export default function CompanyPage() {
  const { authState, isReady } = useAuth();

  const form = useForm<AddEmployeeValues>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      email: "",
      planCode: "digital",
    },
  });

  const employeesQuery = useQuery({
    queryKey: ["company-employees", authState?.user.id],
    queryFn: () => fetchEmployees(authState!.accessToken),
    enabled: Boolean(authState?.accessToken),
  });

  const addEmployeeMutation = useMutation({
    mutationFn: (values: AddEmployeeValues) => addEmployee(authState!.accessToken, values),
    onSuccess: async () => {
      form.reset({ email: "", planCode: "digital" });
      await employeesQuery.refetch();
    },
  });

  if (!isReady) {
    return <LoadingSession />;
  }

  if (!authState) {
    return <AuthRequired title="Company Portal" message="You need to login before accessing company routes." />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <PageHeader title="Company Employees" />

        <form
          onSubmit={form.handleSubmit((values) => addEmployeeMutation.mutate(values))}
          className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 md:grid-cols-3"
        >
          <div className="md:col-span-2">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700">
              Employee email
            </label>
            <input
              id="email"
              {...form.register("email")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="planCode" className="mb-1 block text-sm font-medium text-zinc-700">
              Plan code
            </label>
            <input
              id="planCode"
              {...form.register("planCode")}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
            {form.formState.errors.planCode && (
              <p className="mt-1 text-xs text-red-600">{form.formState.errors.planCode.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={addEmployeeMutation.isPending}
            className="md:col-span-3 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {addEmployeeMutation.isPending ? "Adding employee..." : "Add employee"}
          </button>

          {addEmployeeMutation.isError && (
            <p className="md:col-span-3 text-xs text-red-600">
              Failed to add employee. Ensure your account has COMPANY role and a Company profile.
            </p>
          )}
        </form>

        <section className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-zinc-800">Employee list</h2>

          {employeesQuery.isLoading && <p className="text-sm text-zinc-600">Loading employees...</p>}

          {employeesQuery.isError && (
            <p className="text-sm text-red-600">
              Could not load employees. Make sure the logged-in user has a COMPANY profile.
            </p>
          )}

          {!employeesQuery.isLoading && !employeesQuery.isError && (
            <div className="space-y-2">
              {employeesQuery.data?.items.length ? (
                employeesQuery.data.items.map((row) => (
                  <div key={row.id} className="rounded-lg border border-zinc-200 p-3">
                    <p className="text-sm font-medium text-zinc-900">{row.user.email}</p>
                    <p className="text-xs text-zinc-500">
                      Role: {row.user.role} · Plan: {row.plan.code}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-600">No employees yet.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
