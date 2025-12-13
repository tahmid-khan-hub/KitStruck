"use client";
import { useQuery } from "@tanstack/react-query";

export default function UserStats() {
  const { data, isLoading, } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const res = await fetch("/api/user-stats");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  if (isLoading) return <p>loading</p>;

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      
    </div>
  );
}
