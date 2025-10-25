// app/dashboard-seller/page.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Store,
  MapPin,
  Phone,
  Edit,
  Trash2,
  MessageCircle,
} from "lucide-react";
import { UMKM } from "@/types/database";

export default function DashboardSeller() {
  const [user, setUser] = useState<any>(null);
  const [umkms, setUmkms] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUmkm, setEditingUmkm] = useState<UMKM | null>(null);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
    image_url: "",
  });

  useEffect(() => {
    checkUserAndFetchData();
  }, []);

  const checkUserAndFetchData = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth?mode=login");
        return;
      }

      setUser(session.user);

      // Check if user is seller
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (!roles || roles.role !== "seller") {
        toast({
          title: "Akses ditolak",
          description: "Hanya seller yang bisa mengakses dashboard ini",
          variant: "destructive",
        });
        router.push("/");
        return;
      }

      await fetchUmkms();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memuat data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUmkms = async () => {
    const { data, error } = await supabase
      .from("umkm")
      .select("*")
      .eq("owner_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching UMKM:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data UMKM",
        variant: "destructive",
      });
      return;
    }

    setUmkms(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const umkmData = {
        ...formData,
        owner_id: user.id,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      };

      if (editingUmkm) {
        // Update existing UMKM
        const { error } = await supabase
          .from("umkm")
          .update(umkmData)
          .eq("id", editingUmkm.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "UMKM berhasil diperbarui",
        });
      } else {
        // Create new UMKM
        const { error } = await supabase.from("umkm").insert([umkmData]);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "UMKM berhasil ditambahkan",
        });
      }

      setShowForm(false);
      setEditingUmkm(null);
      resetForm();
      await fetchUmkms();
    } catch (error: any) {
      console.error("Error saving UMKM:", error);
      toast({
        title: "Error",
        description: error.message || "Gagal menyimpan UMKM",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (umkm: UMKM) => {
    setEditingUmkm(umkm);
    setFormData({
      name: umkm.name,
      category: umkm.category,
      description: umkm.description || "",
      address: umkm.address || "",
      phone: umkm.phone || "",
      latitude: umkm.latitude?.toString() || "",
      longitude: umkm.longitude?.toString() || "",
      image_url: umkm.image_url || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (umkmId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus UMKM ini?")) return;

    try {
      const { error } = await supabase.from("umkm").delete().eq("id", umkmId);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "UMKM berhasil dihapus",
      });

      await fetchUmkms();
    } catch (error: any) {
      console.error("Error deleting UMKM:", error);
      toast({
        title: "Error",
        description: error.message || "Gagal menghapus UMKM",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      address: "",
      phone: "",
      latitude: "",
      longitude: "",
      image_url: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard Seller
          </h1>
          <p className="text-muted-foreground">Kelola UMKM Anda di sini</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total UMKM</CardTitle>
              <Store className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {umkms.length}
              </div>
              <p className="text-xs text-muted-foreground">UMKM terdaftar</p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktif</CardTitle>
              <MessageCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {umkms.length}
              </div>
              <p className="text-xs text-muted-foreground">Semua aktif</p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pesan</CardTitle>
              <MessageCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground">Pesan baru</p>
            </CardContent>
          </Card>
        </div>

        {/* Add UMKM Button */}
        <div className="mb-6">
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingUmkm(null);
              resetForm();
            }}
            className="linear-warm text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Batal Tambah UMKM" : "Tambah UMKM Baru"}
          </Button>
        </div>

        {/* UMKM Form */}
        {showForm && (
          <Card className="mb-8 bg-background/50 backdrop-blur border-0 shadow-soft">
            <CardHeader>
              <CardTitle>
                {editingUmkm ? "Edit UMKM" : "Tambah UMKM Baru"}
              </CardTitle>
              <CardDescription>
                Isi informasi UMKM Anda dengan lengkap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama UMKM</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Nama usaha Anda"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="Contoh: Makanan, Fashion, dll."
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Deskripsikan usaha Anda"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Alamat lengkap UMKM"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telepon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Nomor telepon"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={(e) =>
                        setFormData({ ...formData, latitude: e.target.value })
                      }
                      placeholder="Koordinat latitude"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={(e) =>
                        setFormData({ ...formData, longitude: e.target.value })
                      }
                      placeholder="Koordinat longitude"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL Gambar</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="linear-warm text-white"
                  >
                    {loading
                      ? "Menyimpan..."
                      : editingUmkm
                      ? "Update UMKM"
                      : "Tambah UMKM"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingUmkm(null);
                      resetForm();
                    }}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* UMKM List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {umkms.map((umkm) => (
            <Card
              key={umkm.id}
              className="bg-background/50 backdrop-blur border-0 shadow-soft hover:shadow-medium transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{umkm.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Store className="h-3 w-3" />
                      {umkm.category}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(umkm)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(umkm.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {umkm.description && (
                  <p className="text-sm text-muted-foreground">
                    {umkm.description}
                  </p>
                )}
                {umkm.address && (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-foreground">{umkm.address}</span>
                  </div>
                )}
                {umkm.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-secondary" />
                    <span className="text-foreground">{umkm.phone}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Dibuat:{" "}
                    {new Date(umkm.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {umkms.length === 0 && !showForm && (
          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft text-center py-12">
            <CardContent>
              <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Belum ada UMKM
              </h3>
              <p className="text-muted-foreground mb-4">
                Mulai dengan menambahkan UMKM pertama Anda
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="linear-warm text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah UMKM Pertama
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
