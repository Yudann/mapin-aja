"use client";

import { motion } from "framer-motion";
import OverviewCards from "./components/OverviewCards";
import StatsChart from "./components/StatsChart";
import RecentMessages from "./components/RecentMessages";
import ProductsTable from "./components/ProductsTable";

export default function SellerDashboard() {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Selamat datang, Cici Cantiikkk 👋
        </h1>
        <p className="text-gray-600">
          Ini adalah ringkasan aktivitas toko Anda hari ini.
        </p>
      </motion.div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* Charts and Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <StatsChart />
        <RecentMessages />
      </div>

      {/* Products Table */}
      <ProductsTable />
    </div>
  );
}
