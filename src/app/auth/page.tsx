"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ambil mode & type dari URL
  const initialMode =
    (searchParams.get("mode") as "login" | "register") || "login";
  const initialType =
    (searchParams.get("type") as "customer" | "seller") || "customer";

  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [userType, setUserType] = useState<"customer" | "seller">(initialType);
  const [loading, setLoading] = useState(false);

  // form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // update URL setiap kali mode/type berubah
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("type", userType);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [mode, userType]);

  // LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      toast({
        title: "Login sukses!",
        description: "Selamat datang kembali 👋",
      });

      // redirect sesuai tipe user
      router.push(userType === "seller" ? "/dashboard" : "/");
    } catch (err: any) {
      toast({
        title: "Login gagal",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Password tidak cocok",
        description: "Pastikan konfirmasi password sesuai.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, user_type: userType },
        },
      });
      if (error) throw error;

      toast({
        title: "Akun berhasil dibuat 🎉",
        description: "Cek email kamu untuk verifikasi.",
      });

      router.push(`/auth?mode=login&type=${userType}`);
    } catch (err: any) {
      toast({
        title: "Registrasi gagal",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-lg p-6 border border-border/60 bg-card/90 backdrop-blur-sm">
        <div className="flex justify-center mb-4">
          <MapPin className="h-8 w-8 text-primary" />
        </div>

        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as any)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Daftar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button onClick={handleLogin} disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Masuk"
                  )}
                </Button>
                <Link
                  href="?mode=register"
                  className="text-sm text-primary hover:underline"
                >
                  Belum punya akun?
                </Link>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register">
            <div className="space-y-4">
              <div>
                <Label>Nama Lengkap</Label>
                <Input
                  placeholder="Nama kamu"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Label>Konfirmasi Password</Label>
                <Input
                  type="password"
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button onClick={handleRegister} disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Daftar"
                  )}
                </Button>
                <Link
                  href="?mode=login"
                  className="text-sm text-primary hover:underline"
                >
                  Sudah punya akun?
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// 🧩 Bungkus pakai Suspense biar aman dari error useSearchParams
export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
