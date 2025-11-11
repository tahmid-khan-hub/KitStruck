"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { FaArrowRightLong, FaGreaterThan, FaLessThan } from "react-icons/fa6";

interface JerseysContainerProps {
  jerseys: Jersey[];
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  handleSortChange: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  totalPage: number;
}
const JerseysContainer = ({jerseys, search, setSearch, sort,handleSortChange, page, setPage, totalPage
}: JerseysContainerProps) => {
  return <div className="max-w-[1350px] mx-auto px-4 md:px-3 min-h-screen flex flex-col justify-center items-center">
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

        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
        >
          <option value="default">Sort by Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {/* Jerseys Grid */}
      {jerseys.length === 0 ? (
        <div className="min-h-screen"><p className="text-center text-gray-500">No jerseys found.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jerseys.map((jersey) => (
            <div
              key={jersey.jersey_id}
              className="p-3 bg-white rounded-lg flex flex-col justify-between hover:shadow-lg"
            >
              <Image
                src={jersey.image_url}
                alt={jersey.name}
                width={200}
                height={200}
                className="object-cover rounded-md w-full h-[300px]"
              />
              <div className="mt-4 flex flex-col">
                <h3 className="font-semibold text-lg mb-3">{jersey.name}</h3>
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-gray-800 font-semibold text-lg">
                    ${jersey.price}
                  </p>
                  <button className="flex items-center justify-center text-blue-500 p-2 rounded-md hover:bg-blue-50 transition">
                    <FaArrowRightLong />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-20 mb-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-3 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
        >
        <FaLessThan size={20}/>
        </button>

        <span className="text-gray-600 font-medium">
          Page {page} of {totalPage}
        </span>

        <button
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
          className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
        >
          <FaGreaterThan size={20}/>
        </button>
      </div>
  </div>;
};

export default JerseysContainer;
