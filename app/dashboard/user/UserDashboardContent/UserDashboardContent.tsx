"use client";

import { isValidUrl } from "@/app/hooks/isValidUrl";
import { PaymentRow } from "@/types/PaymentRow";
import Image from "next/image";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import noMyOrders from "@/public/No Item Found.json"

interface Props {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
export default function UserDashboardContent({ user }: Props) {
  const [orders, setOrders] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/myOrders/lastOrders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data ?? []);
        setLoading(false);
      });
  }, []);

  const profilePic =
    user?.image && user.image.trim() !== "" && isValidUrl(user.image)
      ? user.image
      : "/default_user.jpg";
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

        {loading ? (
          <div className="animate-pulse space-y-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded w-full mb-7"></div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
                <Lottie
                    animationData={noMyOrders}
                    loop={true}
                    className="w-64 h-64"
                />
                <p className="text-gray-500 text-lg mt-4">No latest orders found</p>
                </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.payment_id}
                className="flex items-center gap-4 border-b border-b-gray-300 pb-4"
              >
                <Image
                  src={order.image_url}
                  alt={order.name}
                  width={60}
                  height={60}
                  className="rounded-md"
                />

                <div className="flex-1">
                  <p className="font-semibold">{order.name}</p>
                  <p className="text-sm text-gray-600">
                    Amount: <span className="text-blue-600 font-semibold">${order.amount}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Order Date: <span className="text-gray-500">{new Date(order.payment_at).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
