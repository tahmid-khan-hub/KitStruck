"use client";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

interface Props {
  method: "cod" | "card" | null;
  setMethod: (value: "cod" | "card") => void;
}

const JerseyPurchasePaymentMethod = ({ method, setMethod }: Props) => {

  return (
    <div className="flex justify-center gap-4 my-11">
      <button
        onClick={() => setMethod("cod")}
        className={`flex items-center gap-2 px-4 py-2 ${
          method === "cod" ? "btns" : "border-btn"
        }`}
      >
        <FaMoneyBillWave className="text-lg" />
        Cash on delivery
      </button>

      <button
        onClick={() => setMethod("card")}
        className={`flex items-center gap-2 px-4 py-2 ${
          method === "card" ? "btns" : "border-btn"
        }`}
      >
        <FaCreditCard className="text-lg" />
        Card Payment
      </button>
    </div>
  );
};

export default JerseyPurchasePaymentMethod;
