"use client";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { SupportIssue } from "@/types/SupportIssue";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import SupportPageHistorySkeleton from "./SupportPageHistorySkeleton";
import SupportPageHistoryEmpty from "./SupportPageHistoryEmpty";

const SupportPageHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [openId, setOpenId] = useState<number | null>(null);

  const { data = [], isLoading } = useQuery<SupportIssue[]>({
    queryKey: ["support-history"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/user/support");
      return res.data;
    },
  });

  if (isLoading) return <SupportPageHistorySkeleton /> ;
  
  return (
    <div className="max-w-6xl mx-auto px-5 my-10 space-y-4">
      {data.length === 0 && ( <SupportPageHistoryEmpty /> )}

      {data.map((item) => {
        const isOpen = openId === item.issue_id;
        const hasReply = item.admin_reply !== null;

        return (
          <div
            key={item.issue_id}
            className="border border-gray-200 rounded-lg bg-white overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setOpenId(isOpen ? null : item.issue_id)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {/* Status Dot */}
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    hasReply ? "bg-blue-500" : "bg-gray-400"
                  }`}
                />

                <span className="font-medium text-gray-800">
                  {item.issue_title}
                </span>
              </div>

              {isOpen ? (
                <FaMinus className="text-gray-600" />
              ) : (
                <FaPlus className="text-gray-600" />
              )}
            </button>

            {/* Animated Body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="px-4 pb-4 text-sm text-gray-700 space-y-2 overflow-hidden"
                >
                  <p>
                    <span className="font-medium">Your message:</span>{" "}
                    {item.issue_description}
                  </p>

                  <p>
                    <span className="font-medium">Admin reply:</span>{" "}
                    {hasReply ? (
                      <span className="text-gray-800">{item.admin_reply}</span>
                    ) : (
                      <span className="italic text-gray-400">
                        Admin has not replied yet.
                      </span>
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default SupportPageHistory;
