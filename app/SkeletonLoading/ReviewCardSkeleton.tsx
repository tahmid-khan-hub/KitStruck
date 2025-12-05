"use client";
export default function ReviewCardSkeleton() {
  return (
    <div className="bg-white my-5 mr-5 border-2 border-gray-100 shadow-md rounded-xl p-5 w-72 shrink-0 animate-pulse">
      {/* Image + Name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Comment */}
      <div className="space-y-2 mb-3">
        <div className="w-full h-3 bg-gray-300 rounded"></div>
        <div className="w-full h-3 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
      </div>

      {/* Stars */}
      <div className="flex space-x-1">
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
