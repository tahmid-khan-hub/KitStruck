"use client";
import ReviewCardSkeleton from "@/app/SkeletonLoading/ReviewCardSkeleton";
import { ReviewInterface } from "@/types/review";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import ReviewCard from "./ReviewCard";

const Review = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReviewInterface[]>([]);

  useEffect(() => {
    fetch("/api/user/review", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: ReviewInterface[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const firstRow = data.slice(0, 5);
  const secondRow = data.slice(5, 10);

  return (
    <div className="bg-white">
      <div className=" py-24 max-w-[1350px] mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">
          What Our Users Say
        </h2>

        <Marquee pauseOnHover speed={50}>
          <div className="flex">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <ReviewCardSkeleton key={i} />
                ))
              : firstRow.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
          </div>
        </Marquee>

        {/* Second row */}
        <Marquee pauseOnHover speed={45} direction="right" className="mt-6">
          <div className="flex">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <ReviewCardSkeleton key={i} />
                ))
              : secondRow.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Review;
