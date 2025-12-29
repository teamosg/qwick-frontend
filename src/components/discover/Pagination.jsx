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

  return (
    <div className="p-6">
      <div className="text-center max-w-full m-auto mt-15">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square border rounded-sm transition-all ${currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-[#003933] hover:text-white"
              }`}
          >
            <ArrowLeft />
          </button>

          <div className="flex gap-2 text-sm md:text-base">
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageClick(page)}
                  className={`flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square rounded-sm transition-all ${isActive
                      ? "bg-[#003933] text-white"
                      : "border hover:bg-[#003933] hover:text-white"
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
            className={`flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square border rounded-sm transition-all ${currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-[#003933] hover:text-white"
              }`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
