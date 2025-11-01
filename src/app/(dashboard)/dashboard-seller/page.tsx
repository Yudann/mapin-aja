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
      <div className="min-h-screen bg-linear-to-br from-brown-light/50 via-base-light to-brown-light/80 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-accent mx-auto"></div>
          <p className="mt-4 text-brown-dark/70">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-brown-light/50 via-base-light to-brown-light/80">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brown-dark mb-2">
            Dashboard Seller
          </h1>
          <p className="text-brown-dark/70">Kelola UMKM Anda di sini</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brown-dark">
                Total UMKM
              </CardTitle>
              {/* Icon: brown-accent */}
              <Store className="h-4 w-4 text-brown-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brown-dark">
                {umkms.length}
              </div>
              <p className="text-xs text-brown-dark/70">UMKM terdaftar</p>
            </CardContent>
          </Card>

          <Card className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brown-dark">
                Aktif
              </CardTitle>
              {/* Icon: brown-dark */}
              <MessageCircle className="h-4 w-4 text-brown-dark" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brown-dark">
                {umkms.length}
              </div>
              <p className="text-xs text-brown-dark/70">Semua aktif</p>
            </CardContent>
          </Card>

          <Card className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brown-dark">
                Pesan
              </CardTitle>
              {/* Icon: brown-light (untuk kontras yang berbeda) */}
              <MessageCircle className="h-4 w-4 text-brown-light" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brown-dark">0</div>
              <p className="text-xs text-brown-dark/70">Pesan baru</p>
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
            // Button utama: bg-brown-accent, text-white
            className="bg-brown-accent hover:bg-brown-accent/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Batal Tambah UMKM" : "Tambah UMKM Baru"}
          </Button>
        </div>

        {/* UMKM Form */}
        {showForm && (
          // Card: bg-base-light/70, border brown-accent/50, shadow-md
          <Card className="mb-8 bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md">
            <CardHeader>
              <CardTitle className="text-brown-dark">
                {editingUmkm ? "Edit UMKM" : "Tambah UMKM Baru"}
              </CardTitle>
              <CardDescription className="text-brown-dark/70">
                Isi informasi UMKM Anda dengan lengkap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {/* Label: brown-dark */}
                    <Label htmlFor="name" className="text-brown-dark">
                      Nama UMKM
                    </Label>
                    {/* Input (Diasumsikan komponen Input sudah disesuaikan) */}
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
                    {/* Label: brown-dark */}
                    <Label htmlFor="category" className="text-brown-dark">
                      Kategori
                    </Label>
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
                  {/* Label: brown-dark */}
                  <Label htmlFor="description" className="text-brown-dark">
                    Deskripsi
                  </Label>
                  {/* Textarea (Diasumsikan komponen Textarea sudah disesuaikan) */}
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
                  {/* Label: brown-dark */}
                  <Label htmlFor="address" className="text-brown-dark">
                    Alamat
                  </Label>
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
                    {/* Label: brown-dark */}
                    <Label htmlFor="phone" className="text-brown-dark">
                      Telepon
                    </Label>
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
                    {/* Label: brown-dark */}
                    <Label htmlFor="latitude" className="text-brown-dark">
                      Latitude
                    </Label>
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
                    {/* Label: brown-dark */}
                    <Label htmlFor="longitude" className="text-brown-dark">
                      Longitude
                    </Label>
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
                  {/* Label: brown-dark */}
                  <Label htmlFor="image_url" className="text-brown-dark">
                    URL Gambar
                  </Label>
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
                    // Button utama: bg-brown-accent, text-white
                    className="bg-brown-accent hover:bg-brown-accent/90 text-white"
                  >
                    {loading
                      ? "Menyimpan..."
                      : editingUmkm
                      ? "Update UMKM"
                      : "Tambah UMKM"}
                  </Button>
                  {/* Button Outline (sudah diubah di komponen Button) */}
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
            // Card: bg-base-light/70, border brown-accent/50, shadow-md
            <Card
              key={umkm.id}
              className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-brown-dark">
                      {umkm.name}
                    </CardTitle>
                    {/* Card Description: brown-dark/70 */}
                    <CardDescription className="flex items-center gap-1 mt-1 text-brown-dark/70">
                      <Store className="h-3 w-3" />
                      {umkm.category}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    {/* Button Outline Edit */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(umkm)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    {/* Button Outline Delete */}
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
                  // Text: brown-dark/70
                  <p className="text-sm text-brown-dark/70">
                    {umkm.description}
                  </p>
                )}
                {umkm.address && (
                  <div className="flex items-start gap-2 text-sm">
                    {/* Icon: brown-accent */}
                    <MapPin className="h-4 w-4 text-brown-accent mt-0.5" />
                    {/* Text: brown-dark */}
                    <span className="text-brown-dark">{umkm.address}</span>
                  </div>
                )}
                {umkm.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    {/* Icon: brown-dark */}
                    <Phone className="h-4 w-4 text-brown-dark" />
                    {/* Text: brown-dark */}
                    <span className="text-brown-dark">{umkm.phone}</span>
                  </div>
                )}
                {/* Separator: border brown-accent/30 */}
                <div className="pt-2 border-t border-brown-accent/30">
                  {/* Text: brown-dark/70 */}
                  <p className="text-xs text-brown-dark/70">
                    Dibuat:{" "}
                    {new Date(umkm.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {umkms.length === 0 && !showForm && (
          // Card: bg-base-light/70, border brown-accent/50, shadow-md
          <Card className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md text-center py-12">
            <CardContent>
              {/* Icon: brown-dark/70 */}
              <Store className="h-12 w-12 text-brown-dark/70 mx-auto mb-4" />
              {/* Text: brown-dark */}
              <h3 className="text-lg font-semibold text-brown-dark mb-2">
                Belum ada UMKM
              </h3>
              {/* Text: brown-dark/70 */}
              <p className="text-brown-dark/70 mb-4">
                Mulai dengan menambahkan UMKM pertama Anda
              </p>
              {/* Button utama: bg-brown-accent, text-white */}
              <Button
                onClick={() => setShowForm(true)}
                className="bg-brown-accent hover:bg-brown-accent/90 text-white"
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
