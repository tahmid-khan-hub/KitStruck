"use client";
import { CartItem, Jersey } from "@/types/jersey";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";

interface Props {
  jersey: Jersey;
}

export default function JerseyDetailsContainer({ jersey }: Props) {
  const {successToast, errorToast} = UseSweetAlert();
  const available = jersey.stock - jersey.sells_quantity;

  const handleAddToCart = () =>{
    try {
      const exitingCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

      // jersey exist or not
      const index = exitingCart.findIndex(i => i.jersey_id === jersey.jersey_id);
      if(index !== -1){
        exitingCart[index].quantity += 1;
      }else{
        exitingCart.push({...jersey, quantity: 1});
      }

      localStorage.setItem("cart", JSON.stringify(exitingCart));
      successToast("Item added to cart!");
    } catch (error) {
      console.log(error);
      errorToast("Failed to add item!");
    }
  }

  return (
    <div className="py-5 mb-9">
      <h1 className="text-center font-semibold text-3xl mb-4">Jersey Details</h1>
      <p className="text-center text-gray-600 mb-9">This premium jersey delivers comfort, durability and authentic design, giving fans a stylish and reliable choice.</p>
      <AnimatePresence><motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }} transition={{ duration: 0.6, ease: "easeOut" }}  className="bg-white p-4 rounded-lg w-full flex flex-col md:flex-row gap-8 border-2 border-gray-200 shadow-md">
        {/* (IMAGE) */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={jersey.image_url}
              alt={jersey.name}
              fill
              className="object-cover"
              sizes="100%"
            />
          </div>
        </div>

        {/* (DETAILS) */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          {/* CONTENT */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{jersey.name}</h1>

            <p className="">{jersey.team}</p>

            <p className="text-gray-600">Category: {jersey.category}</p>

            {available > 0 ? <p className="w-[88px] border-2 p-1 bg-green-600 hover:bg-green-700 text-white -ml-0.5 pl-2 rounded-xl">Available</p> : <p className="w-[120px] border-2 p-1 bg-red-600 hover:bg-red-700 text-white -ml-0.5 pl-2 rounded-xl">Not Available</p>}

            <p className="text-2xl font-semibold text-green-600">
              Price: ${jersey.price}
            </p>

            {jersey.description && (
              <p className="text-gray-700 leading-relaxed">
                {jersey.description}
              </p>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-6 mt-6">
            {available ? <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg text-lg w-full justify-center hover:bg-green-700">
              <FaMoneyBillWave size={20} /> Buy Now
            </button>: <button className="flex items-center gap-2 bg-gray-300 text-white px-5 py-3 rounded-lg text-lg w-full justify-center cursor-not-allowed">
              <FaMoneyBillWave size={20} /> Buy Now
            </button>}

            <button onClick={handleAddToCart} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg text-lg w-full justify-center hover:bg-blue-700">
              <FaShoppingCart size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </motion.div></AnimatePresence>
    </div>
  );
}
