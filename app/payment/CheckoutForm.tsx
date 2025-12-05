"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import UseSweetAlert from "../hooks/UseSweetAlert";
import Lottie from "react-lottie-player";
import PaymentLottie from "@/public/Payment.json"

export default function CheckoutForm({
  amount,
  jerseyId,
  clientSecret,
  quantity,
}: {
  amount: number;
  jerseyId: number;
  clientSecret: string;
  quantity: number;
}) {
  const { errorToast, successToast } = UseSweetAlert();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
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

      await fetch("/api/payment/save-payment", {
        method: "POST",
        body: JSON.stringify({
          payment_id: paymentIntent.id,
          amount: amount,
          jersey_id: jerseyId,
          quantity: quantity,
          status: paymentIntent.status,
        }),
      });

      try {
        if (jerseyId) {
          // User paid for ONE ITEM → remove only that item
          await fetch("/api/cart", {
            method: "DELETE",
            body: JSON.stringify({ jersey_id: jerseyId }),
          });
        } else {
          // User paid from full cart → clear all
          await fetch("/api/cart", { method: "DELETE" });
        }
      } catch (err) {
        console.log("Cart clear error:", err);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handlePayment}>
        <div className="min-h-screen">
          <h2 className="text-center text-3xl font-bold mt-11">Payment Form</h2>
          <div className="mb-5"><Lottie play loop animationData={PaymentLottie} className="w-[250px] max-w-md mx-auto"
          /></div>
          <div className="px-2"><div className="max-w-[550px] mx-auto bg-white border border-gray-300 shadow-md hover:shadow-lg rounded-lg p-4 ">
            <CardElement className="p-4 mt-2.5 border rounded-xl" />
            <button
              disabled={!stripe || loading}
              className="btns mt-7 mb-3 px-6 py-3 w-full"
            >
              {loading ? "Processing..." : `Pay $${amount}`}
            </button>
          </div></div>
        </div>
      </form>
    </div>
  );
}
