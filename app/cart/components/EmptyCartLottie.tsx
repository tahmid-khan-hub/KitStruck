"use client";

import Link from "next/link";
import Lottie from "react-lottie-player";
import emptyCart from "@/public/Empty Cart.json"

export default function EmptyCartLottie() {
  return (
    <div className="min-h-screen">
      <Lottie
        play
        loop
        animationData={emptyCart}
        className="w-[250px] max-w-md mx-auto"
      />
      <p className="text-center text-gray-500 text-xl font-semibold mt-5">
        Cart is empty
      </p>
      <p className="text-center text-gray-500 text-xl font-semibold mt-5">
        Visit the{" "}
        <Link href={"/jerseys"}>
          <span className="text-blue-600 hover:underline">Jerseys</span>
        </Link>{" "}
        page to add jersey in the cart
      </p>
    </div>
  );
}
