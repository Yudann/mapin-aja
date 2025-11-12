// src/components/auth/AuthGuard.tsx
"use client";

import { useEffect, useState } from "react";
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
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated
      if (!user) {
        console.log("🔒 AuthGuard: No user, redirecting to auth");
        router.push(redirectTo);
        return;
      }

      // User authenticated but profile not loaded yet
      if (!profile) {
        console.log("⏳ AuthGuard: Profile not loaded, waiting...");
        // Beri waktu untuk profile dimuat
        const timer = setTimeout(() => {
          window.location.reload();
        }, 2000);
        return () => clearTimeout(timer);
      }

      // Check onboarding for sellers
      if (profile.role === "seller" && !profile.onboarding_completed) {
        console.log("📝 AuthGuard: Seller needs onboarding");
        router.push("/onboarding/seller");
        return;
      }

      // Check role if required
      if (requiredRole && profile.role !== requiredRole) {
        console.log("❌ AuthGuard: Wrong role, redirecting");
        if (profile.role === "seller") {
          router.push("/dashboard/seller");
        } else {
          router.push("/explore");
        }
        return;
      }

      // All checks passed
      setIsAuthorized(true);
    }
  }, [user, profile, isLoading, requiredRole, redirectTo, router]);

  // Show loading state
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-brown-light/20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brown-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brown-dark font-medium">
            {isLoading ? "Memuat..." : "Memverifikasi akses..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
