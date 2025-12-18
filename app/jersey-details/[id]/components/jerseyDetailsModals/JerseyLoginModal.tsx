"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function JerseyLoginModal({ open, onClose }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const callbackUrl = pathname + (searchParams.toString() ? `?${searchParams}` : "");
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} 
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-[95%] max-w-lg shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()} 
          >
            <div>
              <h3 className="text-center text-xl font-semibold mb-11">Sign in to continue your purchase</h3>
              <div className="flex justify-end">
                <Link href={`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
                  <button
                    onClick={onClose}
                    className="btns px-4 py-2 mr-4 rounded-lg"
                  >
                    Sign In
                  </button></Link>
                <button
                  onClick={onClose}
                  className="border-btn px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
