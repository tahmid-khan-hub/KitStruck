"use client"
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { orders } from "@/types/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function OrderRow({ item }: { item: orders }) {
  const { data: session } = useSession(); 
  const { confirmProceed, successToast, errorToast } = UseSweetAlert();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const {mutate: updateDeliveryStatus, isPending} = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/api/admin/manage-orders/${item.order_id}`, {
        delivery_status: "processing"
      });
    },
    onSuccess: () => {
      successToast("Order moved to processing!");
      queryClient.invalidateQueries({ queryKey: ["manage-orders"] });
    },
    onError: () => {
      errorToast("Failed to update order");
    },
  })

  const handleProceed = async() => {
    const confirmed = await confirmProceed("Mark this order as processing?");
    if (!confirmed) return; 

    updateDeliveryStatus();
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
        <span className="flex justify-start text-blue-500 font-semibold">
          {item.payment_status
            ?.replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      </td>

      <td className="capitalize">
        <span className="text-blue-500 font-semibold ">{item.delivery_status}</span>
      </td>

      {session?.user?.role === "admin" && (
        <td>
          {item.delivery_status === "pending" ? (
            <span
              onClick={handleProceed}
              className="px-2 py-1.5 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 text-xs cursor-pointer"
            >
              {isPending ? "Updating": "Proceed"}
            </span>
          ) : (
            <span className="px-2 py-1.5 rounded text-white font-semibold bg-gray-500 text-xs cursor-not-allowed">
              Proceed
            </span>
          )}
        </td>
      )}
    </tr>
  );
}
