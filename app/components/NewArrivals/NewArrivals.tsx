"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { useEffect, useState } from "react";

const NewArrivals = () => {
  const [data, setData] = useState<Jersey[]>([]);

  useEffect(() => {
    fetch("/api/newArrivals", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Jersey[]) => setData(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  return <div>
      <h2 className="text-xl font-bold mb-4">🆕 New Arrivals</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((jersey) => (
          <div key={jersey.jersey_id} className="p-4 border rounded-lg">
            <Image
              src={jersey.image_url}
              alt={jersey.name}
              width={200}
              height={200}
              className="object-cover rounded-md"
            />
            <h3 className="mt-2 font-semibold">{jersey.name}</h3>
            <p className="text-gray-600">${jersey.price}</p>
          </div>
        ))}
      </div>
    </div>;
};

export default NewArrivals;
