export default function JerseyDetailsSkeleton() {
  return (
    <div className="py-5 mb-9 animate-pulse">
      {/* HEADER */}
      <div className="h-9 w-52 bg-gray-300 mx-auto rounded-md mb-4"></div>
      <div className="h-5 w-96 bg-gray-200 mx-auto rounded mb-9"></div>

      <div className="bg-white p-4 rounded-lg w-full flex flex-col md:flex-row gap-8 border-2 border-gray-200 shadow-md">
        
        {/* IMAGE SKELETON */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-lg bg-gray-300"></div>
        </div>

        {/* DETAILS SKELETON */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">

          {/* TEXT BLOCKS */}
          <div className="space-y-4">
            <div className="h-8 w-64 bg-gray-300 rounded"></div>
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-5 w-40 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-7 w-36 bg-gray-300 rounded"></div>
            <div className="h-20 w-full bg-gray-200 rounded"></div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-6 mt-6">
            <div className="w-full">
              <div className="h-12 bg-gray-300 rounded-lg"></div>
            </div>
            <div className="w-full">
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
