import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AddCommunityForm() {
  const [businessName, setBusinessName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "India",
    "Brazil",
    "Mexico",
    "Spain",
    "Italy",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Switzerland",
    "Austria",
    "Belgium",
  ];

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mx-auto p-6 bg-white">
      <form className="space-y-6">
        {/* Business Name Field */}
        <div>
          <label
            htmlFor="businessName"
            className="block text-base font-medium text-[#0D0D12] mb-2"
          >
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Write here..."
            className="w-full px-4 py-3 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm"
          />
        </div>

        {/* Country Dropdown */}
        <div className="mt-6">
          <label
            htmlFor="country"
            className="block text-base font-medium text-[#0D0D12] mb-2"
          >
            Country
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left text-sm flex items-center justify-between"
            >
              <span
                className={selectedCountry ? "text-gray-900" : "text-gray-400"}
              >
                {selectedCountry || "Select"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            onClick=""
            class="mt-20 block max-w-sm mx-auto w-full text-white bg-[#003933] text-[18px] font-semibold p-2.5 rounded-full cursor-pointer hover:bg-emerald-700  transition"
            data-discover="true"
          >
            Create Business
          </button>
        </div>
      </form>
    </div>
  );
}
