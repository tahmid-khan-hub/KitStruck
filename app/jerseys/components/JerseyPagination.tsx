"use client";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

interface props {
    page: number;
    setPage: (value: number) => void;
    totalPage: number;
}

const JerseyPagination = ({page, setPage, totalPage}: props) => {
  return (
    <>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-3 bg-gray-200 text-black rounded-md disabled:opacity-50 hover:bg-blue-600 hover:text-white transition"
      >
        <FaLessThan size={20} />
      </button>

      <span className="text-gray-600 px-3 font-medium">
        Page {page} of {totalPage}
      </span>

      <button
        disabled={page === totalPage}
        onClick={() => setPage(page + 1)}
        className="px-3 py-3 bg-gray-200 text-black rounded-md disabled:opacity-50 hover:bg-blue-600 hover:text-white transition"
      >
        <FaGreaterThan size={20} />
      </button>
    </>
  );
};

export default JerseyPagination;
