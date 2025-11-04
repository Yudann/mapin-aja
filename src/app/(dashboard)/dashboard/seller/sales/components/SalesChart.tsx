// app/dashboard/seller/components/SalesChart.tsx
"use client";

import { motion } from "framer-motion";
import { LineChart, TrendingUp } from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { hour: "08:00", total: 120000 },
  { hour: "10:00", total: 320000 },
  { hour: "12:00", total: 560000 },
  { hour: "14:00", total: 480000 },
  { hour: "16:00", total: 720000 },
  { hour: "18:00", total: 850000 },
  { hour: "20:00", total: 640000 },
];

export default function SalesChart() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-brown-accent to-brown-dark rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-800">
              Penjualan Hari Ini
            </h2>
            <p className="text-sm text-gray-500">Grafik per jam</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brown-light rounded-xl">
          <LineChart className="w-4 h-4 text-brown-from-brown-accent" />
          <span className="text-sm font-bold text-brown-darto-brown-dark">
            Total: Rp 3.690.000
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-80 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={salesData}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearlinear id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B99470" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3E2C23" stopOpacity={0.2} />
              </linearlinear>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="hour"
              stroke="#9ca3af"
              style={{ fontSize: "12px", fontWeight: "600" }}
            />
            <YAxis
              stroke="#9ca3af"
              style={{ fontSize: "12px", fontWeight: "600" }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: number) => [
                formatCurrency(value),
                "Penjualan",
              ]}
              labelStyle={{ fontWeight: "bold", color: "#1f2937" }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#B99470"
              strokeWidth={3}
              fill="url(#colorTotal)"
              dot={{ fill: "#B99470", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: "#3E2C23" }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
