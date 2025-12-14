"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { FaArrowRightLong, FaGreaterThan, FaLessThan } from "react-icons/fa6";
import DropDown from "./dropDown";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import NoJerseyFound from "@/public/Not Found.json"
import Link from "next/link";
import JerseyCardSkeleton from "@/app/SkeletonLoading/JerseyCardSkeleton";
import { GiSevenPointedStar } from "react-icons/gi";

interface JerseysContainerProps {
  jerseys: Jersey[];
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  handleSortChange: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  totalPage: number;
  loading: boolean;
}
const JerseysContainer = ({jerseys, search, setSearch, sort,handleSortChange, page, setPage, totalPage, loading
}: JerseysContainerProps) => {
  if(loading){
    return (
      <div className="max-w-[1350px] mx-auto px-4 md:px-3 "><div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <JerseyCardSkeleton key={i} />
        ))}
      </div></div>
    );
  }
  return <div className="max-w-[1350px] mx-auto px-4 md:px-3 flex flex-col justify-center items-center">
     {/* Search + Sort */}
      <div className="flex flex-row items-center justify-between gap-4 mb-10 ">
        {/* Search */}
        <input
          type="text"
          placeholder="Search jerseys..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        {/* Dropdown */}
        <DropDown sort={sort} handleSortChange={handleSortChange} />
      </div>

      {/* Jerseys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">{jerseys.length === 0
        ? (
          <div className="min-h-screen">
            <Lottie
                play
                loop
                animationData={NoJerseyFound}
                className="w-[250px] max-w-md mx-auto"
            />
            <p className="text-center text-gray-500 -mt-5">No jerseys found.</p>
          </div>
        )
        : jerseys.map((jersey) => (
            <motion.div
              whileHover={{
              scale: 1.02, 
              boxShadow: "0px 0px 20px rgba(0, 123, 255, 0.7)",
              }}
              transition={{ duration: 0.2 }}
              key={jersey.jersey_id}
              className="p-3 border-2 border-gray-200 bg-white rounded-lg flex flex-col justify-between hover:shadow-lg"
            >
              <div className="relative w-full h-[340px]">
                <Image
                  src={jersey.image_url}
                  alt={jersey.name}
                  fill
                  className="object-cover rounded-md w-full h-[340px]"
                />
                {/* OFFER BADGE */}
                  {jersey.offer !== null && (
                    <div className="absolute top-1.5 right-1.5 w-[70px] h-[70px] flex items-center justify-center">
                    <GiSevenPointedStar className="text-blue-600 w-full h-full rounded-full p-1 mb-0.5" />
                    <span className="absolute text-xs font-bold text-white ">{`-${jersey.offer}%`}</span>
                    </div>
                  )}
              </div>
              <div className="mt-4 flex flex-col">
                <h3 className="font-semibold text-lg mb-3">{jersey.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-gray-800 font-semibold text-lg">
                    ${jersey.price}
                  </p>
                  <Link href={`/jersey-details/${jersey.jersey_id}`}><button className="flex items-center justify-center text-blue-500 p-2 rounded-md hover:bg-blue-50 transition">
                    <FaArrowRightLong />
                  </button></Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      

      {/* Pagination */}
      {jerseys.length > 0 && <div className="flex justify-center items-center gap-4 mt-20 mb-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-3 bg-gray-200 text-black rounded-md disabled:opacity-50 hover:bg-blue-600 hover:text-white transition"
        >
        <FaLessThan size={20}/>
        </button>

        <span className="text-gray-600 font-medium">
          Page {page} of {totalPage}
        </span>

        <button
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
          className="px-3 py-3 bg-gray-200 text-black rounded-md disabled:opacity-50 hover:bg-blue-600 hover:text-white transition"
        >
          <FaGreaterThan size={20}/>
        </button>
      </div>}
  </div>;
};

export default JerseysContainer;
