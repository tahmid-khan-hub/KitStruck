"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function CartSync() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (localCart.length > 0) {
        fetch("/api/cart/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItems: localCart }),
        }).then(() => {
          localStorage.removeItem("cart");
        });
      }
    }
  }, [session]);

  return null;
}
