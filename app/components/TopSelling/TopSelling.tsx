"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CardSkeleton from "@/app/SkeletonLoading/CardSkeleton";
import { isValidUrl } from "@/app/hooks/isValidUrl";

const TopSelling = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Jersey[]>([]);

  useEffect(() => {
    fetch("/api/kitsTruck/topSelling", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Jersey[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div className="my-24 max-w-[1350px] mx-auto">
        <h2 className="text-3xl text-center font-bold mb-3">Top Selling</h2>
        <p className="text-center text-gray-600 mb-8">
          Popular designs that capture team spirit and unbeatable performance in
          every stitch.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : data.map((jersey) => {
                const imgSrc =
                  jersey.image_url &&
                  jersey.image_url.trim() !== "" &&
                  isValidUrl(jersey.image_url)
                    ? jersey.image_url
                    : "/default.png";

                return (
                  <Link
                    key={jersey.jersey_id}
                    href={`/jersey-details/${jersey.jersey_id}`}
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0px 0px 20px rgba(0, 123, 255, 0.7)",
                      }}
                      transition={{ duration: 0.1 }}
                      className="p-3 border-2 border-gray-200 bg-white rounded-lg flex flex-col justify-between hover:shadow-md transition"
                    >
                      <Image
                        src={imgSrc}
                        alt={jersey.name}
                        width={200}
                        height={200}
                        className="object-cover rounded-md w-full h-[350px]"
                      />
                      <p className="mt-5 mb-3 text-[17px] font-semibold">{jersey.name}</p>
                    </motion.div>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default TopSelling;
