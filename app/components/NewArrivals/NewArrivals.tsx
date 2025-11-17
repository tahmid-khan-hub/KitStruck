"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

const NewArrivals = () => {
  const [data, setData] = useState<Jersey[]>([]);

  useEffect(() => {
    fetch("/api/newArrivals", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Jersey[]) => setData(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  return (
    <div className="bg-white">
      <div className="py-24 max-w-[1350px] mx-auto ">
        <h2 className="text-3xl text-center font-bold mb-3">
          New Arrivals
        </h2>
        <p className="text-center text-gray-600 mb-8">Be the first to wear our latest jerseys built for speed and comfort.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((jersey) => (
            <motion.div
              whileHover={{
              scale: 1.02, 
              boxShadow: "0px 0px 20px rgba(0, 123, 255, 0.7)",
              }}
              transition={{ duration: 0.1 }}
              key={jersey.jersey_id}
              className="p-3 border-2 border-gray-200 bg-base-200 rounded-lg flex flex-col justify-between hover:shadow-md transition"
            >
              <Image
                src={jersey.image_url}
                alt={jersey.name}
                width={200}
                height={200}
                className="object-cover rounded-md w-full h-[350px]"
              />
              <div className="mt-4 flex flex-col">
                <h3 className="font-semibold text-lg mb-3">{jersey.name}</h3>
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-gray-800 font-semibold text-lg">
                    ${jersey.price}
                  </p>
                  <Link href={`/jersey-details/${jersey.jersey_id}`}><button className="flex items-center justify-center text-blue-500 p-2 rounded-md hover:bg-blue-50 transition">
                    <FaArrowRightLong />
                  </button></Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
