import { countries } from "@/data/countriesData";
import { useCreateCommunity } from "@/hooks/community.hook";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddCommunityForm({
  formData,
  setFormData,
  formStatus,
  setFormStatus
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { errors } = formStatus;
  const { mutate: createCommunity, isPending, isSuccess } = useCreateCommunity()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("");


  const filteredCountries = countries.filter(country =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const valiDateForm = () => {
    if (!formData?.business_name || !formData?.country) {
      setFormStatus({
        ...formStatus,
        errors: {
          business_name: !formData?.business_name ? "Business name is required" : "",
          country: !formData?.country ? "Country is required" : ""
        }
      })
      return false
    } else {
      return true
    }
  }


  useEffect(() => {
    if (formData?.business_name || formData?.country) {
      setFormStatus({
        ...formStatus,
        errors: {
          business_name: formData?.business_name ? "" : formStatus?.errors?.business_name,
          country: formData?.country ? "" : formStatus?.errors?.country
        }
      })
    }
  }, [formData])


  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (!valiDateForm()) return

    createCommunity(formData, {
      onSuccess: data => {
        if (data?.data) navigate('/dashboard')
      }
    })
  }

  return (
    <motion.div
      className="mx-auto p-6 bg-white dark:bg-zinc-900 dark:text-white w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className="space-y-6" onSubmit={handleSubmitForm}>
        {/* Business Name Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label
            htmlFor="businessName"
            className="block text-base font-medium text-foreground-strong mb-2 dark:text-white"
          >
            Community Name
          </label>
          <input
            id="businessName"
            type="text"
            value={formData?.business_name || ""}
            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
            placeholder="Community Name"
            className={`w-full px-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm transition-colors duration-200  dark:text-white ${errors?.businessName
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200"
              }`}
          />
          {errors?.business_name && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.business_name}
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
            className="block text-base font-medium text-foreground-strong mb-2 dark:text-white"
          >
            Country
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full px-4 py-3 border dark:text-white rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left text-sm flex items-center justify-between transition-colors duration-200 ${errors?.country
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200"
                }`}
            >
              <span
                className={formData?.country ? "text-gray-900 dark:text-white" : "text-gray-400"}
              >
                {countries.find(c => c.value === formData?.country)?.label || "Select"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "transform rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 border-b border-gray-100 dark:border-zinc-700">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search country..."
                      className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="overflow-y-auto flex-1">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country, index) => (
                        <motion.button
                          key={country.value}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, country: country.value })
                            setIsDropdownOpen(false)
                            setSearchQuery("")
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 focus:outline-none focus:bg-gray-50 dark:focus:bg-zinc-800 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.01 }}
                        >
                          {country.label}
                        </motion.button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                        No countries found
                      </div>
                    )}
                  </div>
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
            disabled={isPending}
            className={`w-full bg-foreground-strong dark:bg-foreground-strong text-white py-4 px-10 rounded-full hover:bg-foreground dark:hover:bg-foreground-strong/90 transition mt-2 font-medium cursor-pointer ${isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            data-discover="true"
          >
            {isPending ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center"
              >
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating...
              </motion.div>
            ) : (
              "Create Community"
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
