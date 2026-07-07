import { Star } from "lucide-react";

const StarRating = ({
  rating = 0,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange = () => {},
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const handleStarClick = (starRating) => {
    if (interactive) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(maxRating)].map((_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= rating;
        const isHalfFilled =
          starRating === Math.ceil(rating) && rating % 1 !== 0;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(starRating)}
            disabled={!interactive}
            className={`${
              interactive
                ? "cursor-pointer hover:scale-110 transition-transform"
                : "cursor-default"
            } ${sizeClasses[size]}`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isFilled || isHalfFilled
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-foreground-subtle"
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
