// src/app/(dashboard)/dashboard/seller/chat/layout.tsx
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="absolute inset-0 flex flex-col">{children}</div>;
}
