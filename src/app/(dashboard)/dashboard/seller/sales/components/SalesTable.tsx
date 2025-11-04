// app/dashboard/seller/components/SalesTable.tsx
"use client";

import { motion } from "framer-motion";
import { Receipt, CheckCircle, Clock, XCircle } from "lucide-react";

const transactionsData = [
  {
    id: "1",
    time: "09:45",
    customer: "Rina Susanti",
    product: "Es Kopi Susu",
    total: "Rp 18.000",
    status: "selesai",
  },
  {
    id: "2",
    time: "10:30",
    customer: "Andi Wijaya",
    product: "Roti Pisang",
    total: "Rp 25.000",
    status: "proses",
  },
  {
    id: "3",
    time: "11:10",
    customer: "Siti Aminah",
    product: "Kopi Tubruk",
    total: "Rp 15.000",
    status: "batal",
  },
  {
    id: "4",
    time: "12:20",
    customer: "Dedi Kurniawan",
    product: "Latte 2x",
    total: "Rp 40.000",
    status: "selesai",
  },
  {
    id: "5",
    time: "13:15",
    customer: "Maya Putri",
    product: "Cappuccino + Croissant",
    total: "Rp 48.000",
    status: "selesai",
  },
  {
    id: "6",
    time: "14:00",
    customer: "Budi Santoso",
    product: "Americano",
    total: "Rp 22.000",
    status: "proses",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "selesai":
      return {
        icon: CheckCircle,
        text: "Selesai",
        className: "bg-green-100 text-green-700 border-green-200",
      };
    case "proses":
      return {
        icon: Clock,
        text: "Diproses",
        className: "bg-orange-100 text-orange-700 border-orange-200",
      };
    case "batal":
      return {
        icon: XCircle,
        text: "Dibatalkan",
        className: "bg-red-100 text-red-700 border-red-200",
      };
    default:
      return {
        icon: Clock,
        text: "Unknown",
        className: "bg-gray-100 text-gray-700 border-gray-200",
      };
  }
};

export default function SalesTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <Receipt className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-800">
            Transaksi Hari Ini
          </h2>
          <p className="text-sm text-gray-500">
            {transactionsData.length} pesanan
          </p>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">
                Jam
              </th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">
                Pelanggan
              </th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">
                Produk
              </th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">
                Total
              </th>
              <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((transaction, index) => {
              const statusBadge = getStatusBadge(transaction.status);
              const StatusIcon = statusBadge.icon;
              return (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-gray-800">
                      {transaction.time}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-gray-800">
                      {transaction.customer}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {transaction.product}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold text-[#B99470]">
                      {transaction.total}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusBadge.className}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusBadge.text}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {transactionsData.map((transaction, index) => {
          const statusBadge = getStatusBadge(transaction.status);
          const StatusIcon = statusBadge.icon;
          return (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 border-2 border-gray-100 rounded-xl hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-800">
                  {transaction.customer}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {transaction.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {transaction.product}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#B99470]">
                  {transaction.total}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusBadge.className}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {statusBadge.text}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
