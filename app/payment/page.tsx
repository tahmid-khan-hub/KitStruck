"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
    const params = useSearchParams();
    const amount = Number(params.get("amount")); 
    const JerseyId = Number(params.get("jersey_id")); 
    const [clientSecret, setClientSecret] = useState("");
    

}