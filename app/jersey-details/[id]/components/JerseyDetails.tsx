"use client";

import { Jersey } from "@/types/jersey";

const JerseyDetails = ({
  jersey,
  available,
}: {
  jersey: Jersey;
  available: number;
}) => {
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

        <p className="font-semibold text-gray-600">
          Price:{" "}
          <span className="text-2xl font-bold text-blue-600">
            ${jersey.price}
          </span>
        </p>

        {jersey.description && (
          <p className="text-gray-700 leading-relaxed">{jersey.description}</p>
        )}
      </div>
    </>
  );
};

export default JerseyDetails;
