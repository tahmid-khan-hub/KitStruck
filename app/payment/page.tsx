"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import PaymentSkeleton from "../SkeletonLoading/PaymentSkeleton";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
    const params = useSearchParams();
    const order_id_params = params.get("order_id");
    const order_id = Number(order_id_params)
    const [clientSecret, setClientSecret] = useState("");
    
    useEffect(()=>{
        if(!order_id) return;
        fetch("/api/payment/payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: Number(order_id) }),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    },[order_id]);

    if (!clientSecret) return <PaymentSkeleton />;

    return(
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm order_id={order_id} clientSecret={clientSecret}></CheckoutForm>
        </Elements>
    )
}