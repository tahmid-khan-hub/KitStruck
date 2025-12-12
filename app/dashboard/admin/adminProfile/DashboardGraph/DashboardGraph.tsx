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
    { name: "Review", value: data.totalReviews },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-xl my-24 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Admin Overview Graph</h2>
      <div className="mt-12" style={{ width: "100%", height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
