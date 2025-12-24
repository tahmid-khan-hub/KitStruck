"use client";
import Lottie from "react-lottie-player";
import NoJerseyFound from "@/public/Not Found.json"

const JerseyLottie = () => {
  return (
    <div className="min-h-screen mt-20">
      <Lottie
        play
        loop
        animationData={NoJerseyFound}
        className="w-[300px] max-w-md mx-auto"
      />
      <p className="text-center text-xl text-gray-500 -mt-3">No jerseys found.</p>
    </div>
  );
};

export default JerseyLottie;
