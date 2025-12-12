const RecentDataSkeleton = () => {
  return (
    <div className="p-6 bg-white/60 backdrop-blur-md border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
      <div className="space-y-4 animate-pulse">
        {[1,2,3].map((i) => (
          <div key={i} className="h-14 bg-gray-300 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
};

export default RecentDataSkeleton;
