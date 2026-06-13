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
    <div className="bg-card dark:bg-card p-6 mb-6 rounded-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground dark:text-foreground">Write a review</h2>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((starCount) => (
              <button
                key={starCount}
                type="button"
                onClick={() => setRating(starCount)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  rating === starCount
                    ? "bg-accent dark:bg-accent dark:border-border"
                    : "border-border hover:bg-accent dark:bg-accent dark:border-border dark:hover:bg-accent"
                }`}
              >
                <StarRating rating={starCount} size="md" />
                <span className="text-muted-foreground dark:text-foreground font-medium">{starCount}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Review Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground dark:text-foreground">
            Share your experience
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience with this product..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 dark:focus:ring-zinc-600 dark:focus:border-transparent outline-none dark:text-white transition-colors"
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
