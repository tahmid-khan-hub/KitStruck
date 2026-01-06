"use client"
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { orders } from "@/types/orders";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function OrderRow({ item }: { item: orders }) {
  const { data: session } = useSession(); 
  const { confirmProceed, successToast, errorToast } = UseSweetAlert();
  const [deliveryStatus, setDeliveryStatus] = useState(item.delivery_status);
  const handleProceed = async() => {
    const confirmed = await confirmProceed("Mark this order as processing?");
    if (!confirmed) return; 

    try {
      const res = await fetch(`/api/admin/manage-orders/${item.order_id}`, {
        cache: "no-store",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery_status: "processing"
        })
      })

      if (res.ok) {
        successToast("Order moved to processing!")
        setDeliveryStatus("processing");
      }
      else errorToast("Failed to update order");
      
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
    }
  }
  return (
    <tr className="border-b border-b-gray-200 hover:bg-gray-100">
      <td>
        <Image
          src={item?.jerseyData?.image_url || "/default.png"}
          alt={item?.jerseyData?.name || "jersey name"}
          width={50}
          height={50}
          className="rounded-md"
        />
      </td>

      <td className="font-semibold">
        {item?.jerseyData?.name}
        <br />
      </td>

      <td>${item.total_amount}</td>
      <td>{item.quantity}</td>

      <td>{new Date(item.created_at).toLocaleDateString()}</td>

      <td>{item.size}</td>
      <td>{item.address}</td>

      {/* payment method */}
      <td className="capitalize">
        <span className="flex justify-start text-blue-500 font-semibold ">{item.status}</span>
      </td>

      <td className="capitalize">
        <span className="text-blue-500 font-semibold ">{deliveryStatus}</span>
      </td>

      {session?.user?.role === "admin" && deliveryStatus === "pending" ? (
        <td onClick={handleProceed}>
          <span className="px-2 py-1.5 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 text-xs cursor-pointer">
            Proceed
          </span>
        </td>
      ) : (
        <td>
          <span className="px-2 py-1.5 rounded text-white font-semibold bg-gray-500 text-xs cursor-pointer">
            Proceed
          </span>
        </td>
      )}
    </tr>
  );
}
