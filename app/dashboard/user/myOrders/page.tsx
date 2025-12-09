"use client"
import { orders } from "@/types/orders";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import noMyOrders from "@/public/No Item Found.json"
import Link from "next/link";
import OrdersSkeleton from "../../components/OrdersTable/OrdersSkeleton";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import OrdersPagination from "../../components/OrdersTable/OrdersPagination";

const LIMIT = 5;

export default function MyOrdersPage() {
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState<orders[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        let ignore = false;

        async function fetchOrders() {
        setLoading(true);

        const res = await fetch(`/api/myOrders?page=${page}&limit=${LIMIT}`);
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
            <h1 className="text-3xl text-center font-bold mb-6">My Orders</h1>
            {loading ? (
                <OrdersSkeleton rows={LIMIT} />
            ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                <Lottie
                    animationData={noMyOrders}
                    loop={true}
                    className="w-64 h-64"
                />
                <p className="text-gray-500 text-lg mt-4">No My orders found</p>
                <p className="text-gray-500 text-lg mt-5">Want to buy jerseys? Please visit <Link href={"/jerseys"}><span className="text-blue-600 hover:underline">jerseys</span> page</Link></p>
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