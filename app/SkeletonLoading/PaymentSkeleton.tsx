export default function PaymentSkeleton() {
  return (
    <div className="animate-pulse min-h-screen px-4">
      <h2 className="text-center h-8 w-1/2 mx-auto bg-gray-300 rounded mt-11"></h2>

      <div className="w-[250px] h-[250px] bg-gray-300 rounded-xl mx-auto mt-6"></div>

      <div className="max-w-[550px] mx-auto bg-white border border-gray-200 rounded-lg p-4 mt-6">
        <div className="h-10 bg-gray-300 rounded mb-4"></div>
        <div className="h-14 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
