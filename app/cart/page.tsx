"use client";
import { CartItem } from "@/types/jersey";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UseSweetAlert from "../hooks/UseSweetAlert";
import CartList from "./components/CartList";
import CartSkeleton from "./components/CartSkeleton";
import EmptyCartLottie from "./components/EmptyCartLottie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CartPage = () => {
    const {confirmDelete, errorToast, successToast} = UseSweetAlert();
    const queryClient = useQueryClient(); 
    const { data: session, status } = useSession();
    const [guestCart, setGuestCart] = useState<CartItem[]>([]);
    const axiosSecure = useAxiosSecure();
    // for local storage
    useEffect(() => {
      if(status === "unauthenticated"){
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setGuestCart(storedCart);
      } 
    },[status])

    // set / merge localstorage data to db
    useEffect(() => {
      if (status === "authenticated" && session?.user?.id) {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

        if (storedCart.length > 0) {
          fetch("/api/cart/sync-merge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: storedCart }),
          })
            .then(res => {
              if (res.ok) {
                localStorage.removeItem("cart");
                queryClient.invalidateQueries({ queryKey: ["cart"] });
              }
            })
            .catch(console.error);
        }
      }
    }, [status, session?.user?.id, queryClient])

    const {data: serverCart = [], isLoading} = useQuery<CartItem[]>({
      queryKey: ["cart"],
      queryFn: async () => {
        const res = await axiosSecure.get("/api/cart");
        return res.data;
      },
      enabled: status === "authenticated",
    })

    const cart = status === "authenticated" ? serverCart : guestCart;

    const deleteCartItemMutation = useMutation({
      mutationFn: async (jersey_id: number) => {
        const res = await axiosSecure.delete("/api/cart", {
          data: { jersey_id }, 
        });
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        successToast("Jersey item removed successfully!");
      },
      onError: () => {
        errorToast("Failed to delete the jersey item.");
      },
    });

    const handleRemove = async (id: number) => {
      const ok = await confirmDelete("Do you really want to remove this from the cart?");

      if (!ok) return;

      if(status === "authenticated"){ deleteCartItemMutation.mutate(id); }
      else {
        const updatedCart = guestCart.filter(i => i.jersey_id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setGuestCart(updatedCart);
        successToast("Jersey item removed successfully!");
      }
    };
    
    if (status === "loading" || isLoading || deleteCartItemMutation.isPending) { return <CartSkeleton />;}
    if (cart.length === 0) { return <EmptyCartLottie />; }
    
    return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-3 min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-12 mb-7">Your Cart</h1>
        <div className="flex flex-col gap-4">
          {cart.map(item => (
            <CartList
              key={item.jersey_id} item={item} handleRemove={handleRemove}
            />
          ))}
        </div>
    </div>
    );
};

export default CartPage;