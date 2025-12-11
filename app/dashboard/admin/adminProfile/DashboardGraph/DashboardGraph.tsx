"use client";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
import DashboardGraphSkeleton from "./DashboardGraphSkeleton";

export default function DashboardGraph() {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <DashboardGraphSkeleton />;

  const chartData = [
    { name: "Jerseys", value: data.totalJerseys },
    { name: "Users", value: data.totalUsers },
    { name: "Earned", value: data.totalEarned },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-xl h-[500px]">
      <h2 className="text-xl font-semibold mb-4">Admin Overview Graph</h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
