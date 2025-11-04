"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function SellerLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChatPage = pathname.includes("/chat");

  return (
    <div className="flex min-h-screen w-full bg-linear-to-br from-white to-brown-light/20">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main
          className={`flex-1 ${
            isChatPage ? "relative overflow-hidden" : "p-6 overflow-auto"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
