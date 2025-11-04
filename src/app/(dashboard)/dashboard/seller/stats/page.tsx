"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  ShoppingCart,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  ChevronDown,
  Package,
  Heart,
  MessageCircle,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";

// Sample Data
const revenueData = [
  { month: "Jan", revenue: 4200000, orders: 45, visitors: 1240 },
  { month: "Feb", revenue: 5100000, orders: 58, visitors: 1580 },
  { month: "Mar", revenue: 4800000, orders: 52, visitors: 1420 },
  { month: "Apr", revenue: 6200000, orders: 68, visitors: 1890 },
  { month: "Mei", revenue: 7500000, orders: 82, visitors: 2140 },
  { month: "Jun", revenue: 8900000, orders: 95, visitors: 2560 },
];

const productPerformance = [
  { name: "Espresso", sales: 145, revenue: 3625000, trend: 12 },
  { name: "Latte", sales: 198, revenue: 6930000, trend: 8 },
  { name: "Croissant", sales: 87, revenue: 2436000, trend: -3 },
  { name: "Cappuccino", sales: 172, revenue: 5160000, trend: 15 },
  { name: "Matcha", sales: 132, revenue: 5016000, trend: 22 },
];

const categoryData = [
  { name: "Minuman", value: 65, color: "#3E2C23" },
  { name: "Makanan", value: 25, color: "#B99470" },
  { name: "Snack", value: 10, color: "#FAF3E0" },
];

const customerData = [
  { time: "00:00", customers: 5 },
  { time: "04:00", customers: 8 },
  { time: "08:00", customers: 45 },
  { time: "12:00", customers: 82 },
  { time: "16:00", customers: 65 },
  { time: "20:00", customers: 38 },
  { time: "23:59", customers: 12 },
];

const TIME_PERIODS = ["7 Hari", "30 Hari", "3 Bulan", "1 Tahun"];

