"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
    const params = useSearchParams();
    const amount = Number(params.get("amount")); 
    const JerseyId = Number(params.get("jersey_id")); 
    const [clientSecret, setClientSecret] = useState("");
    
    useEffect(()=>{
        fetch("/api/payment/payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount, JerseyId,
            }),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    },[amount, JerseyId]);

    if (!clientSecret) return <p>Loading payment...</p>;

    return(
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm amount={amount} jerseyId={JerseyId} clientSecret={clientSecret}></CheckoutForm>
        </Elements>
    )
}