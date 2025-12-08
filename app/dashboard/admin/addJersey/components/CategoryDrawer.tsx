"use client";
import { FaChevronDown } from "react-icons/fa6";
import Menu from "@/app/hooks/Menu";

interface CategoryDrawerProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ value, onChange }) => {
  const { isOpen, setIsOpen, menuRef } = Menu();

  const categories = [
    { value: "club", label: "Club" },
    { value: "retro", label: "Retro" },
    { value: "national", label: "National" },
  ];

  const currentLabel = categories.find((c) => c.value === value)?.label || "Select Category";

  return (
    <div className="relative w-full" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50"
      >
        {currentLabel}
        <FaChevronDown />
      </button>

      {isOpen && (
        <ul className="absolute mt-1 left-0 w-full bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
          {categories.map((c) => (
            <li
              key={c.value}
              onClick={() => {
                onChange(c.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                value === c.value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {c.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDrawer;