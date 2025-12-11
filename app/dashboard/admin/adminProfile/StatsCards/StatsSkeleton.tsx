
const StatsSkeleton = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
                <div key={i} className="p-6 rounded-xl bg-gray-200 animate-pulse h-28"></div>
            ))}
        </div>
    );
};

export default StatsSkeleton;