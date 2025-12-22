"use client";
import Lottie from "react-lottie-player";
import NoJerseyFound from "@/public/Not Found.json"

const JerseyLottie = () => {
  return (
    <div className="min-h-screen">
      <Lottie
        play
        loop
        animationData={NoJerseyFound}
        className="w-[250px] max-w-md mx-auto"
      />
      <p className="text-center text-gray-500 -mt-5">No jerseys found.</p>
    </div>
  );
};

export default JerseyLottie;
