import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { orders } from "@/types/orders";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function OrderRow({ item }: { item: orders }) {
  const { data: session } = useSession(); 
  const { confirmProceed, successToast, errorToast } = UseSweetAlert();
  const handleProceed = async() => {
    const confirmed = await confirmProceed("Mark this order as processing?");
    if (!confirmed) return; 

    try {
      const res = await fetch(`/api/admin/manage-orders/${item.payment_intent_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_status: "processing"
        })
      })

      if (res.ok) {
        successToast("Order moved to processing!")
        setTimeout(() => location.reload(), 300);
      }
      else errorToast("Failed to update order");
      
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
    }
  }
  return (
    <tr className="border-b border-b-gray-200">
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

      {/* <td className="capitalize">
        <span
          className={`px-2 py-1 rounded text-white text-xs ${
            item.order_status === "delivered"
              ? "bg-green-600"
              : item.order_status === "processing"
              ? "bg-blue-600"
              : "bg-gray-500"
          }`}
        >
          {item.order_status}
        </span>
      </td> */}

      <td>{new Date(item.created_at).toLocaleDateString()}</td>

      <td>{item.size}</td>
      <td>{item.address}</td>

      {session?.user?.role === "admin" && <td onClick={handleProceed} className="capitalize">
        <span className="px-2 py-1.5 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 text-xs">Proceed</span>
        </td>}
    </tr>
  );
}
