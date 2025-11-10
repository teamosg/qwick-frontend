import { useState } from "react";
import StarRating from "./StarRating";

const WriteReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        rating,
        text: reviewText.trim(),
        date: new Date().toLocaleDateString("en-GB"),
      });
      setReviewText("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] p-6 mb-6 rounded-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Write a review</h2>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((starCount) => (
              <button
                key={starCount}
                type="button"
                onClick={() => setRating(starCount)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  rating === starCount
                    ? "bg-gray-50 dark:bg-[#707070] dark:border-[#4E4E4E]"
                    : "border-gray-200 hover:bg-gray-50 dark:bg-[#2E2E2E] dark:border-[#3E3E3E] dark:hover:bg-[#3E3E3E]"
                }`}
              >
                <StarRating rating={starCount} size="md" />
                <span className="text-gray-600 dark:text-white font-medium">{starCount}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Review Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Share your experience
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience with this product..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 dark:focus:ring-[#4E4E4E] dark:focus:border-transparent outline-none dark:text-white transition-colors"
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || !reviewText.trim()}
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewForm;
