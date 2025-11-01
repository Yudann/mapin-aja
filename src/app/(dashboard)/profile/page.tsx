// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Phone, Save, Edit } from "lucide-react";
import { Profile } from "@/types/database";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    avatar_url: "",
  });

  useEffect(() => {
    checkUserAndFetchProfile();
  }, []);

  const checkUserAndFetchProfile = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth?mode=login");
        return;
      }

      setUser(session.user);
      await fetchProfile(session.user.id);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memuat profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data profil",
        variant: "destructive",
      });
      return;
    }

    setProfile(data);
    setFormData({
      full_name: data.full_name || "",
      phone: data.phone || "",
      avatar_url: data.avatar_url || "",
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Profil berhasil diperbarui",
      });

      setIsEditing(false);
      await fetchProfile(user.id);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Gagal memperbarui profil",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        avatar_url: profile.avatar_url || "",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brown-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-dark mx-auto"></div>
          <p className="mt-4 text-brown-dark">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-light text-brown-dark">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brown-dark mb-2">
            Profil Saya
          </h1>
          <p className="text-brown-accent">Kelola informasi profil Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="lg:col-span-2 bg-white/70 border border-brown-accent/30 shadow-md">
            <CardHeader className="border-b border-brown-accent/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-brown-dark">
                  Informasi Profil
                </CardTitle>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="border-brown-accent text-brown-dark hover:bg-brown-accent hover:text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
              <CardDescription className="text-brown-accent">
                Informasi pribadi dan kontak Anda
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-brown-dark">
                      Email
                    </Label>
                    <div className="flex items-center gap-2 p-2 border rounded-md bg-brown-light/40 border-brown-accent/20">
                      <Mail className="h-4 w-4 text-brown-accent" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                    <p className="text-xs text-brown-accent">
                      Email tidak dapat diubah
                    </p>
                  </div>

                  {/* Nama Lengkap */}
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-brown-dark">
                      Nama Lengkap
                    </Label>
                    {isEditing ? (
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            full_name: e.target.value,
                          })
                        }
                        placeholder="Masukkan nama lengkap Anda"
                        className="border-brown-accent/40 focus:border-brown-accent"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 border rounded-md bg-brown-light/40 border-brown-accent/20">
                        <User className="h-4 w-4 text-brown-accent" />
                        <span className="text-sm">
                          {profile?.full_name || "Belum diisi"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Nomor Telepon */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-brown-dark">
                      Nomor Telepon
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="Masukkan nomor telepon Anda"
                        className="border-brown-accent/40 focus:border-brown-accent"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 border rounded-md bg-brown-light/40 border-brown-accent/20">
                        <Phone className="h-4 w-4 text-brown-accent" />
                        <span className="text-sm">
                          {profile?.phone || "Belum diisi"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* URL Foto Profil */}
                  <div className="space-y-2">
                    <Label htmlFor="avatar_url" className="text-brown-dark">
                      URL Foto Profil
                    </Label>
                    {isEditing ? (
                      <Input
                        id="avatar_url"
                        value={formData.avatar_url}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            avatar_url: e.target.value,
                          })
                        }
                        placeholder="https://example.com/avatar.jpg"
                        className="border-brown-accent/40 focus:border-brown-accent"
                      />
                    ) : (
                      <div className="text-sm text-brown-accent p-2 bg-brown-light/40 border border-brown-accent/20 rounded-md">
                        {profile?.avatar_url || "Belum ada foto profil"}
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="bg-brown-accent hover:bg-brown-dark text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="border-brown-accent text-brown-dark hover:bg-brown-accent hover:text-white"
                    >
                      Batal
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/70 border border-brown-accent/30 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-brown-dark">
                  Info Akun
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-brown-dark">
                <div>
                  <p className="text-sm font-medium text-brown-accent">
                    Status Akun
                  </p>
                  <p className="font-semibold">Aktif</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-brown-accent">
                    Bergabung
                  </p>
                  <p>
                    {profile
                      ? new Date(profile.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-brown-accent">
                    Terakhir Diupdate
                  </p>
                  <p>
                    {profile
                      ? new Date(profile.updated_at).toLocaleDateString("id-ID")
                      : "-"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/70 border border-brown-accent/30 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-brown-dark">
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-brown-accent text-brown-dark hover:bg-brown-accent hover:text-white"
                  asChild
                >
                  <Link href="/umkm">Lihat UMKM Lain</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-brown-accent text-brown-dark hover:bg-brown-accent hover:text-white"
                  asChild
                >
                  <Link href="/">Kembali ke Beranda</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
