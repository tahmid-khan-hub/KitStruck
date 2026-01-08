"use client"
import { useState } from "react";
import Lottie from "react-lottie-player";
import noMyOrders from "@/public/No Item Found.json"
import Link from "next/link";
import OrdersSkeleton from "../../components/OrdersTable/OrdersSkeleton";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import DashboardTablesPagination from "../../components/DashboardTablesPagination/DashboardTablesPagination";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const LIMIT = 5;

export default function MyOrdersPage() {
    const [page, setPage] = useState(1);
    const axiosSecure = useAxiosSecure();
    
    const {data, isLoading} = useQuery({
        queryKey: ['myOrders', page],
        queryFn: async() => {
            const res = await axiosSecure.get(`/api/user/myOrders?page=${page}&limit=${LIMIT}`)
            return res.data;
        }
    })

    const orders = data?.data ?? [];
    const totalPages = data?.totalPages ?? 1;

     return (
        <div className="w-full p-6">
            <h1 className="text-3xl text-center font-bold mt-3 mb-11">My Orders</h1>
            {isLoading ? (
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
                <DashboardTablesPagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                />
            )}
        </div>
    );
}