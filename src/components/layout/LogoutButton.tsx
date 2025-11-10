// src/components/auth/LogoutButton.tsx
"use client";

import { useState } from "react";
import { signOut } from "@/actions/auth";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({
  className,
  children,
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoading} className={className}>
      {isLoading ? "Logging out..." : children || "Logout"}
    </button>
  );
}
