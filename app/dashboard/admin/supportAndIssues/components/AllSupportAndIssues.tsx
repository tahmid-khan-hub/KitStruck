"use client";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { SupportIssue } from "@/types/SupportIssue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import AllSupportAndIssuesContainer from "./AllSupportAndIssuesContainer";
import AllSupportAndIssuesSkeleton from "./AllSupportAndIssuesSkeleton";
import { PaginatedSupportIssues } from "@/types/PaginatedSupportIssues";
import DashboardTablesPagination from "@/app/dashboard/components/DashboardTablesPagination/DashboardTablesPagination";
import AnimateOnView from "@/app/hooks/AnimateOnView";
import AllSupportAndIssuesLottie from "./AllSupportAndIssuesLottie";

const AllSupportAndIssues = () => {
  const { successToast, errorToast } = UseSweetAlert();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [openId, setOpenId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [page, setPage] = useState(1);

  const { data , isLoading } = useQuery<PaginatedSupportIssues>({
    queryKey: ["all-support-and-issues", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/admin/support?page=${page}&limit=5`);
      return res.data;
    },
  });

  const replyMutation = useMutation<
    { success: boolean; message: string }, // response
    Error,
    { issue_id: number; admin_reply: string } // variables
    >({
    mutationFn: async ({ issue_id, admin_reply }) => {
        const res = await axiosSecure.patch("/api/admin/support", {
        issue_id,
        admin_reply,
        });
        return res.data;
    },
    onSuccess: () => {
        successToast("Replied to the issue successfully!");
        setReplyText("");
        queryClient.invalidateQueries({ queryKey: ["all-support-and-issues"] });
    },
    onError: () => {
        errorToast("Failed to reply!");
    },
  });

  if (isLoading) return <AllSupportAndIssuesSkeleton />
  const issues = data?.data?? [];
  
  if(issues.length === 0) return <AllSupportAndIssuesLottie />;

  return (
    <div className="max-w-6xl mx-auto px-5 my-10 space-y-4 ">
      {issues.map((item: SupportIssue, i) => (
        <AnimateOnView key={i} direction="up" delay={i * 0.08}><AllSupportAndIssuesContainer key={item.issue_id}
            item={item}
            openId={openId}
            setOpenId={setOpenId}
            replyText={replyText}
            setReplyText={setReplyText}
            replyMutation={replyMutation} 
        /></AnimateOnView>
      ))}
      {/* pagination */}
      <DashboardTablesPagination
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages ?? 1}
      />
    </div>
  );
};

export default AllSupportAndIssues;
