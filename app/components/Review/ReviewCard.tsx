"use client"
import { ReviewInterface } from "@/types/review";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

const ReviewCard = ({ review }: { review: ReviewInterface }) => {
    return (
        <div className="bg-white my-5 mr-5 border-2 border-gray-100 shadow-md rounded-xl p-5 w-72 shrink-0">
    <div className="flex items-center gap-3 mb-3">
      <Image
        src={review.reviewer_image || "/default_user.jpg"}
        alt="user"
        width={50}
        height={50}
        className="rounded-full border object-cover w-12 h-12"
      />
      <p className="font-semibold">{review.reviewer_name}</p>
    </div>

    <p className="text-gray-700 text-sm mb-3">{review.comment}</p>

    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  </div>
    );
};

export default ReviewCard;
