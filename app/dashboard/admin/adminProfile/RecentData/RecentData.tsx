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
    <div className="p-6 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow max-w-5xl mx-auto mt-24">
      <h2 className="text-3xl font-semibold mb-9">Recent Users</h2>

      <div className="space-y-4 mb-9">
        {data?.map((user, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-gray-300 hover:bg-blue-100">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="border border-blue-500 rounded-xl bg-blue-500 hover:bg-blue-600 cursor-pointer"><span className="font-semibold text-xs px-2 text-white">NEW</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
