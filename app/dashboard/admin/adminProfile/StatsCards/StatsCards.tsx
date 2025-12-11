"use client";
import { useEffect, useState } from "react";
import StatsSkeleton from "./StatsSkeleton";

type StatsType = {
  totalJerseys: number;
  totalUsers: number;
  totalEarned: number;
};

export default function StatsCards() {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStatsData() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadStatsData();
  }, []);

  if (loading || !stats) return <StatsSkeleton />;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 shadow rounded-xl bg-white">
          <h2 className="text-xl font-semibold">Total Jerseys</h2>
          <p className="text-3xl font-bold">{stats.totalJerseys}</p>
        </div>

        <div className="p-6 shadow rounded-xl bg-white">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="p-6 shadow rounded-xl bg-white">
          <h2 className="text-xl font-semibold">Total Earned</h2>
          <p className="text-3xl font-bold">${stats.totalEarned}</p>
        </div>
      </div>
    </div>
  );
}
