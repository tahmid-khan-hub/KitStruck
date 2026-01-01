"use client";
import Menu from "@/app/hooks/Menu";
import { FaChevronDown } from "react-icons/fa6";

interface DropDownProps {
  sort: string;
  handleSortChange: (value: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ sort, handleSortChange }) => {
  const { isOpen, setIsOpen, menuRef } = Menu();

  const options = [
    { value: "default", label: "Featured" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "popularity", label: "Most Popular" },
    { value: "less_popularity", label: "Less Popular" },
  ];

  const currentLabel =
    options.find((opt) => opt.value === sort)?.label || "Featured";

  return (
    <div className="relative w-full md:w-64" ref={menuRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-2 
          bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 
          hover:bg-gray-50 transition"
      >
        {currentLabel}
        <FaChevronDown />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul
          key="sort-menu"
          className="absolute mt-2 right-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                handleSortChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                sort === opt.value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
