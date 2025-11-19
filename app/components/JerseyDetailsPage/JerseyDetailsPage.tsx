"use client";
import { useEffect, useState } from "react";

interface Jersey {
  jersey_id: number;
  name: string;
  team: string;
  category: "club" | "national" | "retro";
  price: number;
  image_url: string;
  description?: string;
  created_at: string;
  sells_quantity: number;
}

export default function JerseyDetailsPage({ id }: { id: string }) {
  const [jersey, setJersey] = useState<Jersey | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/jersey-details/${id}`, { cache: "no-store" });
        const data = await res.json();
        console.log(data);
        setJersey(data.jersey);
      } catch(error) {
        console.log(error);
      } 
    }
    load();
  }, [id]);

  return (
    <div className="p-10">
      <h2>Jersey ID: {id}</h2>
      <p>Name: {jersey?.name}</p>
    </div>
  );
}
