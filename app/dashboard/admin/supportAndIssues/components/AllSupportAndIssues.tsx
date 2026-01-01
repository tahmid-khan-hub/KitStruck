"use client";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { SupportIssue } from "@/types/SupportIssue";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaMinus, FaPaperPlane, FaPlus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const AllSupportAndIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [openId, setOpenId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const { data = [], isLoading } = useQuery<SupportIssue[]>({
    queryKey: ["all-support-and-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/support");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">Loading support issues...</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 mt-10 space-y-4">
      {data.map((item) => {
        const isOpen = openId === item.issue_id;
        const hasReply = item.admin_reply !== null;

        return (
          <div
            key={item.issue_id}
            className="border border-gray-200 rounded-lg bg-white overflow-hidden"
          >
            {/* HEADER */}
            <button
              onClick={() => setOpenId(isOpen ? null : item.issue_id)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <div className="flex flex-col text-left">
                <span className="font-medium text-gray-800">
                  {item.issue_title}
                </span>
                <span className="text-xs text-gray-500">{item.user_gmail}</span>
              </div>

              {isOpen ? (
                <FaMinus className="text-gray-600" />
              ) : (
                <FaPlus className="text-gray-600" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-4 text-sm text-gray-700 space-y-4 overflow-hidden"
                >
                  <p>
                    <span className="font-medium">User message:</span>{" "}
                    {item.issue_description}
                  </p>

                  {/* ADMIN REPLY */}
                  {hasReply ? (
                    <p>
                      <span className="font-medium">Admin reply:</span>{" "}
                      {item.admin_reply}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write reply..."
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                      <button
                        disabled={!replyText}
                        className="p-2 bg-blue-500 rounded-md text-white disabled:opacity-50"
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default AllSupportAndIssues;
