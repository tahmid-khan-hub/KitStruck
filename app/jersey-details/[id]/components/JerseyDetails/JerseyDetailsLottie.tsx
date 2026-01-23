"use client";
import Lottie from "react-lottie-player";
import noMyOrders from "@/public/No Item Found.json";

export default function JerseyDetailsLottie() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Lottie animationData={noMyOrders} loop className="w-64 h-64" />
      <p className="text-gray-500 text-lg mt-4">Jersey not found</p>
    </div>
  );
}
