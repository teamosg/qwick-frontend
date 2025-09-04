import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddCommunityForm({
  formData,
  updateFormData,
  errors,
  isSubmitting,
  onNext,
}) {
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

  // Sync local state with form data
  useEffect(() => {
    if (formData?.step3?.country) {
      setSelectedCountry(formData.step3.country);
    }
  }, [formData?.step3?.country]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    updateFormData("step3", "country", country);
    setIsDropdownOpen(false);
  };

  const handleBusinessNameChange = (e) => {
    updateFormData("step3", "businessName", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onNext) {
      await onNext();
    }
  };

  return (
    <motion.div
      className="mx-auto p-6 bg-white dark:bg-zinc-900 dark:text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Business Name Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label
            htmlFor="businessName"
            className="block text-base font-medium text-[#0D0D12] mb-2 dark:text-white"
          >
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={formData?.step3?.businessName || ""}
            onChange={handleBusinessNameChange}
            placeholder="Write here..."
            className={`w-full px-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm transition-colors duration-200  dark:text-white ${
              errors?.businessName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200"
            }`}
          />
          {errors?.businessName && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.businessName}
            </motion.p>
          )}
        </motion.div>

        {/* Country Dropdown */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label
            htmlFor="country"
            className="block text-base font-medium text-[#0D0D12] mb-2 dark:text-white"
          >
            Country
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full px-4 py-3 border dark:text-white rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left text-sm flex items-center justify-between transition-colors duration-200 ${
                errors?.country
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
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
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {countries.map((country, index) => (
                    <motion.button
                      key={country}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                    >
                      {country}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {errors?.country && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.country}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#003933] dark:bg-[#003933] text-white py-4 px-10 rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition mt-2 font-medium cursor-pointer ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            data-discover="true"
          >
            {isSubmitting ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center"
              >
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating...
              </motion.div>
            ) : (
              "Create Business"
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
