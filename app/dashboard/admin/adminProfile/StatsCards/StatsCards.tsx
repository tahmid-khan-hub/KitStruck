"use client";
import StatsSkeleton from "./StatsSkeleton";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function StatsCards() {
  const axiosSecure = useAxiosSecure();

  const {data, isLoading} = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/stats")
      return res.data;
    }
  })

  if (isLoading) return <StatsSkeleton />;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <div className="p-6 shadow rounded-xl bg-white">
          <h2 className="text-xl font-semibold">Total Jerseys</h2>
          <p className="text-3xl font-bold">{data.totalJerseys}</p>
        </div>

        <div className="p-6 shadow rounded-xl bg-white">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">{data.totalUsers}</p>
        </div>

        <div className="p-6 shadow rounded-xl bg-white">
          <h2 className="text-xl font-semibold">Total Earned</h2>
          <p className="text-3xl font-bold">${data.totalEarned}</p>
        </div>
      </div>
    </div>
  );
}
