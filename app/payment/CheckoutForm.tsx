"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import UseSweetAlert from "../hooks/UseSweetAlert";

export default function CheckoutForm({
  amount,
  jerseyId,
  clientSecret,
}: {
  amount: number;
  jerseyId: number;
  clientSecret: string;
}) {
  const {errorToast, successToast} = UseSweetAlert();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(!stripe || !elements) {
        setLoading(false);
        return;
    }

    const cardElement = elements.getElement(CardElement);
    if(!cardElement){
        setLoading(false);
        return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card: cardElement },
      }
    );

    if (error) {
      errorToast("Payment failed");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      successToast("Payment successful!");

      await fetch("/api/save-payment", {
        method: "POST",
        body: JSON.stringify({
          payment_id: paymentIntent.id,
          amount: paymentIntent.amount,
          jersey_id: jerseyId,
          status: paymentIntent.status,
        }),
      });
    }
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handlePayment}>
        <CardElement className="p-4 border rounded-lg" />
        <button
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
        >
          {loading ? "Processing..." : `Pay $${amount}`}
        </button>
      </form>
    </div>
  );
}
