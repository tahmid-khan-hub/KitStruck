"use client";
import { isValidUrl } from "@/app/hooks/isValidUrl";
import Image from "next/image";
import LastOrders from "./LastOrders/LastOrders";

interface Props {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
export default function UserDashboardContent({ user }: Props) {

  const profilePic = user?.image && user.image.trim() !== "" && isValidUrl(user.image) ? user.image : "/default_user.jpg";

  return (
    <div>
      {/* USER CARD */}
      <div className="p-6 mt-6 text-center">
        <Image
          src={profilePic}
          alt="User"
          width={80}
          height={80}
          className="rounded-full mx-auto mb-4 object-cover"
        />

        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* LAST 3 ORDER */}
      <div className="p-6 mt-24 border-t-2 border-t-gray-300">
        <h3 className="text-3xl font-bold mb-10 mt-11">Last 3 Orders</h3>
          <LastOrders />
      </div>
    </div>
  );
}
