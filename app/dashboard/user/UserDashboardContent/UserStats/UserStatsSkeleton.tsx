"use client";

export default function UserStatsSkeleton() {
  // Show 2 skeleton cards (like your grid)
  return (
    <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="p-6 bg-white/30 backdrop-blur-md rounded-xl shadow animate-pulse flex items-center justify-between"
        >
          {/* Left side: icon */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-200 rounded-full w-12 h-12 border border-gray-300"></div>
          </div>

          {/* Right side: title + value */}
          <div className="flex flex-col-reverse gap-2">
            {/* Title */}
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
            {/* Value */}
            <div className="h-7 w-8 ml-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
