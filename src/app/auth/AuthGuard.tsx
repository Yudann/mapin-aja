// src/components/auth/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "customer" | "seller";
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  requiredRole,
  redirectTo = "/auth",
}: AuthGuardProps) {
  const { user, profile, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated
      if (!user) {
        router.push(redirectTo);
        return;
      }

      // Check role if required
      if (requiredRole && profile?.role !== requiredRole) {
        router.push("/dashboard/customer");
        return;
      }

      // Check onboarding for sellers
      if (profile?.role === "seller" && !profile.onboarding_completed) {
        router.push("/onboarding/seller");
        return;
      }
    }
  }, [user, profile, isLoading, requiredRole, redirectTo, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brown-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brown-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  // Not authenticated or wrong role
  if (!user || (requiredRole && profile?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
