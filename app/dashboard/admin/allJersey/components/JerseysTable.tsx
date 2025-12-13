"use client";
import { Jersey } from "@/types/jersey";
import JerseysTableRow from "./JerseysTableRow";

const JerseysTable = ({ jerseys }: { jerseys: Jersey[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th>Image</th>
            <th>Jersey</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {jerseys.map((item) => (
            <JerseysTableRow key={item.jersey_id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JerseysTable;
