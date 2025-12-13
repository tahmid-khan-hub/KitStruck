export default function JerseyFormSkeleton() {
  return (
    <div className="px-20 animate-pulse">
      {/* Title */}
      <div className="h-8 w-56 bg-gray-300 rounded mx-auto my-12" />

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>
        </div>

        {/* Row 3 (textarea) */}
        <div>
          <div className="h-4 w-28 bg-gray-300 rounded mb-2" />
          <div className="h-32 w-full bg-gray-200 rounded" />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded" />
          </div>
        </div>

        {/* Row 5 */}
        <div>
          <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
          <div className="h-12 w-full bg-gray-200 rounded" />
        </div>

        {/* Button */}
        <div className="h-12 w-full bg-gray-300 rounded mt-8" />
      </div>
    </div>
  );
}
