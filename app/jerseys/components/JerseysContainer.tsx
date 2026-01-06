"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import DropDown from "./dropDown";
import { motion } from "framer-motion";
import Link from "next/link";
import JerseyCardSkeleton from "@/app/SkeletonLoading/JerseyCardSkeleton";
import { GiSevenPointedStar } from "react-icons/gi";
import JerseyLottie from "./JerseyLottie";
import JerseyPagination from "./JerseyPagination";
import AnimateOnView from "@/app/hooks/AnimateOnView";

interface JerseysContainerProps {
  jerseys: Jersey[]; search: string; setSearch: (value: string) => void; sort: string; handleSortChange: (value: string) => void; page: number; setPage: (value: number) => void; totalPage: number; loading: boolean;
}
const JerseysContainer = ({jerseys, search, setSearch, sort,handleSortChange, page, setPage, totalPage, loading
}: JerseysContainerProps) => {
  return (
    <div className="max-w-[1350px] mx-auto px-4 md:px-3 flex flex-col items-center">
      {/* Search + Sort */}
      <div className="flex w-full items-center justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search jerseys..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <DropDown sort={sort} handleSortChange={handleSortChange} />
      </div>

      {/* Grid Section */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <JerseyCardSkeleton key={i} />
          ))}
        </div>
      ) : jerseys.length === 0 ? (<JerseyLottie />) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {jerseys.map((jersey, i) => (
            <AnimateOnView key={i} direction="scale" delay={i * 0.08}><motion.div key={jersey.jersey_id}
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(0, 123, 255, 0.7)", }} transition={{ duration: 0.2 }}
              className="p-3 border-2 border-gray-200 bg-white rounded-lg flex flex-col justify-between"
            >
              <div className="relative w-full">
                <Image
                  src={jersey.image_url}
                  alt={jersey.name}
                  width={300}
                  height={300}
                  className="w-full h-[340px] object-cover rounded-md"
                />

                {/* Offer Badge */}
                {jersey.offer !== null && (
                  <div className="absolute top-1.5 right-1.5 w-[70px] h-[70px]">
                    <GiSevenPointedStar className="text-blue-600 w-full h-full" />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    -{jersey.offer}%
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-3 line-clamp-2 min-h-14">
                  {jersey.name}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-gray-800 font-semibold text-lg">
                    ${jersey.price}
                  </p>
                  <Link href={`/jersey-details/${jersey.jersey_id}`}>
                    <button className="text-blue-500 p-2 rounded-md hover:bg-blue-50">
                      <FaArrowRightLong />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div></AnimateOnView>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && jerseys.length > 0 && (
        <div className="mt-20 mb-6">
          <JerseyPagination page={page} setPage={setPage} totalPage={totalPage} />
        </div>
      )}
    </div>
  );
};

export default JerseysContainer;
