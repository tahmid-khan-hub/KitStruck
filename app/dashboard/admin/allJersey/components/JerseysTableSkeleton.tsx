"use client";
const JerseysTableSkeleton = ({ rows = 10 }) => {
  return (
    <div className="animate-pulse space-y-2 mt-32 px-6">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="h-14 bg-gray-200 rounded w-full mb-7"></div>
      ))}
    </div>
  );
};

export default JerseysTableSkeleton;
