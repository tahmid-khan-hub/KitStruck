"use client";
import { CartItem } from "@/types/jersey";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UseSweetAlert from "../hooks/UseSweetAlert";
import CartList from "./components/CartList";
import Lottie from "react-lottie-player";
import emptyCart from "@/public/Empty Cart.json"
import Link from "next/link";

const CartPage = () => {
    const {confirmDelete, errorToast, successToast} = UseSweetAlert();
    const [cart, setCart] = useState<CartItem[]>([]);
    const { data: session } = useSession();
    useEffect(() => {
        if(!session){
          const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);
        }else{
          fetch("/api/cart")
          .then(res => res.json())
          .then(data => setCart(data))
        }
    },[session])

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
        } else {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        setCart(updatedCart);
        successToast("Item removed successfully!");

      } catch (error) {
        console.log(error);
        errorToast("Something went wrong!");
      }
    };

    const handleIncrease = (id: number) => {
        const currItem = cart.find(i => i.jersey_id === id);
        if (!currItem) return;

        const updatedCart = cart.map(item => item.jersey_id === id ?
            {...item, quantity: item.quantity + 1} : item
        );
        if(session){
          fetch("/api/cart", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jersey_id: id, quantity: currItem.quantity + 1 })
          })
        }
        else{
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        setCart(updatedCart);
    }

    const handleDecrease = (id: number) => {
        const currItem = cart.find(i => i.jersey_id === id);
        if (!currItem) return;

        const updatedCart = cart.map(item => item.jersey_id === id?
            {...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1} : item
        );
        if(session){
          fetch("/api/cart", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jersey_id: id, quantity: currItem.quantity - 1 })
          })
        }
        else{
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        setCart(updatedCart);
    }

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart === null) {
      return (
        <div className="h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      );
    }
    return (
        <div className="max-w-[1350px] mx-auto px-4 md:px-3 min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-12 mb-7">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="min-h-screen"><Lottie play loop animationData={emptyCart} className="w-[250px] max-w-md mx-auto"
          /><p className="text-center text-gray-500 text-xl font-semibold mt-5">Cart is empty</p>
          <p className="text-center text-gray-500 text-xl font-semibold mt-5">Visit the <Link href={"/jerseys"}><span className="text-blue-600 hover:underline">Jerseys</span></Link> page to add jersey in the cart</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map(item => (
            <CartList
              key={item.jersey_id}
              item={item} handleIncrease={handleIncrease} handleDecrease={handleDecrease} handleRemove={handleRemove}
            />
          ))}
           <div className="text-right mt-4 font-bold text-2xl">Total: ${totalPrice}</div>
        </div>
      )}
    </div>
    );
};

export default CartPage;