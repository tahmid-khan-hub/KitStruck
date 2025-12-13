"use client"
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JerseyFormSkeleton from "./components/JerseyFormSkeleton";

export default function JerseyForm() {
    const searchParams = useSearchParams();
    const jerseyId = searchParams.get("jerseyId");

    const {data, isLoading} = useQuery({
        queryKey: ["jersey-form", jerseyId],
        queryFn: async () => {
            const res = await fetch(`/api/admin/allJersey/jersey-form?jerseyId=${jerseyId}`)
            if (!res.ok) throw new Error("Failed to fetch orders");
            return res.json();
        },
        enabled: !!jerseyId,
    })
    if (isLoading) return <JerseyFormSkeleton />;

    return (
        <div>
            {data.name}
        </div>
    )
}