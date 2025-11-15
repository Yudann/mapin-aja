"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  X,
  Upload,
  DollarSign,
  Tag,
  Layers,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  category: string;
  stock: number;
  sold: number;
  created_at: string;
}

// Dummy products data
const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "Espresso Classic",
    description: "Kopi espresso dengan cita rasa bold dan aroma yang kuat",
    price: 25000,
    image_url:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop",
    is_available: true,
    category: "Minuman",
    stock: 50,
    sold: 145,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    name: "Latte Art",
    description: "Latte dengan seni di atasnya, creamy dan lembut",
    price: 35000,
    image_url:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    is_available: true,
    category: "Minuman",
    stock: 45,
    sold: 198,
    created_at: "2024-01-20",
  },
  {
    id: "3",
    name: "Croissant Almond",
    description: "Croissant renyah dengan isian almond yang gurih",
    price: 28000,
    image_url:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
    is_available: true,
    category: "Makanan",
    stock: 30,
    sold: 87,
    created_at: "2024-02-01",
  },
  {
    id: "4",
    name: "Cold Brew",
    description: "Kopi seduh dingin dengan rasa yang smooth",
    price: 32000,
    image_url:
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop",
    is_available: false,
    category: "Minuman",
    stock: 0,
    sold: 65,
    created_at: "2024-02-10",
  },
  {
    id: "5",
    name: "Cappuccino",
    description: "Perpaduan sempurna espresso, susu, dan foam",
    price: 30000,
    image_url:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
    is_available: true,
    category: "Minuman",
    stock: 40,
    sold: 172,
    created_at: "2024-02-15",
  },
  {
    id: "6",
    name: "Matcha Latte",
    description: "Matcha premium dari Jepang dengan susu segar",
    price: 38000,
    image_url:
      "https://images.unsplash.com/photo-1536013564846-9fbd6f65a83a?w=400&h=400&fit=crop",
    is_available: true,
    category: "Minuman",
    stock: 35,
    sold: 132,
    created_at: "2024-02-20",
  },
];

