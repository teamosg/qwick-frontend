/* eslint-disable react/prop-types */
import { ChevronDown } from "lucide-react";

export default function DiscoverFilter({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
  typeOpen,
  setTypeOpen,
  categoryOpen,
  setCategoryOpen,
  sortOpen,
  setSortOpen
}) {
  const types = ["All", "Clipping", "UGC", "Audio", "Other"];
  const categories = [
    "All",
    "Personal Brand",
    "Entertainment",
    "Products",
    "Music",
    "Logo",
    "Other",
  ];
  const sortOptions = [
    "Highest available budget",
    "Most Paid Out",
    "Highest CPM",
    "Nearest",
  ];

  const Dropdown = ({ label, value, options, isOpen, setIsOpen, onSelect }) => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3  text-white p-1.5 md:px-6 sm:py-3.5 rounded-lg hover:bg-[#002822] bg-[#003933] transition-all w-auto sm:min-w-[200px] group"
      >
        <span className="text-white font-medium text-[8px] sm:text-base whitespace-nowrap">
          {label}
        </span>
        <span className="flex-1 text-left font-semibold text-[8px] sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 w-full bg-[#003933] rounded-lg shadow-2xl z-20 overflow-hidden min-w-[150px]">
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full text-[8px] sm:text-base text-left p-3 hover:bg-[#002822] transition-colors ${value === option ? "bg-[#002822] font-semibold" : ""
                  } ${index !== 0 ? "border-t border-[#002822]" : ""} text-white whitespace-nowrap`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="">
      <div className="max-w-6xl py-4">
        <div className="flex flex-row gap-4 items-center justify-center sm:items-start sm:justify-start">
          <Dropdown
            label="Type:"
            value={selectedType}
            options={types}
            isOpen={typeOpen}
            setIsOpen={setTypeOpen}
            onSelect={setSelectedType}
          />

          <Dropdown
            label="Category:"
            value={selectedCategory}
            options={categories}
            isOpen={categoryOpen}
            setIsOpen={setCategoryOpen}
            onSelect={setSelectedCategory}
          />

          <Dropdown
            label="Sort by:"
            value={selectedSort}
            options={sortOptions}
            isOpen={sortOpen}
            setIsOpen={setSortOpen}
            onSelect={setSelectedSort}
          />
        </div>
      </div>
    </div>
  );
}
