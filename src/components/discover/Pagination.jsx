import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const TOTAL_PAGES = 6;

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES));
  };

  return (
    <div className="p-6">
      <div className="text-center max-w-full m-auto mt-15">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`mr-4 flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square border rounded-sm transition-all ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-[#003933] hover:text-white"
            }`}
          >
            <ArrowLeft />
          </button>

          <div className="flex gap-2 text-sm md:text-base">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageClick(page)}
                  className={`flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square rounded-sm transition-all ${
                    isActive
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
            disabled={currentPage === TOTAL_PAGES}
            className={`ml-4 flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square border rounded-sm transition-all ${
              currentPage === TOTAL_PAGES
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
