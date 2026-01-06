"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Link from "next/link";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isValidUrl } from "@/app/hooks/isValidUrl";

const JerseysTableRow = ({ item }: { item: Jersey }) => {
  const queryClient = useQueryClient();
  const { confirmDelete, successToast, errorToast } = UseSweetAlert();

  const { mutate } = useMutation({
    mutationFn: async (jerseyId: number) => {
      const res = await fetch(
        `/api/admin/allJersey?jerseyId=${jerseyId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Failed to delete jersey");
      }

      return res.json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["allJersey"] });
    },
    onSuccess: () => {
      successToast("Jersey has been removed successfully");
    },
    onError: () => {
      errorToast("Failed to removed the jersey");
    },
  });

  const handleDelete = async () => {
    const ok = await confirmDelete("Do you really want to remove this jersey?");

    if (!ok) return;
    mutate(item.jersey_id);
  }

  const jerseyImage = item?.image_url && item.image_url.trim() !== "" && isValidUrl(item.image_url) ? item.image_url : "/default.png";
  
  return (
    <tr className="border-b border-b-gray-200 hover:bg-blue-100">
      <td>
        <Image
          src={jerseyImage}
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
        <button onClick={handleDelete} className="group border border-gray-400 hover:bg-blue-600 hover:text-white p-2 ml-3 rounded-full"><RiDeleteBin5Fill className=" text-blue-600 group-hover:text-white transition" size={18}/></button>
      </td>
    </tr>
  );
};

export default JerseysTableRow;
