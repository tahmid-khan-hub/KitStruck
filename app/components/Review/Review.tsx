"use client";
import ReviewCardSkeleton from "@/app/SkeletonLoading/ReviewCardSkeleton";
import { ReviewInterface } from "@/types/review";
import Image from "next/image";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa6";

const Review = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReviewInterface[]>([]);

  useEffect(() => {
    fetch("/api/review", { cache: "no-store" })
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
  return (
    <div className="bg-white"><div className=" py-24 max-w-[1350px] mx-auto">
      <h2 className="text-center text-3xl font-bold mb-8">
        What Our Users Say
      </h2>

      <Marquee pauseOnHover speed={50}>
        <div className="flex">
          {loading ? Array.from({ length: 5 }).map((_, i) => <ReviewCardSkeleton key={i} /> ) : data.map((review, i) => (
            <div
              key={i}
              className="bg-white my-5 mr-5 border-2 border-gray-100 shadow-md rounded-xl p-5 w-72 shrink-0"
            >
              {/* Person */}
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={review.reviewer_image || "/default_user.jpg"}
                  alt="user"
                  width={50}
                  height={50}
                  className="rounded-full border object-cover"
                />
                <div>
                  <p className="font-semibold">{review.reviewer_name}</p>
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-700 text-sm mb-3">{review.comment}</p>

              {/* Rating */}
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </div></div>
  );
};

export default Review;
