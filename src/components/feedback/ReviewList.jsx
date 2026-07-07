import { MessageCircle, ThumbsUp } from "lucide-react";
import { useState } from "react";
import StarRating from "./StarRating";

const ReviewCard = ({ review }) => {
  const [likes, setLikes] = useState(review.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState(review.replies || []);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      user: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      text: replyText.trim(),
      date: new Date().toLocaleDateString("en-GB"),
    };

    setReplies([...replies, newReply]);
    setReplyText("");
    setShowReplyForm(false);
  };

  return (
    <div className="bg-card dark:bg-card p-6 mb-4 rounded-xl">
      {/* Main Review */}
      <div className="flex items-start space-x-4">
        <img
          src={review.user.avatar}
          alt={review.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-foreground dark:text-foreground">{review.user.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground dark:text-muted-foreground">{review.date}</span>
            </div>
          </div>
          <StarRating rating={review.rating} size="sm" className="mb-3" />
          <p className="text-foreground dark:text-foreground mb-4">{review.text}</p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                isLiked
                  ? "bg-accent text-primary dark:bg-accent dark:text-foreground"
                  : "bg-accent text-muted-foreground hover:bg-accent dark:bg-accent dark:text-foreground dark:hover:bg-accent"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{likes}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                showReplyForm
                  ? "bg-accent text-primary dark:bg-accent dark:text-foreground"
                  : "bg-accent text-muted-foreground hover:bg-accent dark:bg-accent dark:text-foreground dark:hover:bg-accent"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm dark:text-muted-foreground">
                Reply{replies.length > 0 ? `(${replies.length})` : ""}
              </span>
            </button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <form onSubmit={handleReplySubmit} className="mt-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-3 border border-border dark:bg-card dark:text-foreground dark:border-border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                rows={2}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-4 py-2 text-muted-foreground dark:text-muted-foreground hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg dark:bg-accent dark:text-foreground dark:hover:bg-accent hover:bg-primary-hover disabled:bg-muted disabled:cursor-not-allowed transition-colors"
                >
                  Reply
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="mt-4 ml-14 space-y-3">
          {replies.map((reply) => (
            <div key={reply.id} className="flex items-start space-x-3">
              <img
                src={reply.user.avatar}
                alt={reply.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-foreground dark:text-foreground text-sm">
                    {reply.user.name}
                  </h4>
                  <span className="text-xs text-muted-foreground dark:text-muted-foreground">{reply.date}</span>
                </div>
                <p className="text-foreground dark:text-foreground text-sm">{reply.text}</p>
                <button className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground dark:text-muted-foreground hover:text-gray-700 transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Like</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground dark:text-muted-foreground text-lg">
          No reviews yet. Be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
