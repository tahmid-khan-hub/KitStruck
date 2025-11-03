"use client";

import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
  };

  const images = [
    "/banner1.jpeg",
    "/banner2.jpg",
    "/banner3.avif",
  ];

  return <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-gray-50">
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Embrace the Future of Style
        </h1>
        <p className="text-gray-600 text-lg">
          Discover a new era of comfort and confidence. Elevate your lifestyle
          with our exclusive collection designed for modern explorers.
        </p>
        <Link
          href="#"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Explore Now
        </Link>
      </motion.div>

      {/* Right Side - Auto Image Slider */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="md:w-1/2 mt-10 md:mt-0"
      >
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-[400px]">
              <Image
                src={src}
                alt={`banner-${index}`}
                fill
                className="object-cover rounded-2xl shadow-md"
                priority
              />
            </div>
          ))}
        </Slider>
      </motion.div>
    </section>;
};

export default Banner;
