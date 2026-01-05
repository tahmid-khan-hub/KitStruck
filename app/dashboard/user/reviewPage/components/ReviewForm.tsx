"use client";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import { FormEvent } from "react";
import { motion } from "framer-motion";

const ReviewForm = () => {
  const {successToast, errorToast} = UseSweetAlert(); 
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const review = formData.get("review") as string;
    const rating = Number(formData.get("rating"));

    const res = await fetch("/api/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating, review }),
    });

    if(res){
        successToast("Review Submitted successfully!");
        form.reset();
    } else {
      errorToast("Something went wrong. Review submission failed!");
    }
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
        <button type="submit" className="btns w-full">
          Submit Review
        </button>
      </motion.form>
    </div>
  );
};

export default ReviewForm;
