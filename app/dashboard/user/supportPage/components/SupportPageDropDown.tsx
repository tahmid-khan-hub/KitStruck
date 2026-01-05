"use client";

import Menu from "@/app/hooks/Menu";
import { FaChevronDown } from "react-icons/fa6";
import { motion } from "framer-motion";

interface DropDownProps {
  value: string;
  handleChange: (value: string) => void;
}

const options = [
  { value: "", label: "Select Issue" },
  { value: "order_issue", label: "Order Issue" },
  { value: "payment_problem", label: "Payment Problem" },
  { value: "delivery_delay", label: "Delivery Delay" },
  { value: "jersey_related_issue", label: "Jersey Related Issue" },
  { value: "other", label: "Other" },
];

const SupportPageDropDown: React.FC<DropDownProps> = ({
  value,
  handleChange,
}) => {
  const { isOpen, setIsOpen, menuRef } = Menu();

  const selectedLabel =
    options.find((o) => o.value === value)?.label || "Select Issue";

  return (
    <div className="flex justify-end px-12">
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative w-full md:w-72 mb-5" ref={menuRef}>
        {/* Dropdown Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-sm shadow text-gray-700 hover:bg-gray-50 transition"
        >
          <span className="text-sm font-medium">{selectedLabel}</span>
          <FaChevronDown className="text-gray-500" />
        </button>

        {/* Dropdown List */}
        {isOpen && (
          <ul className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  handleChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  value === opt.value ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default SupportPageDropDown;
