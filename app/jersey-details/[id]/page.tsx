"use client"
import { useEffect } from "react";

export default function JerseyDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params;
  console.log(params);
  useEffect(()=>{
    const res = fetch(`/api/jersey-details/${id}`)
    .then((res) => res.json())
    .then(res => console.log("res ->", res))
    .catch((err) => console.error("Fetch error:", err));
  },[id])

  return (
    <div className="p-10">
      <h2>{id}</h2>
    </div>
  );
}
