import { orders } from "@/types/orders";
import OrderRow from "./OrderRow";

export default function OrdersTable({ Myorders }: { Myorders: orders[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Image</th>
            <th>Jersey</th>
            <th>Amount</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Order Date</th>
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
