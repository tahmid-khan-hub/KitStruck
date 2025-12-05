"use client";
import { useState } from "react";
import { Jersey } from "@/types/jersey";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Props {
  jersey: Jersey;
  available: number;
  open: boolean;
  onClose: () => void;
}

export default function JerseyPurchaseModal({ jersey, available, open, onClose }: Props) {
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    if (qty < available) setQty(qty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-[95%] max-w-lg shadow-xl"
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

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="border-btn px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <Link
              href={`/payment?amount=${jersey.price * qty}&jersey_id=${jersey.jersey_id}&qty=${qty}`}
            >
              <button className="btns px-4 py-2 rounded-lg">
                Proceed
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
