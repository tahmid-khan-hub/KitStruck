"use client";
import Menu from "@/app/hooks/Menu";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
  size: string;
  setSize: (value: string) => void;
}

const JerseySizeSelector = ({ size, setSize }: Props) => {
  const { isOpen, setIsOpen, menuRef } = Menu();

  const SizeOptions = [
    { value: "default", label: "Select Size" },
    { value: "M", label: "M Size" },
    { value: "L", label: "L Size" },
    { value: "XL", label: "XL Size" },
    { value: "XXL", label: "XXL Size" },
  ];

  const currentLabel = SizeOptions.find((opt) => opt.value === size)?.label || "Select Size";

  return (
    <div className="relative w-full md:w-64" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg"
      >
        <span>{currentLabel}</span>
        <FaChevronDown />
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
          {SizeOptions.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                setSize(opt.value);
                setIsOpen(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
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
