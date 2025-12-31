"use client";
import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

const issues = [
  "Order Issue",
  "Payment Problem",
  "Delivery Delay",
  "Size / Jersey Issue",
  "Refund / Return",
  "Other",
];

const SupportPageForm = () => {
  const { successToast, errorToast } = UseSweetAlert();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [issue, setIssue] = useState("");
  const [customIssue, setCustomIssue] = useState("");
  const [message, setMessage] = useState("");

  const finalIssue = issue === "Other" ? customIssue : issue;

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/support", {
        issue_title: finalIssue,
        description: message,
      });
    },
    onSuccess: () => {
      successToast("Issue submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["support"] });

      setIssue("");
      setCustomIssue("");
      setMessage("");
    },
    onError: () => {
      errorToast("Failed to submit issue");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <form onSubmit={handleSubmit} className="px-20 rounded mb-6">
      <select
        className="w-full border border-gray-300 bg-white rounded-sm p-2 mb-3"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        required
      >
        <option value="">Select Issue</option>
        {issues.map((i) => (
          <option key={i}>{i}</option>
        ))}
      </select>

      {issue === "Other" && (
        <input
          className="w-full border border-gray-300 bg-white rounded-sm p-2 mb-3"
          placeholder="Enter your issue"
          value={customIssue}
          onChange={(e) => setCustomIssue(e.target.value)}
          required
        />
      )}

      <textarea
        className="w-full border border-gray-300 bg-white rounded-sm p-2 mb-3"
        rows={4}
        placeholder="Describe your issue..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button
        disabled={isPending}
        className="btns w-full disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default SupportPageForm;
