"use client";
import Image from "next/image";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { CartItem } from "@/types/jersey";

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
        <p>Team: {item.team}</p>
        <p>Category: {item.category}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleDecrease(item.jersey_id)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            <FaMinus />
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            onClick={() => handleIncrease(item.jersey_id)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            <FaPlus />
          </button>
        </div>
        <p className="font-bold text-lg">
          Price: ${item.price * item.quantity}
        </p>
      </div>
      <button
        onClick={() => handleRemove(item.jersey_id)}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        <FaTrash />
      </button>
    </div>
  );
}
