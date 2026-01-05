"use client";
import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { motion } from "framer-motion";

interface SupportPageFormProps {
  issue: string;
  setIssue: (val: string) => void;
}

const SupportPageForm = ({ issue, setIssue }: SupportPageFormProps) => {
  const { successToast, errorToast } = UseSweetAlert();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [customIssue, setCustomIssue] = useState("");
  const [message, setMessage] = useState("");

  const finalIssue = issue === "Other" ? customIssue : issue;

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/api/user/support", {
        issue_title: finalIssue,
        description: message,
      });
    },
    onSuccess: () => {
      successToast("Issue submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["support-history"] });

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
    if (!finalIssue) {
      errorToast("Please select an issue");
      return;
    }
    mutate();
  };
  return (
    <motion.form initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }} onSubmit={handleSubmit} className="max-w-6xl mx-auto px-5 rounded mb-6">
      {issue && (
        <div className="mb-3 text-sm text-gray-600">
          Selected Issue: <span className="font-medium">{issue}</span>
        </div>
      )}

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
        rows={5}
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
    </motion.form>
  );
};

export default SupportPageForm;
