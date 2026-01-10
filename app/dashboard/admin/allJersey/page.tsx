"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Lottie from "react-lottie-player";
import noJerseys from "@/public/No Jersey.json"
import JerseysTable from "./components/JerseysTable";
import JerseysTableSkeleton from "./components/JerseysTableSkeleton";
import DashboardTablesPagination from "../../components/DashboardTablesPagination/DashboardTablesPagination";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

const LIMIT = 10;

export default function AllJersey() {
    const [page, setPage] = useState(1);
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["allJersey", page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/admin/allJersey?page=${page}&limit=${LIMIT}`);
            
            return res.data;
        }
    })

    const jerseys = data?.data ?? [];
    const totalPages = data?.totalPages ?? 1;

    if (isLoading) return <JerseysTableSkeleton />;

    return (
        <div>
            {jerseys.length === 0 ? <div className="flex flex-col items-center justify-center py-10">
                <Lottie
                    animationData={noJerseys}
                    loop={true}
                    className="w-64 h-64"
                />
                <p className="text-gray-500 text-lg mt-4">No jerseys found</p>
            </div> : <>
                <h2 className="my-12 text-center font-bold text-3xl">All Jerseys</h2>
                <div className="px-6">
                    <JerseysTable jerseys={jerseys} />
                </div>
            </> }
            {jerseys.length > 0 && 
                <div className="mb-10"><DashboardTablesPagination page={page}
                setPage={setPage}
                totalPages={totalPages} /></div>
            }
        </div>
    )
}