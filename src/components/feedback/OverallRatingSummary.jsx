import StarRating from "./StarRating";

const OverallRatingSummary = ({
  overallRating,
  totalReviews,
  ratingBreakdown,
}) => {
  return (
    <div className="bg-card dark:bg-card rounded-xl p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground dark:text-foreground">Overall rating</h2>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-foreground dark:text-foreground"> 
              {overallRating.toFixed(1)}/5
            </div>
            <StarRating rating={overallRating} size="lg" />
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground dark:text-foreground">
            Total {totalReviews} rating
          </h2>
          <div className="space-y-3">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 min-w-[80px]">
                  <span className="text-sm text-muted-foreground dark:text-foreground">{item.stars}</span>
                  <StarRating rating={item.stars} size="sm" />
                </div>
                <div className="flex-1">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground dark:text-foreground min-w-[20px] text-right">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallRatingSummary;
