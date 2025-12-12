const RecentDataSkeleton = () => {
  return (
    <div className="p-6 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow mt-24 max-w-5xl mx-auto">
      <h2 className="h-10 w-1/3 bg-gray-200 font-semibold mb-9"></h2>
      <div className="space-y-4 animate-pulse">
        {[1,2,3].map((i) => (
          <div key={i} className="h-14 bg-gray-300 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
};

export default RecentDataSkeleton;
