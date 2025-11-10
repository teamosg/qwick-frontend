import {
  OverallRatingSummary,
  Pagination,
  ReviewList,
  WriteReviewForm,
} from "@/components/feedback";
import { useState } from "react";

const Feedback = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Sample data - replace with actual API data
  const reviewsData = {
    overallRating: 4.3,
    totalReviews: 39,
    ratingBreakdown: [
      { stars: 5, count: 12, percentage: 31 },
      { stars: 4, count: 8, percentage: 21 },
      { stars: 3, count: 10, percentage: 26 },
      { stars: 2, count: 4, percentage: 10 },
      { stars: 1, count: 5, percentage: 12 },
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: "Jacob Jones",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        },
        rating: 5,
        text: "The product quality is consistently outstanding, exceeding my expectations every time. I am so glad I found this product! It has made my life so much easier, and it has saved me a lot of time",
        date: "25/02/2024",
        likes: 8,
        replies: [
          {
            id: 1,
            user: {
              name: "Lana",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            },
            text: "Thanks",
            date: "25/02/2024",
          },
        ],
      },
      {
        id: 2,
        user: {
          name: "Ronald Smith",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        },
        rating: 5,
        text: "I am so glad I found this product! It has made my life so much easier, and it has saved me a lot of time",
        date: "25/02/2014",
        likes: 5,
        replies: [
          {
            id: 2,
            user: {
              name: "Admin",
              avatar:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
            },
            text: "We appreciate your feedback!",
            date: "26/02/2014",
          },
        ],
      },
    ],
  };

  const totalPages = Math.ceil(reviewsData.reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviewsData.reviews.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReviewSubmit = (reviewData) => {
    // Handle review submission
    console.log("New review:", reviewData);
    // Here you would typically send the data to your API
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overall Rating Summary */}
        <OverallRatingSummary
          overallRating={reviewsData.overallRating}
          totalReviews={reviewsData.totalReviews}
          ratingBreakdown={reviewsData.ratingBreakdown}
        />

        {/* Write Review Form */}
        <WriteReviewForm onSubmit={handleReviewSubmit} />

        {/* Reviews List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Read all reviews
          </h2>
          <ReviewList reviews={currentReviews} />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
