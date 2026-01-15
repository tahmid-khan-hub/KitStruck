"use client";

interface Props {
  rows?: number;
}

export default function CartSkeleton({ rows = 3 }: Props) {
  return (
    <div className="space-y-4 max-w-[1350px] mx-auto px-4 md:px-3 min-h-screen mt-24">
      <h1 className="text-3xl font-bold text-center mt-12 mb-7">Your Cart</h1>

      {/* Horizontal scroll wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-[750px] space-y-4">
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-200 p-4 rounded-lg animate-pulse flex items-center gap-4"
            >
              {/* Image */}
              <div className="w-32 h-32 bg-gray-200 rounded"></div>

              {/* Content */}
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-5 bg-gray-200 rounded w-1/6 mt-3"></div>

                <div className="flex gap-2 mt-2.5">
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Icons */}
              <div className="flex gap-5">
                <div className="w-14 h-10 bg-gray-200 rounded"></div>
                <div className="w-14 h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
