"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Lottie from "react-lottie-player";
import noJerseys from "@/public/No Jersey.json"
import JerseysTable from "./components/JerseysTable";
import JerseysPagination from "./components/JerseysPagination";

const LIMIT = 10;

export default function AllJersey() {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["allJersey", page],
        queryFn: async () => {
            const res = await fetch(`/api/admin/allJersey?page=${page}&limit=${LIMIT}`)
            if (!res.ok) throw new Error("Failed to fetch orders");
            return res.json();
        }
    })

    const jerseys = data?.data ?? [];
    const totalPages = data?.totalPages ?? 1;

    if (isLoading) return <p>Loading orders...</p>;

    return (
        <div>
            {jerseys.length === 0 ? <div className="flex flex-col items-center justify-center py-10">
                <Lottie
                    animationData={noJerseys}
                    loop={true}
                    className="w-64 h-64"
                />
                <p className="text-gray-500 text-lg mt-4">No jerseys found</p>
            </div> : <JerseysTable /> }
            {jerseys.length > 0 && 
                <JerseysPagination />
            }
        </div>
    )
}