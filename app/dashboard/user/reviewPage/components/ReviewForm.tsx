const ReviewForm = () => {
  return (
    <div className="px-20">
      <form className="space-y-4">
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
