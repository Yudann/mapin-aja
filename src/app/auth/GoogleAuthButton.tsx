// src/components/auth/GoogleAuthButton.tsx
"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase/client";

interface GoogleAuthButtonProps {
  userType?: "customer" | "seller";
  redirectTo?: string;
}

export default function GoogleAuthButton({
  userType = "customer",
  redirectTo = "/",
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${
            window.location.origin
          }/api/auth/callback?user_type=${userType}&redirect=${encodeURIComponent(
            redirectTo
          )}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("❌ Google login error:", error);
        alert("Login gagal: " + error.message);
        setIsLoading(false);
      }
      // Don't set loading false on success - user will be redirected
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/20 bg-gradient-to-br from-black/40 to-black/10 px-4 py-4 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:from-black/50 hover:to-black/20 hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
    >
      {isLoading ? (
        <>
          <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="text-base">Menghubungkan...</span>
        </>
      ) : (
        <>
          <div className="relative">
            <FcGoogle className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 rounded-full bg-white/30 blur-sm transition-all duration-300 group-hover:blur-md" />
          </div>
          <span className="text-base transition-all duration-300 group-hover:tracking-wider">
            Continue with Google
          </span>
        </>
      )}

      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/20 via-primary/5 to-accent-mint/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </button>
  );
}