export default function StatsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30 Hari");
  const [showFilters, setShowFilters] = useState(false);

  const stats = [
    {
      title: "Total Pendapatan",
      value: "Rp 8.9jt",
      change: "+23.5%",
      isPositive: true,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      detail: "vs bulan lalu",
    },
    {
      title: "Total Pesanan",
      value: "95",
      change: "+12.3%",
      isPositive: true,
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      detail: "pesanan bulan ini",
    },
    {
      title: "Pengunjung Unik",
      value: "2,560",
      change: "+8.1%",
      isPositive: true,
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      detail: "pengunjung baru",
    },
    {
      title: "Rating Rata-rata",
      value: "4.8",
      change: "+0.2",
      isPositive: true,
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      detail: "dari 127 ulasan",
    },
  ];

  const additionalMetrics = [
    {
      label: "Conversion Rate",
      value: "3.7%",
      icon: TrendingUp,
      change: "+0.8%",
      isPositive: true,
    },
    {
      label: "Avg. Order Value",
      value: "Rp 93,684",
      icon: DollarSign,
      change: "+5.2%",
      isPositive: true,
    },
    {
      label: "Repeat Customers",
      value: "42%",
      icon: Users,
      change: "-2.1%",
      isPositive: false,
    },
    {
      label: "Customer Satisfaction",
      value: "96%",
      icon: Heart,
      change: "+3.5%",
      isPositive: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-brown-dark">
            Statistik & Analytics
          </h1>
          <p className="text-brown-dark/70 mt-2 text-lg">
            Pantau performa bisnis Anda secara real-time
          </p>
        </div>

        <div className="flex gap-3">
          {/* Period Selector */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 border-2 border-brown-accent/30 text-brown-dark rounded-2xl hover:bg-brown-light/50 transition-all font-bold"
            >
              <Calendar className="w-5 h-5" />
              {selectedPeriod}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 bg-base-light border-2 border-brown-accent/20 rounded-2xl shadow-xl py-2 min-w-[160px] z-20"
              >
                {TIME_PERIODS.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setShowFilters(false);
                    }}
                    className={`w-full text-left px-4 py-2 font-bold transition-colors ${
                      selectedPeriod === period
                        ? "bg-brown-accent text-base-light"
                        : "text-brown-dark hover:bg-brown-light/50"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl hover:shadow-lg transition-all font-bold">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-light rounded-2xl p-6 border-2 border-brown-accent/20 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <Icon className="w-6 h-6 text-brown-accent" />
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                    stat.isPositive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-brown-dark/60 font-semibold mb-1">
                {stat.title}
              </p>
              <p className="text-3xl font-black text-brown-dark mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-brown-dark/50">{stat.detail}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {additionalMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-base-light rounded-2xl p-4 border-2 border-brown-accent/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-brown-accent" />
                <span className="text-xs font-semibold text-brown-dark/60">
                  {metric.label}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-black text-brown-dark">
                  {metric.value}
                </p>
                <span
                  className={`text-xs font-bold ${
                    metric.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-base-light rounded-2xl p-6 border-2 border-brown-accent/20 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-brown-dark">
                Tren Pendapatan
              </h3>
              <p className="text-sm text-brown-dark/60 mt-1">
                6 bulan terakhir
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3E2C23" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3E2C23" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000000}jt`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "2px solid #B99470",
                  borderRadius: "12px",
                  fontWeight: "bold",
                }}
                formatter={(value: any) =>
                  `Rp ${(value / 1000000).toFixed(1)}jt`
                }
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3E2C23"
                strokeWidth={3}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Trend */}
        <div className="bg-base-light rounded-2xl p-6 border-2 border-brown-accent/20 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-brown-dark">
                Pesanan & Pengunjung
              </h3>
              <p className="text-sm text-brown-dark/60 mt-1">
                Perbandingan bulanan
              </p>
            </div>
            <ShoppingCart className="w-6 h-6 text-blue-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "2px solid #B99470",
                  borderRadius: "12px",
                  fontWeight: "bold",
                }}
              />
              <Legend />
              <Bar
                dataKey="orders"
                fill="#3E2C23"
                radius={[8, 8, 0, 0]}
                name="Pesanan"
              />
              <Bar
                dataKey="visitors"
                fill="#B99470"
                radius={[8, 8, 0, 0]}
                name="Pengunjung"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance */}
        <div className="bg-base-light rounded-2xl p-6 border-2 border-brown-accent/20 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-brown-dark">
                Top 5 Produk
              </h3>
              <p className="text-sm text-brown-dark/60 mt-1">
                Berdasarkan penjualan
              </p>
            </div>
            <Package className="w-6 h-6 text-brown-accent" />
          </div>
          <div className="space-y-4">
            {productPerformance.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-brown-light/30 rounded-xl hover:bg-brown-light/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brown-dark to-brown-accent rounded-xl flex items-center justify-center text-base-light font-black">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-brown-dark">{product.name}</p>
                    <p className="text-xs text-brown-dark/60">
                      {product.sales} terjual
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-brown-accent">
                    Rp {(product.revenue / 1000000).toFixed(1)}jt
                  </p>
                  <div
                    className={`flex items-center gap-1 text-xs font-bold ${
                      product.trend > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.trend > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(product.trend)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-base-light rounded-2xl p-6 border-2 border-brown-accent/20 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-brown-dark">
                Distribusi Kategori
              </h3>
              <p className="text-sm text-brown-dark/60 mt-1">
                Persentase penjualan
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "2px solid #B99470",
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                  formatter={(value: any) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {categoryData.map((category, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: category.color }}
                />
                <p className="text-xs font-bold text-brown-dark">
                  {category.name}
                </p>
                <p className="text-lg font-black text-brown-accent">
                  {category.value}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Activity Timeline */}
      <div className="bg-base-light rounded-2xl p-6 border-2 border-brown-accent/20 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-black text-brown-dark">
              Aktivitas Pelanggan
            </h3>
            <p className="text-sm text-brown-dark/60 mt-1">
              Distribusi waktu kunjungan
            </p>
          </div>
          <Users className="w-6 h-6 text-purple-500" />
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={customerData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "2px solid #B99470",
                borderRadius: "12px",
                fontWeight: "bold",
              }}
            />
            <Line
              type="monotone"
              dataKey="customers"
              stroke="#B99470"
              strokeWidth={3}
              dot={{ fill: "#3E2C23", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
