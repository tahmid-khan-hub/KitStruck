"use client";
import Menu from "@/app/hooks/Menu";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
  location: {
    division: string;
    address: string;
    phone: string;
  };
  setLocation: React.Dispatch<
    React.SetStateAction<{
      division: string;
      address: string;
      phone: string;
    }>
  >;
}

const JerseyPurchaseLocation = ({ location, setLocation }: Props) => {
  const { isOpen, setIsOpen, menuRef } = Menu();

  const DivisionOptions = [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ];

  return (
    <div className="space-y-4">
      <h3 className="mt-4 font-semibold">Delivery Address</h3>

      {/* Division */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between px-4 py-2 border border-gray-300 rounded-lg"
        >
          <span>{location.division || "Select Division"}</span>
          <FaChevronDown />
        </button>

        {isOpen && (
          <ul className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
            {DivisionOptions.map((div) => (
              <li
                key={div}
                onClick={() => {
                  setLocation((prev) => ({ ...prev, division: div }));
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {div}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Address */}
      <input
        value={location.address}
        onChange={(e) =>
          setLocation((prev) => ({ ...prev, address: e.target.value }))
        }
        placeholder="House no, Road no, Landmark"
        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
      />

      {/* Phone */}
      <input
        value={location.phone}
        onChange={(e) =>
          setLocation((prev) => ({ ...prev, phone: e.target.value }))
        }
        placeholder="Phone number"
        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
      />
    </div>
  );
};

export default JerseyPurchaseLocation;