const CATEGORIES = ["Semua", "Minuman", "Makanan", "Snack", "Merchandise"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const stats = {
    total: products.length,
    active: products.filter((p) => p.is_available).length,
    lowStock: products.filter((p) => p.stock < 10).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleProductAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, is_available: !p.is_available } : p
      )
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-brown-dark">Kelola Produk</h1>
          <p className="text-brown-dark/70 mt-2 text-lg">
            Atur dan pantau semua produk Anda
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl hover:shadow-lg transition-all font-bold"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-light rounded-2xl p-5 border-2 border-brown-accent/20 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-black text-brown-dark">{stats.total}</p>
          <p className="text-sm text-brown-dark/60 font-semibold">
            Total Produk
          </p>
        </div>

        <div className="bg-base-light rounded-2xl p-5 border-2 border-brown-accent/20 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-50 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-black text-brown-dark">{stats.active}</p>
          <p className="text-sm text-brown-dark/60 font-semibold">
            Produk Aktif
          </p>
        </div>

        <div className="bg-base-light rounded-2xl p-5 border-2 border-brown-accent/20 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-yellow-50 rounded-xl">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-black text-brown-dark">
            {stats.lowStock}
          </p>
          <p className="text-sm text-brown-dark/60 font-semibold">
            Stok Menipis
          </p>
        </div>

        <div className="bg-base-light rounded-2xl p-5 border-2 border-brown-accent/20 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-red-50 rounded-xl">
              <X className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-black text-brown-dark">
            {stats.outOfStock}
          </p>
          <p className="text-sm text-brown-dark/60 font-semibold">Stok Habis</p>
        </div>
      </div>

      {/* Filters & Actions Bar */}
      <div className="bg-base-light rounded-2xl border-2 border-brown-accent/20 shadow-soft p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-linear-to-r from-brown-dark to-brown-accent text-base-light shadow-md"
                    : "bg-brown-light/50 text-brown-dark hover:bg-brown-accent/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 border-2 border-brown-accent/20 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-brown-accent text-base-light"
                  : "text-brown-dark/60 hover:text-brown-dark"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-brown-accent text-base-light"
                  : "text-brown-dark/60 hover:text-brown-dark"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 pt-4 border-t-2 border-brown-accent/10 flex items-center justify-between">
            <span className="text-sm font-bold text-brown-dark">
              {selectedProducts.length} produk dipilih
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-brown-accent/10 text-brown-accent rounded-xl font-bold text-sm hover:bg-brown-accent/20 transition-all">
                Aktifkan
              </button>
              <button className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all">
                Hapus
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Display */}
      <div className="bg-base-light rounded-2xl border-2 border-brown-accent/20 shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-brown-dark">
            Daftar Produk ({filteredProducts.length})
          </h2>
        </div>

        {viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-base-light border-2 border-brown-accent/20 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-brown-dark/80 via-brown-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="absolute top-3 left-3 w-5 h-5 rounded cursor-pointer z-10"
                  />

                  {/* Stock Badge */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {product.stock === 0 ? (
                      <span className="bg-red-500 text-base-light px-3 py-1 rounded-full text-xs font-bold">
                        Habis
                      </span>
                    ) : product.stock < 10 ? (
                      <span className="bg-yellow-500 text-base-light px-3 py-1 rounded-full text-xs font-bold">
                        Sisa {product.stock}
                      </span>
                    ) : null}

                    {!product.is_available && (
                      <span className="bg-brown-dark/80 backdrop-blur-sm text-base-light px-3 py-1 rounded-full text-xs font-bold">
                        Nonaktif
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleProductAvailability(product.id)}
                        className="flex-1 py-2 bg-base-light text-brown-dark rounded-xl font-bold text-sm hover:bg-brown-light transition-all flex items-center justify-center gap-1"
                      >
                        {product.is_available ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Nonaktifkan
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Aktifkan
                          </>
                        )}
                      </button>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === product.id ? null : product.id
                            )
                          }
                          className="p-2 bg-base-light text-brown-dark rounded-xl hover:bg-brown-light transition-all"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {activeDropdown === product.id && (
                          <div className="absolute bottom-full right-0 mb-2 bg-base-light border-2 border-brown-accent/20 rounded-xl shadow-xl py-2 min-w-[150px] z-20">
                            <button className="w-full px-4 py-2 text-left text-brown-dark hover:bg-brown-light transition-colors flex items-center gap-2 font-medium">
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-medium">
                              <Trash2 className="w-4 h-4" />
                              Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-black text-lg text-brown-dark mb-2 line-clamp-1 group-hover:text-brown-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-brown-dark/70 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-brown-accent">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                    <span className="px-3 py-1 bg-brown-light rounded-full text-xs font-bold text-brown-dark">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-brown-accent/10">
                    <div className="flex items-center gap-1 text-brown-dark/60">
                      <Package className="w-4 h-4" />
                      <span className="text-xs font-semibold">
                        {product.stock} stok
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-brown-dark/60">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-semibold">
                        {product.sold} terjual
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 border-2 border-brown-accent/20 rounded-2xl hover:shadow-md hover:bg-brown-light/20 transition-all"
              >
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleProductSelection(product.id)}
                  className="w-5 h-5 rounded cursor-pointer"
                />

                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-brown-dark">{product.name}</h3>
                  <p className="text-sm text-brown-dark/60 truncate">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-black text-brown-accent">
                      Rp{product.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-brown-dark/60">
                      {product.category}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-bold text-brown-dark">
                      {product.stock}
                    </p>
                    <p className="text-xs text-brown-dark/60">Stok</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-bold text-brown-dark">
                      {product.sold}
                    </p>
                    <p className="text-xs text-brown-dark/60">Terjual</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.is_available ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        Aktif
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                        Nonaktif
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === product.id ? null : product.id
                        )
                      }
                      className="p-2 hover:bg-brown-light rounded-xl transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-brown-dark" />
                    </button>

                    {activeDropdown === product.id && (
                      <div className="absolute right-0 top-full mt-2 bg-base-light border-2 border-brown-accent/20 rounded-xl shadow-xl py-2 min-w-[150px] z-20">
                        <button className="w-full px-4 py-2 text-left text-brown-dark hover:bg-brown-light transition-colors flex items-center gap-2 font-medium">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => toggleProductAvailability(product.id)}
                          className="w-full px-4 py-2 text-left text-brown-dark hover:bg-brown-light transition-colors flex items-center gap-2 font-medium"
                        >
                          {product.is_available ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                          {product.is_available ? "Nonaktifkan" : "Aktifkan"}
                        </button>
                        <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-medium">
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-brown-accent/30 mx-auto mb-4" />
            <h3 className="text-xl font-black text-brown-dark mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-brown-dark/60">
              Coba ubah filter atau tambahkan produk baru
            </p>
          </div>
        )}
      </div>

      {/* Add Product Modal (Simple placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-brown-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-base-light rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-brown-dark">
                Tambah Produk Baru
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-brown-light rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-brown-dark" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-brown-dark mb-2">
                  Nama Produk
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium"
                  placeholder="Contoh: Espresso Classic"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-brown-dark mb-2">
                  Deskripsi
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium resize-none"
                  placeholder="Jelaskan produk Anda..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-brown-dark mb-2">
                    Harga
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
                    <input
                      type="number"
                      className="w-full pl-10 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium"
                      placeholder="25000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-brown-dark mb-2">
                    Stok
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
                    <input
                      type="number"
                      className="w-full pl-10 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium"
                      placeholder="50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-brown-dark mb-2">
                  Kategori
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
                  <select className="w-full pl-10 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium">
                    <option>Minuman</option>
                    <option>Makanan</option>
                    <option>Snack</option>
                    <option>Merchandise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-brown-dark mb-2">
                  Foto Produk
                </label>
                <div className="border-2 border-dashed border-brown-accent/30 rounded-2xl p-8 text-center hover:border-brown-accent/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-brown-accent/50 mx-auto mb-3" />
                  <p className="text-brown-dark font-semibold mb-1">
                    Klik untuk upload foto
                  </p>
                  <p className="text-sm text-brown-dark/60">
                    PNG, JPG hingga 5MB
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border-2 border-brown-accent/30 text-brown-dark rounded-2xl hover:bg-brown-light/50 transition-all font-bold"
              >
                Batal
              </button>
              <button className="flex-1 px-6 py-3 bg-linear-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl hover:shadow-lg transition-all font-bold">
                Simpan Produk
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
