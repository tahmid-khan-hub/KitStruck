import { orders } from "@/types/orders";
import { useSession } from "next-auth/react";
import OrderRow from "./OrderRow";

export default function OrdersTable({ Myorders }: { Myorders: orders[] }) {
  const { data: session } = useSession(); 
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th>Image</th>
            <th>Jersey</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Order Date</th>
            {session?.user?.role === 'admin' && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {Myorders.map((item) => (
            <OrderRow key={item.payment_id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
