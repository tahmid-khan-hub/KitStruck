"use client";
export default function JerseyCardSkeleton() {
  return (
    <div className="p-3 border-2 border-gray-200 bg-white rounded-lg flex flex-col justify-between animate-pulse">
      <div className="w-full h-[300px] bg-gray-300 rounded-md"></div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        <div className="mt-8 flex items-center justify-between">
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
