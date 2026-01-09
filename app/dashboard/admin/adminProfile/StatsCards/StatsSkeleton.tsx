const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-6 bg-gray-200/50 backdrop-blur-md rounded-xl flex items-center gap-4 animate-pulse"
        >
          {/* Icon circle */}
          <div className="p-3 mr-5 bg-gray-300 rounded-full h-12 w-12"></div>

          {/* Value + Title lines */}
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-5 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;