"use client";
const AllSupportAndIssuesSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 my-10 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-lg bg-white animate-pulse"
        >
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              {/* Dot */}
              <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />

              <div className="flex flex-col gap-2">
                {/* Title */}
                <div className="h-3 w-28 bg-gray-300 rounded" />

                {/* email */}
                <div className="h-2 w-40 bg-gray-300 rounded" />

                {/* date and time */}
                <div className="h-2 w-40 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Icon */}
            <div className="h-4 w-4 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllSupportAndIssuesSkeleton;
