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
    <div className="grid grid-cols-1 gap-6">
      <div className="p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
        {data?.map((user, i) => (
          <p key={i}>
            👤 {user.name} • {user.email}
          </p>
        ))}
      </div>
    </div>
  );
}
