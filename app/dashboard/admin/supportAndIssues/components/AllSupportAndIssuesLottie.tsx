"use client";
import Lottie from "react-lottie-player";
import noIssues from "@/public/nodata.json";

const AllSupportAndIssuesLottie = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Lottie animationData={noIssues} loop={true} className="w-64 h-64" />
      <p className="text-gray-500 text-lg mt-4">No support and issues found.</p>
    </div>
  );
};

export default AllSupportAndIssuesLottie;
