"use client";
import { useQuery } from "@tanstack/react-query";
import LastOrdersSkeleton from "./LastOrdersSkeleton";
import LastOrdersEmpty from "./LastOrdersEmpty";
import Image from "next/image";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { ordersRow } from "@/types/ordersType";

export default function LastOrders() {
  const axios = useAxiosSecure();
  const { data: orders = [], isLoading } = useQuery<ordersRow[]>({
    queryKey: ["lastOrders"],
    queryFn: async () => {
      const res = await axios.get("/api/myOrders/lastOrders");
      const json = await res.data;
      return json.data ?? [];
    },
  });

  if (isLoading) return <LastOrdersSkeleton />;
  if (orders.length === 0) return <LastOrdersEmpty />;

  return (
    <>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.payment_intent_id}
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
                Amount:{" "}
                <span className="text-blue-600 font-semibold">
                  ${order.total_amount}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Order Date:{" "}
                <span className="text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
