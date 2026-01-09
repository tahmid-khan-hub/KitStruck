"use client";

export default function DashboardGraphSkeleton() {
  return (
    <div className="p-6 bg-white shadow rounded-xl w-full h-[400px] animate-pulse max-w-5xl mx-auto my-24">
    <div className="text-3xl font-semibold text-black mb-4">Overview Graph</div>

      <div className="flex justify-between items-end h-[300px]">
        <div className="w-1/5 h-[60%] bg-gray-300 rounded"></div>
        <div className="w-1/5 h-[80%] bg-gray-300 rounded"></div>
        <div className="w-1/5 h-[40%] bg-gray-300 rounded"></div>
        <div className="w-1/5 h-[40%] bg-gray-300 rounded"></div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
