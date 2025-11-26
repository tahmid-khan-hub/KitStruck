"use client";
import Lottie from "react-lottie-player";
import AboutLottie from "@/public/about.json";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 px-6 py-12 min-h-screen">

      {/* Left: Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Lottie
          loop
          play
          animationData={AboutLottie}
          className="w-80 md:w-96 lg:w-[420px]"
        />
      </div>

      {/* Right: Text Content */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl text-center md:text-left font-bold mb-4">About Us</h2>

        <p className="text-gray-700 leading-7 text-lg">
          Welcome to <a className="font-semibold text-xl">Kitstruck</a> the perfect place for football lovers to
          find their favourite jerseys at a reasonable price.  
          <br /><br />
          You can explore our collections, add items to your cart and purchase
          them easily with a smooth buying experience.  
          <br /><br />
          Users can also manage their orders and share their feedback through a
          modern, clean and user-friendly dashboard interface.
        </p>
        <Link href="/jerseys">
          <button className="btn bg-blue-600 text-white hover:bg-blue-700 px-8 mt-5 ">
            See Collections
          </button>
        </Link>
      </div>

    </div>
  );
};

export default AboutPage;
