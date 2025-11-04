"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {

  const images = [
    "/banner1.jpeg",
    "/banner2.jpg",
    "/banner3.avif",
  ];

  return <section className="max-w-[1350px] mx-auto"><section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-3 py-10 bg-gray-50">
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 space-y-5 space-x-5"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mt-7 md:mt-0 text-center md:text-left">
          Embrace the Future of Style
        </h1>
        <p className="text-gray-600 text-lg text-center md:text-left">
          Discover a new era of comfort and confidence. Elevate your lifestyle
          with our exclusive collection designed for modern explorers.
        </p>
        <div className="flex justify-center md:justify-start">
          <Link
            href="#"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Explore Now
          </Link>
        </div>
      </motion.div>

      {/* Right Side */}
      <div className="md:w-1/2 w-full ">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop
          className="rounded-2xl shadow-md"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Image
                src={src}
                alt={`banner-${index}`}
                width={800}
                height={500}
                className="w-full h-[300px] md:h-[400px] rounded-2xl object-cover"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section></section>;
};

export default Banner;
