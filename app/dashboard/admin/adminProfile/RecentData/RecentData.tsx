"use client"
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import RecentDataSkeleton from "./RecentDataSkeleton";
import { DBUser } from "@/types/db";

export default function RecentData() {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery<DBUser[]>({
    queryKey: ["admin-recent-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/recent/users");
      return res.data;
    },
  });

  if (isLoading) return <RecentDataSkeleton />;

  return (
    <div className="p-6 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow">
      <h2 className="text-3xl font-semibold mb-9">Recent Users</h2>

      <div className="space-y-4 mb-9">
        {data?.map((user, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-white/50 rounded-lg border">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <span className="text-xs text-gray-400">NEW</span>
          </div>
        ))}
      </div>
    </div>
  );
}
