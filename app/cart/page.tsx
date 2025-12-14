"use client";
import { CartItem } from "@/types/jersey";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UseSweetAlert from "../hooks/UseSweetAlert";
import CartList from "./components/CartList";
import CartSkeleton from "./components/CartSkeleton";
import EmptyCartLottie from "./components/EmptyCartLottie";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CartPage = () => {
    const {confirmDelete, errorToast, successToast} = UseSweetAlert();
    const queryClient = useQueryClient(); 
    const { data: session, status } = useSession();

    // for local storage
    const [guestCart, setGuestCart] = useState<CartItem[]>([]);
    useEffect(() => {
      if(status === "unauthenticated"){
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setGuestCart(storedCart);
      } 
    },[status])

    const {data: serverCart = [], isLoading} = useQuery<CartItem[]>({
      queryKey: ["cart"],
      queryFn: async () => {
        const res = await fetch("/api/cart");
        if (!res.ok) throw new Error("Failed to fetch cart");
        return res.json();
      },
      enabled: status === "authenticated",
    })

    const cart = status === "authenticated" ? serverCart : guestCart;

    const handleRemove = async (id: number) => {
      const ok = await confirmDelete("Do you really want to remove this from the cart?");

      if (!ok) return;
      const updatedCart = cart.filter(i => i.jersey_id !== id);
      try {
        if (session) {
          const res = await fetch("/api/cart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jersey_id: id })
          });

          if (!res.ok) {
            errorToast("Failed to delete item.");
            return;
          }
          queryClient.invalidateQueries({ queryKey: ["cart"] });

        } else {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setGuestCart(updatedCart); 
        }

        successToast("Item removed successfully!");

      } catch (error) {
        console.log(error);
        errorToast("Something went wrong!");
      }
    };

    const handleIncrease = async (id: number) => {
        const currItem = cart.find(i => i.jersey_id === id);
        if (!currItem) return;

        const updatedCart = cart.map(item => item.jersey_id === id ?
          {...item, quantity: item.quantity + 1} : item
        );
        if(session){
          await fetch("/api/cart", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jersey_id: id, quantity: currItem.quantity + 1 })
          })
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
        else{
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setGuestCart(updatedCart);
        }
    }

    const handleDecrease = async (id: number) => {
        const currItem = cart.find(i => i.jersey_id === id);
        if (!currItem) return;

        const updatedCart = cart.map(item => item.jersey_id === id?
            {...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1} : item
        );
        if(session){
          await fetch("/api/cart", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jersey_id: id, quantity: currItem.quantity - 1 })
          })
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
        else{
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setGuestCart(updatedCart);
        }
    }

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    if (status === "loading" || isLoading) {
      return <CartSkeleton />;
    }

    if (cart.length === 0) {
      return <EmptyCartLottie />;
    }
    return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-3 min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-12 mb-7">Your Cart</h1>
        <div className="flex flex-col gap-4">
          {cart.map(item => (
            <CartList
              key={item.jersey_id}
              item={item} handleIncrease={handleIncrease} handleDecrease={handleDecrease} handleRemove={handleRemove}
            />
          ))}
           <div className="text-right mt-4 font-bold text-2xl">Total: ${totalPrice}</div>
        </div>
    </div>
    );
};

export default CartPage;