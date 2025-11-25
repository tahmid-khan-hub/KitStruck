import { userReview } from "@/app/actions/userReview";
import { FormEvent } from "react";

const ReviewForm = () => {
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const review = formData.get("review") as string;

    const res = await userReview({review});
    if(res?.success){
        alert("Review Submitted successfully!");
        form.reset();
    } else {
      alert("Something went wrong. Review submission failed!");
    }
  }
  return (
    <div className="px-20">
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button type="submit" className="btn w-full">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
