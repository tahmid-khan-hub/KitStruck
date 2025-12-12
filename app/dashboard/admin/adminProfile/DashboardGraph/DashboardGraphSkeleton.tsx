"use client";

export default function DashboardGraphSkeleton() {
  return (
    <div className="p-6 bg-white/60 backdrop-blur-md border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Admin Overview Graph</h2>

      <div className="flex justify-center items-center">
        {/* Circle skeleton */}
        <div className="relative w-64 h-64 animate-pulse">
          {/* Outer faded circle */}
          <div className="absolute inset-0 rounded-full bg-gray-300/50"></div>

          {/* Donut inner cut */}
          <div className="absolute inset-8 rounded-full bg-white/60"></div>

          {/* Random slices to mimic segments */}
          <div className="absolute top-0 left-1/2 w-20 h-5 bg-gray-300 rounded-full transform -translate-x-1/2"></div>
          <div className="absolute right-0 top-1/2 w-16 h-5 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-1/3 w-14 h-5 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Legend skeleton */}
      <div className="flex justify-center gap-6 mt-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
