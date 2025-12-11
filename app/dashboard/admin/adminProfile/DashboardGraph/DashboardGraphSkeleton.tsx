"use client";

export default function DashboardGraphSkeleton() {
  return (
    <div className="p-6 bg-white shadow rounded-xl w-full h-[400px] animate-pulse">
      {/* Title */}
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>

      {/* Chart bars placeholder */}
      <div className="flex justify-between items-end h-[300px]">
        <div className="w-1/5 h-[60%] bg-gray-300 rounded"></div>
        <div className="w-1/5 h-[80%] bg-gray-300 rounded"></div>
        <div className="w-1/5 h-[40%] bg-gray-300 rounded"></div>
      </div>

      {/* X-axis labels placeholder */}
      <div className="flex justify-between mt-4">
        <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
