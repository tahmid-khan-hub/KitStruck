"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import UseSweetAlert from "../hooks/UseSweetAlert";
import Lottie from "react-lottie-player";
import PaymentLottie from "@/public/Payment.json"
import { useRouter } from "next/navigation";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

interface SavePaymentPayload {
  payment_id: string;
  order_id: number;
  status: string;
}

export default function CheckoutForm({
  order_id,
  clientSecret
}: {
  order_id: number;
  clientSecret: string;
}) {
  const router = useRouter();
  const { errorToast, successToast } = UseSweetAlert();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  const {mutate: savePaymentMutation, isPending} = useMutation({
    mutationFn: async (payload: SavePaymentPayload) => {
      return axiosSecure.post("/api/payment/save-payment", payload )
    },
    onSuccess: () => {
      successToast("Payment successful!");
      router.push("/dashboard/user/myOrders");
    },
    onError: () => errorToast("Payment save failed"),
  })

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
      savePaymentMutation({
        payment_id: paymentIntent.id,
        order_id,
        status: paymentIntent.status,
      });
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
              {loading || isPending ? "Processing..." : `Pay Now`}
            </button>
          </div></div>
        </div>
      </form>
    </div>
  );
}
