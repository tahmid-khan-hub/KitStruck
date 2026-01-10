"use client";
import { orders } from "@/types/orders";
import { useState } from "react";
import OrdersSkeleton from "../../components/OrdersTable/OrdersSkeleton";
import Lottie from "react-lottie-player";
import noOrders from "@/public/nodata.json"
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import DashboardTablesPagination from "../../components/DashboardTablesPagination/DashboardTablesPagination";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const LIMIT = 5;

export default function ManageOrders() {
  const [page, setPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  const{data, isLoading} = useQuery({
    queryKey: ["manage-orders", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/admin/manage-orders?page=${page}&limit=${LIMIT}`);

      return res.data;
    }
  })

  const orders: orders[] = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl text-center font-bold mb-11 mt-5">Manage Orders</h1>
      {isLoading ? (
        <OrdersSkeleton rows={LIMIT} />
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Lottie
            animationData={noOrders}
            loop={true}
            className="w-64 h-64"
          />
          <p className="text-gray-500 text-lg mt-4">No orders found.</p>
        </div>
      ) : (
        <OrdersTable Myorders={orders} />
      )}
      {orders.length > 0 && (
        <DashboardTablesPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
