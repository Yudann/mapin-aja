// app/dashboard/seller/components/StatsChart.tsx
"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sen", visitors: 24 },
  { day: "Sel", visitors: 31 },
  { day: "Rab", visitors: 19 },
  { day: "Kam", visitors: 45 },
  { day: "Jum", visitors: 52 },
  { day: "Sab", visitors: 38 },
  { day: "Min", visitors: 27 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{`${label}`}</p>
        <p className="text-brown-accent] font-semibold">
          {`Pengunjung: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function StatsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Perjualan Minggu Ini
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-3 h-3 bg-linear-to-r from-brown-accent  to-brown-dark rounded-full"></div>
          <span>Pengunjung Toko</span>
        </div>
      </div>

      <div className="h-[80%]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="visitors"
              radius={[4, 4, 0, 0]}
              fill="url(#visitorGradient)"
            />
            <defs>
              <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3E2C23" />
                <stop offset="100%" stopColor="#B99470" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
