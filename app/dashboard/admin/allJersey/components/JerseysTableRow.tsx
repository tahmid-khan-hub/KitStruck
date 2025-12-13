"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";

const JerseysTableRow = ({ item }: { item: Jersey }) => {
  return (
    <tr className="border-b border-b-gray-200">
      <td>
        <Image
          src={item?.image_url || "/default.png"}
          alt={item?.name || "jersey name"}
          width={50}
          height={50}
          className="rounded-md"
        />
      </td>

      <td className="font-semibold">
        {item?.name}
        <br />
        <span className="text-sm text-gray-500">{item?.jerseyData?.team}</span>
      </td>

      <td>${item.amount}</td>
      <td>{item.quantity}</td>
      
      {/* action */}
    </tr>
  );
};

export default JerseysTableRow;
