"use client";
import { useState } from "react";
import Menu from "@/app/hooks/Menu";
import { FaChevronDown } from "react-icons/fa6";

const JerseyPurchaseLocation = () => {
  const { isOpen, setIsOpen, menuRef } = Menu();
  const [division, setDivision] = useState("default");

  const DivisionOptions = [
    { value: "default", label: "Select Division" },
    { value: "Dhaka", label: "Dhaka" },
    { value: "Chattogram", label: "Chattogram" },
    { value: "Rajshahi", label: "Rajshahi" },
    { value: "Khulna", label: "Khulna" },
    { value: "Barishal", label: "Barishal" },
    { value: "Sylhet", label: "Sylhet" },
    { value: "Rangpur", label: "Rangpur" },
    { value: "Mymensingh", label: "Mymensingh" },
  ];

  const currentLabel =
    DivisionOptions.find((opt) => opt.value === division)?.label ||
    "Select Division";

  return (
    <div className="space-y-4">
      <h3 className="mt-4 font-semibold">Delivery Address</h3>

      {/* Division Dropdown (custom) */}
      <div className="relative w-full" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition"
        >
          <span>{currentLabel}</span>
          <FaChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <ul className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
            {DivisionOptions.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  setDivision(opt.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  division === opt.value
                    ? "bg-gray-100 font-medium"
                    : ""
                }`}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Full Address */}
      <input
        placeholder="House no, Road no, Landmark etc."
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />

      {/* Phone */}
      <input
        type="tel"
        pattern="^01[3-9]\d{8}$"
        placeholder="Phone number"
        required
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />
    </div>
  );
};

export default JerseyPurchaseLocation;
