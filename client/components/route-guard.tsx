"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";
import { useAuth } from "../lib/auth-context";

type Props = {
  children: ReactNode;
};

export function RouteGuard({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { authState, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const isAuthRoute = pathname.startsWith("/auth");

    if (!authState && !isAuthRoute) {
      router.replace("/auth/login");
      return;
    }

    if (authState && isAuthRoute) {
      router.replace("/dashboard");
    }
  }, [authState, isReady, pathname, router]);

  return <>{children}</>;
}
