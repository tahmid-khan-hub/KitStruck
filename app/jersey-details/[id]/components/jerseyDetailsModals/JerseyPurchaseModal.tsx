"use client";
import { useState } from "react";
import { Jersey } from "@/types/jersey";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import JerseySizeSelector from "../JerseySizeSelector";
import JerseyPurchaseLocation from "../JerseyPurchaseLocation";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { useRouter } from "next/navigation";

interface Props {
  jersey: Jersey;
  available: number;
  open: boolean;
  onClose: () => void;
}

export default function JerseyPurchaseModal({ jersey, available, open, onClose }: Props) {
  const {errorToast} = UseSweetAlert();
  const router = useRouter();
  const { data: session } = useSession();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [location, setLocation] = useState({ division: "", address: "", phone: ""});

  const increaseQty = () => { if (qty < available) setQty(qty + 1); };
  const decreaseQty = () => { if (qty > 1) setQty(qty - 1); };
  if (!open) return null;

  const orderData = {
    jersey_id: jersey.jersey_id,
    size: size,
    quantity: qty,
    division: location.division,
    address: location.address,
    phone: location.phone,
  };

  const handleProceed = async () => {
  if (!size) { errorToast("Please select jersey size"); return; }
  if (!location.division || !location.address || !location.phone) {
    errorToast("Please complete delivery address");
    return;
  }

  try {
    const res = await fetch("/api/orders/create-draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!data.order_id) { errorToast("Order creation failed"); return; }

    router.push(`/payment?order_id=${data.order_id}`);
  } catch (err) {
    console.error(err);
    errorToast("Something went wrong");
  }
};

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-[95%] max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >

          <h2 className="text-2xl font-bold mb-7 text-center">Purchase Jersey</h2>

          {/* Read-only fields */}
          <div className="space-y-2 mb-4">
            <p><strong>Name:</strong> {jersey.name}</p>
            <p><strong>Team:</strong> {jersey.team}</p>
            <p><strong>Category:</strong> {jersey.category}</p>
            <p><strong>Price:</strong> ${jersey.price}</p>
          </div>

          {/* select jersey size */}
          <div><JerseySizeSelector size={size} setSize={setSize}/></div>

          {/* add location */}
          <div><JerseyPurchaseLocation location={location} setLocation={setLocation}/></div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-6 mt-9">
            <span className="font-semibold">Quantity:</span>

            <div className="flex items-center gap-2">
              <button
                onClick={decreaseQty}
                className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 border border-blue-500 px-2.5 py-0.5 rounded"
              >
                -
              </button>

              <span className="font-bold">{qty}</span>

              <button
                onClick={increaseQty}
                className="bg-white hover:bg-blue-500 hover:text-white text-blue-500 border border-blue-500 px-2.5 py-0.5 rounded"
              >
                +
              </button>
            </div>

            <span className="text-sm text-gray-600">
              Available: <strong>{available}</strong>
            </span>
          </div>

          {session?.user?.role === "user" ? <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="border-btn px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button onClick={handleProceed} className="btns px-4 py-2 rounded-lg">
              Proceed
            </button>
          </div> : 
          <div>
            <p className="mt-9 mb-8 text-gray-500">Buy option is currently not opened for admins. Thank You.</p>
          <div className="flex justify-end"><button
              onClick={onClose}
              className="border-btn px-4 py-2 rounded-lg"
            >
              Cancel
          </button></div>
          </div>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
