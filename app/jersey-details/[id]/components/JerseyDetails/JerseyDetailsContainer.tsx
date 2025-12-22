"use client";
import { Jersey } from "@/types/jersey";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import JerseyPurchaseModal from "../jerseyDetailsModals/JerseyPurchaseModal";
import JerseyDetailsSkeleton from "@/app/SkeletonLoading/JerseyDetailsSkeleton";
import JerseyDetails from "./JerseyDetails";
import JerseyDetailsButtons from "./JerseyDetailsButtons";
import { GiSevenPointedStar } from "react-icons/gi";
import { useSession } from "next-auth/react";
import JerseyLoginModal from "../jerseyDetailsModals/JerseyLoginModal";

interface Props {
  jersey: Jersey;
}

export default function JerseyDetailsContainer({ jersey }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const {data: session} = useSession();

  const available = jersey?.stock - jersey?.sells_quantity;

  if (!jersey) return <JerseyDetailsSkeleton />;

  return (
    <div className="py-5 mb-9">
      <h1 className="text-center font-bold text-3xl mb-4">
        Jersey Details
      </h1>
      <p className="text-center text-gray-600 mb-9">
        This premium jersey delivers comfort, durability and authentic design.
      </p>

      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }} transition={{ duration: 0.6, ease: "easeOut" }} className="bg-white p-4 rounded-lg w-full flex flex-col md:flex-row gap-8 border-2 border-gray-200 shadow-md"
        >
          {/* IMAGE */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={jersey.image_url}
                alt={jersey.name}
                fill
                className="object-cover"
                sizes="100%"
              />
              {/* OFFER BADGE */}
                {jersey.offer !== null && (
                  <div className="absolute top-1.5 right-1.5 w-[70px] h-[70px] flex items-center justify-center">
                  <GiSevenPointedStar className="text-blue-600 w-full h-full rounded-full p-1 mb-0.5" />
                  <span className="absolute text-xs font-bold text-white ">{`-${jersey.offer}%`}</span>
                  </div>
                )}
            </div>
          </div>

          {/* DETAILS */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <JerseyDetails jersey={jersey} available={available}/>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-6 mt-6">
              <JerseyDetailsButtons available={available} jersey={jersey} onBuyNow={() => setOpenModal(true)} />
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {session ? <JerseyPurchaseModal
        jersey={jersey}
        available={available}
        open={openModal}
        onClose={() => setOpenModal(false)}
      /> : <JerseyLoginModal open={openModal} onClose={() => setOpenModal(false)} />}
      
    </div>
  );
}
