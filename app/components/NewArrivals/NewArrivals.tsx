"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

const NewArrivals = () => {
  const [data, setData] = useState<Jersey[]>([]);

  useEffect(() => {
    fetch("/api/newArrivals", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Jersey[]) => setData(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((jersey) => (
          <div
            key={jersey.jersey_id}
            className="p-3 border rounded-lg flex flex-col justify-between hover:shadow-md transition"
          >
            <Image
              src={jersey.image_url}
              alt={jersey.name}
              width={200}
              height={200}
              className="object-cover rounded-md w-full h-[350px]"
            />
            <div className="mt-4">
              <h3 className="font-semibold text-lg">{jersey.name}</h3>
              <p className="text-gray-600">${jersey.price}</p>
            </div>
            <div className="mt-8 flex justify-between items-center gap-3">
              <button className="flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                <MdOutlinePayment />
                <span>Buy</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
