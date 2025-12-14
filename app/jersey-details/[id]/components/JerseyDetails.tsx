"use client";

import { Jersey } from "@/types/jersey";

const JerseyDetails = ({
  jersey,
  available,
}: {
  jersey: Jersey;
  available: number;
}) => {

  const hasOffer = typeof jersey.offer === "number";
  const discountedPrice = hasOffer ? (jersey.price - (jersey.price * jersey.offer) / 100).toFixed(2) : null;

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{jersey.name}</h1>
        <p>{jersey.team}</p>
        <p className="text-gray-600">Category: {jersey.category}</p>

        {available > 0 ? (
          <p className="w-[88px] border-2 p-1 bg-blue-600 text-white rounded-xl -ml-1">
            <span className="ml-1">Available</span>
          </p>
        ) : (
          <p className="w-[120px] border-2 p-1 bg-gray-600 text-white rounded-xl -ml-1">
            <span className="ml-1">Not Available</span>
          </p>
        )}

        <div className="flex items-center gap-3">
          {hasOffer && (
            <span className="text-gray-400 text-2xl line-through">
              ${jersey.price}
            </span>
          )}

          <span className="text-gray-700">
            Price: <span className="text-2xl font-bold text-blue-600">${hasOffer ? discountedPrice : jersey.price}</span>
          </span>

          {hasOffer && (
            <span className="text-sm font-semibold text-blue-600">
              ({jersey.offer}% OFF)
            </span>
          )}
        </div>

        {jersey.description && (
          <p className="text-gray-700 leading-relaxed">{jersey.description}</p>
        )}
      </div>
    </>
  );
};

export default JerseyDetails;
