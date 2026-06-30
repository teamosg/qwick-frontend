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
    const siblingCount = 1;
    const totalPageNumbers = siblingCount + 5;

    if (totalPages <= totalPageNumbers) {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = [];
      for (let i = 1; i <= leftItemCount; i++) leftRange.push(i);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = [];
      for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) rightRange.push(i);
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = [];
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) middleRange.push(i);
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return [];
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
              ? "bg-qwick-gray-100 dark:bg-qwick-gray-900 text-qwick-gray-400 dark:text-qwick-gray-600 cursor-not-allowed border-qwick-gray-200 dark:border-qwick-gray-800"
              : "border-qwick-gray-300 dark:border-qwick-gray-800 hover:bg-foreground-strong dark:hover:bg-qwick-gray-800 hover:text-white dark:hover:text-white"
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
                  className="w-8 sm:w-10 md:w-12 text-center text-qwick-gray-500 dark:text-qwick-gray-400"
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
                    ? "bg-foreground-strong text-white dark:text-black shadow-lg"
                    : "border border-qwick-gray-300 dark:border-qwick-gray-800 hover:bg-foreground-strong dark:hover:bg-qwick-gray-800 hover:text-white dark:hover:text-white"
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
              ? "bg-qwick-gray-100 dark:bg-qwick-gray-900 text-qwick-gray-400 dark:text-qwick-gray-600 cursor-not-allowed border-qwick-gray-200 dark:border-qwick-gray-800"
              : "border-qwick-gray-300 dark:border-qwick-gray-800 hover:bg-foreground-strong dark:hover:bg-qwick-gray-800 hover:text-white dark:hover:text-white"
            }`}
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
