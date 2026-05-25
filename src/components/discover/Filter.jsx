import { ChevronDown } from "lucide-react";
import { useGetCampaignTypes, useGetCategories } from "@/hooks/campaign.hook";

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
  const { data: campaignTypesData } = useGetCampaignTypes();
  const { data: categoriesData } = useGetCategories();

  const types = ["All", ...(campaignTypesData?.data?.map(t => t.name) || [])];
  const categories = ["All", ...(categoriesData?.data?.map(c => c.name) || [])];

  const sortOptions = [
    "Newest",
    "Highest Budget",
    "Highest Available Budget",
    "Highest CPM",
    "Most Paid Out",
    "Most Creators",
  ];

  const Dropdown = ({ label, value, options, isOpen, setIsOpen, onSelect }) => (
    <div className="relative flex-1 min-w-[120px] sm:min-w-[180px] md:min-w-[200px] sm:flex-initial">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 sm:gap-3 text-foreground px-3 py-2.5 sm:px-4 sm:py-3.5 md:px-6 rounded-xl hover:bg-gray-50 bg-white border border-border transition-all w-full group shadow-sm"
      >
        <span className="text-foreground-muted font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
          {label}
        </span>
        <span className="flex-1 text-left font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </span>
        <ChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 text-foreground-muted transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl z-20 overflow-hidden min-w-[160px] border border-border">
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full text-xs sm:text-sm md:text-base text-left p-3.5 hover:bg-gray-50 transition-colors ${value === option ? "bg-gray-100 font-semibold text-foreground-strong" : "text-foreground"
                  } ${index !== 0 ? "border-t border-border" : ""} whitespace-nowrap`}
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
    <div className="w-full">
      <div className="max-w-6xl py-4">
        <div className="flex flex-wrap gap-2.5 sm:gap-4 items-center md:justify-start">
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
