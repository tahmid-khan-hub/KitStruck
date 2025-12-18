"use client";
import { useState } from "react";
import Menu from "@/app/hooks/Menu";
import { FaChevronDown } from "react-icons/fa6";

const JerseySizeSelector = () => {
  const { isOpen, setIsOpen, menuRef } = Menu();
  const [size, setSize] = useState("default");

  const SizeOptions = [
    { value: "default", label: "Select Size" },
    { value: "M", label: "M Size" },
    { value: "L", label: "L Size" },
    { value: "XL", label: "XL Size" },
    { value: "XXL", label: "XXL Size" },
  ];

  const currentLabel =
    SizeOptions.find((opt) => opt.value === size)?.label || "Select Size";

  const handleSizeChange = (value: string) => {
    setSize(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-64" ref={menuRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition"
      >
        <span>{currentLabel}</span>
        <FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute mt-2 right-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          {SizeOptions.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSizeChange(opt.value)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                size === opt.value ? "bg-gray-100 font-medium" : ""
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

export default JerseySizeSelector;
