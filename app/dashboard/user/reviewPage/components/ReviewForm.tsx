"use client";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { FormEvent } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const ReviewForm = () => {
  const {successToast, errorToast} = UseSweetAlert(); 
  const axiosSecure = useAxiosSecure();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ rating, review }: { rating: number; review: string }) => {
      const res = await axiosSecure.post("/api/user/review", {
        rating,
        review,
      });
      return res.data;
    },
    onSuccess: () => {
      successToast("Review submitted successfully!");
    },
    onError: () => {
      errorToast("Something went wrong. Review submission failed!");
    },
  });

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const review = formData.get("review") as string;
    const rating = Number(formData.get("rating"));

    mutate({ rating, review });
    form.reset();
  }

  return (
    <div className="max-w-6xl mx-auto px-5">
      <motion.form initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          placeholder="Your rating (1–5)"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="review"
          placeholder="Write your review here..."
          className="textarea textarea-bordered w-full h-32"
          required
        ></textarea>
        <button type="submit" disabled={isPending} className="btns w-full">
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
      </motion.form>
    </div>
  );
};

export default ReviewForm;
