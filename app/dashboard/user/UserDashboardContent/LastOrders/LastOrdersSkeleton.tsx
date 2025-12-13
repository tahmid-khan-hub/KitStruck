"use client"
const LastOrdersSkeleton = () => {
    return (
        <div className="animate-pulse space-y-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded w-full mb-7"></div>
            ))}
        </div>
    );
};

export default LastOrdersSkeleton;