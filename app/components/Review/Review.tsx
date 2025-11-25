"use client";
import { ReviewInterface } from "@/types/review";
import { useEffect, useState } from "react";

const Review = () => {
  const [data, setData] = useState<ReviewInterface[]>([]);

  useEffect(() => {
    fetch("/api/review", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: ReviewInterface[]) => setData(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  return <div>{data.length}</div>;
};

export default Review;
