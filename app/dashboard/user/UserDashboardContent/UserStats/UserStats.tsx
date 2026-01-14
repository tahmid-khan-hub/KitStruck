"use client";
import { useQuery } from "@tanstack/react-query";
import { FaTshirt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import UserStatsSkeleton from "./UserStatsSkeleton";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import AnimateOnView from "@/app/hooks/AnimateOnView";

export default function UserStats() {
  const axios = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const res = await axios.get("/api/user/user-stats");
      return res.data;
    },
  });

  if (isLoading) return <UserStatsSkeleton />;
  console.log(data);

  const UserStats = [
    {
      title: "Jerseys",
      value: data.totalJerseys,
      icon: <FaTshirt size={29} />,
      color: "text-blue-500",
    },
    {
      title: "Reviews",
      value: data.totalReviews,
      icon: <FaStar size={29} />,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
      {UserStats.map((stat, index) => (
        <AnimateOnView key={index} direction="scale" delay={index * 0.08}><div
          key={index}
          className="p-6 bg-white/60 backdrop-blur-md rounded-xl shadow flex items-center justify-between hover:shadow-lg hover:shadow-blue-300 transition-shadow duration-300"
        >
        <div className="flex items-center gap-4">
            <div
              className={`p-3 bg-gray-100 rounded-full flex items-center justify-center ${stat.color} border border-gray-400`}
            >
              {stat.icon}
            </div>
          </div>
          <div className="flex flex-col-reverse">
            <h2 className="text-xl font-semibold">{stat.title}</h2>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        </div></AnimateOnView>
      ))}
    </div>
  );
}
