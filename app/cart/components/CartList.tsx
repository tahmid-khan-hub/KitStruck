"use client";
import Image from "next/image";
import { FaTrash } from "react-icons/fa6";
import { CartItem } from "@/types/jersey";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { useState } from "react";
import JerseyPurchaseModal from "@/app/jerseyDetailsModals/JerseyPurchaseModal";
import JerseyLoginModal from "@/app/jerseyDetailsModals/JerseyLoginModal"
import { useSession } from "next-auth/react";

interface Props {
  item: CartItem;
  handleRemove: (id: number) => void;
}

export default function CartList({ item, handleRemove,}: Props) {
  const [openModal, setOpenModal] = useState(false);
  const available = item?.stock - item?.sells_quantity;
  const {data: session} = useSession();

  return (
  <div className="overflow-x-auto">
  <div className="min-w-[750px]"> 
    <div
      key={item.jersey_id}
      className="bg-white flex items-center gap-4 border-2 border-gray-200 p-4 rounded-lg"
    >
      {/* Image */}
      <div className="w-32 h-32 relative">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="object-cover rounded"
        />
      </div>

      {/* item details */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="font-bold text-lg mt-2">Price: ${item.price}</p>
      </div>

      {/* Buy button */}
      <button onClick={() => setOpenModal(true)} className="bg-blue-600 text-xl text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        <PiShoppingCartSimpleFill />
      </button>

      {/* Delete button */}
      <button
        onClick={() => handleRemove(item.jersey_id)}
        className="border border-blue-500 text-xl hover:bg-gray-100 text-black px-4 py-2 rounded-lg"
      >
        <FaTrash />
      </button>
    </div>
  </div>
  {session ? <JerseyPurchaseModal jersey={item} available={available} open={openModal} onClose={() => setOpenModal(false)} /> : 
  <JerseyLoginModal open={openModal} onClose={() => setOpenModal(false)} />}
</div>
  );
}
