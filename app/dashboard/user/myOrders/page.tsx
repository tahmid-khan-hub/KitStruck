"use client"
import { orders } from "@/types/orders";
import { useEffect, useState } from "react";
import OrdersSkeleton from "./components/OrdersSkeleton";
import OrdersPagination from "./components/OrdersPagination";
import OrdersTable from "./components/OrdersTable";

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
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            {loading ? <OrdersSkeleton rows={LIMIT} /> : <OrdersTable Myorders={orders} />}

            <OrdersPagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
}