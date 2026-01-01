"use client";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { SupportIssue } from "@/types/SupportIssue";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

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

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">Loading support history...</p>
    );
  }
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      {data.length === 0 && (
        <p className="text-gray-500 text-sm">
          No support issues submitted yet.
        </p>
      )}

      {data.map((item) => {
        const isOpen = openId === item.issue_id;
        const hasReply = item.admin_reply !== null;

        return (
          <div
            key={item.issue_id}
            className="border border-gray-200 rounded-lg bg-white"
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

            {/* Body */}
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-gray-700 space-y-2">
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SupportPageHistory;
