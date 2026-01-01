"use client"
import Lottie from "react-lottie-player";
import noSupportHistory from "@/public/Empty Box Animation.json"

const SupportPageHistoryEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Lottie animationData={noSupportHistory} loop={true} className="w-64 h-64" />
      <p className="text-gray-500 text-lg mt-4">No Issues found</p>
    </div>
  );
};

export default SupportPageHistoryEmpty;
