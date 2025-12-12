"use client";
import { FaUsers, FaTshirt, FaDollarSign, FaStar } from "react-icons/fa";
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

  const stats = [
    {
      title: "Jerseys",
      value: data.totalJerseys,
      icon: <FaTshirt size={29} />,
      color: "text-blue-500",
    },
    {
      title: "Users",
      value: data.totalUsers,
      icon: <FaUsers size={29} />,
      color: "text-blue-500",
    },
    {
      title: "Earned",
      value: data.totalEarned,
      icon: <FaDollarSign size={29} />,
      color: "text-blue-500",
      prefix: "$",
    },
    {
      title: "Review",
      value: data.totalReviews,
      icon: <FaStar size={29} />,
      color: "text-blue-500",
    },
  ];

  return (
     <div className="max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 bg-white/60 backdrop-blur-md rounded-xl shadow flex items-center gap-4 hover:shadow-lg hover:shadow-blue-300 transition-shadow duration-300"
        >
          <div className={`p-3 mr-5 bg-gray-100 rounded-full flex items-center justify-center ${stat.color} border border-gray-400`}>
            <span className="">{stat.icon}</span>
          </div>
          <div>
            
            <p className="text-3xl font-bold">
              {stat.prefix ? `${stat.prefix}${stat.value}` : stat.value}
            </p>
            <h2 className="text-xl font-semibold">{stat.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
