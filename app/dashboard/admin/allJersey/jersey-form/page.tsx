"use client"
import { useSearchParams } from "next/navigation";

export default function JerseyForm() {
    const searchParams = useSearchParams();
    const jerseyId = searchParams.get("jerseyId");

    return (
        <div>
            form
        </div>
    )
}