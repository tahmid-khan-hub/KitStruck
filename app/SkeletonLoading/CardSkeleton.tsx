"use client";
export default function CardSkeleton() {
  return (
    <div className="p-3 border-2 border-gray-200 bg-base-200 rounded-lg animate-pulse">
      {/* Image */}
      <div className="w-full h-[350px] bg-gray-300 rounded-md"></div>
    </div>
  );
}
