"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Link from "next/link";

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

      <td className="pl-7.5">${item?.price}</td>
      <td className="pl-9">{item?.sells_quantity}</td>
      
      {/* action */}
      <td className="flex mt-3">
        <Link href={`/dashboard/admin/allJersey/jersey-form?jerseyId=${item.jersey_id}`}><button className="group border border-gray-400 hover:bg-blue-600 hover:text-white p-2 rounded-full"><FaEdit className="ml-0.5 text-blue-600 group-hover:text-white transition" size={18}/></button></Link>
        <button className="group border border-gray-400 hover:bg-blue-600 hover:text-white p-2 ml-3 rounded-full"><RiDeleteBin5Fill className=" text-blue-600 group-hover:text-white transition" size={18}/></button>
      </td>
    </tr>
  );
};

export default JerseysTableRow;
