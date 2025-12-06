import { orders } from "@/types/orders";
import Image from "next/image";

export default function OrderRow({ item }: { item: orders }) {
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
        <span className="text-sm text-gray-500">{item?.jerseyData?.team}</span>
      </td>

      <td>${item.amount}</td>
      <td>{item.quantity}</td>

      <td className="capitalize">
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
      </td>

      <td>{new Date(item.payment_at).toLocaleDateString()}</td>
    </tr>
  );
}
