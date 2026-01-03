/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const handlePrev = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border rounded-lg transition-all ${currentPage === 1
              ? "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed border-gray-200 dark:border-zinc-700"
              : "border-gray-300 dark:border-zinc-700 hover:bg-[#003933] hover:text-white dark:text-white"
            }`}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 sm:w-10 md:w-12 text-center text-gray-500 dark:text-zinc-400"
                >
                  ...
                </span>
              );
            }

            const isActive = currentPage === page;
            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageClick(page)}
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-xs sm:text-sm md:text-base rounded-lg transition-all ${isActive
                    ? "bg-[#003933] text-white shadow-lg"
                    : "border border-gray-300 dark:border-zinc-700 hover:bg-[#003933] hover:text-white dark:text-white"
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border rounded-lg transition-all ${currentPage === totalPages
              ? "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed border-gray-200 dark:border-zinc-700"
              : "border-gray-300 dark:border-zinc-700 hover:bg-[#003933] hover:text-white dark:text-white"
            }`}
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
