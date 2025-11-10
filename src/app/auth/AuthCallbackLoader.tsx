// components/auth/AuthCallbackLoader.tsx
export default function AuthCallbackLoader({ status }: { status: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brown-light">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brown-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-[#5A4D41] mb-2">{status}</h2>
        <p className="text-[#6B7280]">Harap tunggu...</p>
      </div>
    </div>
  );
}
