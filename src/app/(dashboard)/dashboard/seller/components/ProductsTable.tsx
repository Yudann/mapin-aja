// app/dashboard/seller/components/ProductsTable.tsx
"use client";

import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Kue Ulang Tahun Chocolate",
    price: "Rp 250.000",
    status: "Aktif",
    image: "/cake-1.jpg",
  },
  {
    id: 2,
    name: "Kue Red Velvet Premium",
    price: "Rp 350.000",
    status: "Aktif",
    image: "/cake-2.jpg",
  },
  {
    id: 3,
    name: "Cupcake Variant Pack",
    price: "Rp 120.000",
    status: "Nonaktif",
    image: "/cake-3.jpg",
  },
];

export default function ProductsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Produk Saya</h2>
        <button className="flex items-center space-x-2 bg-brown-dark text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5">
          <Plus className="w-4 h-4" />
          <span>Tambah Produk</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 font-semibold text-gray-900">
                Gambar
              </th>
              <th className="text-left py-4 font-semibold text-gray-900">
                Nama Produk
              </th>
              <th className="text-left py-4 font-semibold text-gray-900">
                Harga
              </th>
              <th className="text-left py-4 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left py-4 font-semibold text-gray-900">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brown-light] to-brown-accent] rounded-lg flex items-center justify-center">
                    <span className="text-xs font-semibold text-brown-dark">
                      KUE
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <p className="font-medium text-gray-900">{product.name}</p>
                </td>
                <td className="py-4">
                  <p className="text-gray-900 font-semibold">{product.price}</p>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === "Aktif"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-brown-accent] hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
