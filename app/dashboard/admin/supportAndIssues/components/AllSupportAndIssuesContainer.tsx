"use client";

import { FaMinus, FaPlus, FaPaperPlane } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { UseMutationResult } from "@tanstack/react-query";

export interface SupportIssue {
  issue_id: number;
  issue_title: string;
  issue_description: string;
  admin_reply: string | null;
  user_gmail: string;
  created_at: string;
}

interface AllSupportAndIssuesProps {
  item: SupportIssue;
  openId: number | null;
  setOpenId: Dispatch<SetStateAction<number | null>>;
  replyText: string;
  setReplyText: Dispatch<SetStateAction<string>>;
  replyMutation: UseMutationResult<
    { success: boolean; message: string }, // response
    Error,
    { issue_id: number; admin_reply: string } // variables
  >;
}

const AllSupportAndIssuesContainer: React.FC<AllSupportAndIssuesProps> = ({
  item,
  openId,
  setOpenId,
  replyText,
  setReplyText,
  replyMutation,
}) => {
  const isOpen = openId === item.issue_id;
  const hasReply = item.admin_reply !== null;

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden hover:bg-blue-100 transition-transform duration-300 hover:scale-101">
      {/* HEADER */}
      <button
        onClick={() => setOpenId(isOpen ? null : item.issue_id)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-start">
          {/* Status Dot */}
          <div className="flex my-auto mr-3">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                hasReply ? "bg-gray-500" : "bg-blue-500"
              }`}
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-medium text-gray-800">{item.issue_title}</span>
            <span className="text-xs text-gray-500">{item.user_gmail}</span>
            <span className="text-xs text-gray-500">{
              new Intl.DateTimeFormat("en-GB", {
              day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,
            }).format(new Date(item.created_at))}</span>
          </div>
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
                  onClick={() =>
                    replyMutation.mutate({
                      issue_id: item.issue_id,
                      admin_reply: replyText,
                    })
                  }
                  disabled={replyText.trim() === ""}
                  className="p-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white disabled:opacity-50"
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
};

export default AllSupportAndIssuesContainer;
