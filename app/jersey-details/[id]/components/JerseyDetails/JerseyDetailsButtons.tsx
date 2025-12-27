"use client";

import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { CartItem, Jersey } from "@/types/jersey";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FaShoppingCart } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";

export default function JerseyDetailsButtons({ available, jersey,onBuyNow, }: { available: number; jersey: Jersey; onBuyNow: () => void; }) {
  const { successToast, errorToast } = UseSweetAlert();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleAddToCart = async () => {
    try {
      // Authenticated user server cart
      if (session) {
        const res = await fetch("/api/cart/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jersey_id: jersey.jersey_id,
          }),
        });

        if (!res.ok) throw new Error("Failed to add to cart");
        // React Query cart changed
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
      // LOCAL STORAGE CART
      else {
        const existingCart: CartItem[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        const index = existingCart.findIndex(
          (i) => i.jersey_id === jersey.jersey_id
        );

        if (index !== -1) {
          existingCart[index].quantity += 1;
        } else {
          existingCart.push({ ...jersey, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
        // notify other pages (CartPage)
        window.dispatchEvent(new Event("cart-updated"));
      }
      successToast("Item added to cart!");
    } catch (error) {
      console.error(error);
      errorToast("Failed to add item!");
    }
  };
  return (
    <>
      {available ? (
        <>
          <button
            onClick={onBuyNow}
            className="btns flex items-center w-full justify-center"
          >
            <FaMoneyBillWave size={20} className="mr-2.5" /> Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="border-btn flex items-center w-full justify-center"
          >
            <FaShoppingCart size={20} className="mr-2.5" /> Cart
          </button>
        </>
      ) : (
        <>
          <button className="bg-gray-400 text-white rounded-lg border border-gray-300 flex items-center w-full justify-center cursor-not-allowed ">
            <FaMoneyBillWave size={20} className="mr-2.5" /> Buy Now
          </button>
          <button className="not-allowed-btn flex items-center w-full justify-center cursor-not-allowed">
            <FaShoppingCart size={20} className="mr-2.5" /> Cart
          </button>
        </>
      )}
    </>
  );
}
