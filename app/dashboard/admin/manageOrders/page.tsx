"use client";
import { orders } from "@/types/orders";
import { useEffect, useState } from "react";
import OrdersSkeleton from "../../components/OrdersTable/OrdersSkeleton";
import Lottie from "react-lottie-player";
import noOrders from "@/public/nodata.json"
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import OrdersPagination from "../../components/OrdersTable/OrdersPagination";

const LIMIT = 5;

export default function ManageOrders() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<orders[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchOrders() {
      setLoading(true);

      const res = await fetch(`/api/admin/manage-orders?page=${page}&limit=${LIMIT}`);
      const data = await res.json();

      if (!ignore) {
        setOrders(data.data ?? []);
        setTotalPages(data.totalPages ?? 1);
        setLoading(false);
      }
    }

    fetchOrders();

    return () => {
      ignore = true;
    };
  }, [page]);

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl text-center font-bold mb-11 mt-5">Manage Orders</h1>
      {loading ? (
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
        <OrdersPagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
