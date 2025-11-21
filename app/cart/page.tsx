"use client";
import { CartItem } from "@/types/jersey";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartPage = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setTimeout(() => setCart(storedCart), 0);
    },[])

    const handleRemove = (id: number) => {
        const updatedCart = cart.filter(i => i.jersey_id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    }
    return (
        <div className="max-w-[1350px] mx-auto px-4 md:px-3">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map(item => (
            <div key={item.jersey_id} className="flex items-center gap-4 border p-4 rounded-lg">
              <div className="w-32 h-32 relative">
                <Image src={item.image_url} alt={item.name} fill className="object-cover rounded" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Team: {item.team}</p>
                <p>Category: {item.category}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="font-bold text-lg">Price: ${item.price * item.quantity}</p>
              </div>
              <button
                onClick={()=>handleRemove(item.jersey_id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4 font-bold text-2xl">
            Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </div>
        </div>
      )}
    </div>
    );
};

export default CartPage;