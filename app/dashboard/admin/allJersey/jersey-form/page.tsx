"use client"
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JerseyFormSkeleton from "./components/JerseyFormSkeleton";
import JerseyForm from "./components/JerseyForm";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

export default function JerseyFormPage() {
    const searchParams = useSearchParams();
    const jerseyId = searchParams.get("jerseyId");
    const axiosSecure = useAxiosSecure();

    const {data, isLoading} = useQuery({
        queryKey: ["jersey-form", jerseyId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/admin/allJersey/jersey-form?jerseyId=${jerseyId}`);

            return res.data;
        },
        enabled: !!jerseyId,
    })
    
    if (isLoading) return <JerseyFormSkeleton />;

    return (
        <div>
            <h2 className="my-12 text-center font-bold text-3xl">Jersey Form</h2>
            <JerseyForm jerseyData={data}/>
        </div>
    )
}