"use client";
import Image from "next/image";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { CartItem } from "@/types/jersey";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Link from "next/link";

interface Props {
  item: CartItem;
  handleIncrease: (id: number) => void;
  handleDecrease: (id: number) => void;
  handleRemove: (id: number) => void;
}

export default function CartList({
  item,
  handleIncrease,
  handleDecrease,
  handleRemove,
}: Props) {
  return (
    <div
      key={item.jersey_id}
      className="bg-white flex items-center gap-4 border-2 border-gray-200 p-4 rounded-lg"
    >
      <div className="w-32 h-32 relative">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          
          <button
            onClick={() => {
              if (item.quantity > 1) handleDecrease(item.jersey_id);
            }}
            disabled={item.quantity === 1}
            className={`px-2 py-1 rounded border 
              ${item.quantity === 1 
                ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed" 
                : "bg-white hover:bg-blue-500 hover:text-white text-blue-500 border-blue-500"
              }`}
          >
            <FaMinus />
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            onClick={() => handleIncrease(item.jersey_id)}
            className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 border border-blue-500 px-2 py-1 rounded"
          >
            <FaPlus />
          </button>
        </div>
        <p className="font-bold text-lg mt-2">
          Price: ${item.price * item.quantity}
        </p>
      </div>
      <Link href={`/payment?amount=${item.price * item.quantity}&jersey_id=${item.jersey_id}&qty=${item.quantity}`}><button
        className="bg-blue-600 text-xl text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        <PiShoppingCartSimpleFill />
      </button></Link>
      <button
        onClick={() => handleRemove(item.jersey_id)}
        className="border border-blue-500 text-xl hover:bg-gray-100 text-black px-4 py-2 rounded-lg "
      >
        <FaTrash />
      </button>
    </div>
  );
}
