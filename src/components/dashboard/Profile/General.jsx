import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProfileGeneral = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    username: "",
    email: "",
    phone: "",
    countryCode: "us",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call here
      console.log("Form data to submit:", formData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Handle success response
      console.log("Profile updated successfully");
    } catch (error) {
      // TODO: Handle error response
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-[#0d0d12]">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter your name"
          className="w-full mt-2 pl-8 px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
        />
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          placeholder="Tell us about yourself"
          className="w-full mt-2 pl-8 px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
        />
      </div>

      {/* Username Field */}
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          placeholder="Enter your username"
          className="w-full mt-2 pl-8 px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter your email"
          className="w-full mt-2 pl-8 px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
        />
      </div>

      {/* Phone Number Field */}
      {/* Phone Number Field */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="flex gap-2">
          {/* <Select
            value={formData.countryCode}
            onValueChange={(value) => handleInputChange("countryCode", value)}
          >
            <SelectTrigger className="w-24 mt-2 px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]">
              <SelectValue>
                <div className="flex items-center gap-2">
                  {formData.countryCode === "us" && "🇺🇸 +1"}
                  {formData.countryCode === "uk" && "🇬🇧 +44"}
                  {formData.countryCode === "ca" && "🇨🇦 +1"}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">
                <div className="flex items-center gap-2">🇺🇸 +1</div>
              </SelectItem>
              <SelectItem value="uk">
                <div className="flex items-center gap-2">🇬🇧 +44</div>
              </SelectItem>
              <SelectItem value="ca">
                <div className="flex items-center gap-2">🇨🇦 +1</div>
              </SelectItem>
            </SelectContent>
          </Select> */}

          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter phone number"
            className="w-full mt-2 px-3 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-[#364152] focus:border-transparent transition-all outline-none placeholder:text-[#697586]"
          />
        </div>
      </div>

      {/* Update Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full  bg-[#003933] dark:bg-[#003933] text-white px-4 py-4 sm:py-6 sm:px-10 rounded-3xl sm:rounded-full hover:bg-[#002822] dark:hover:bg-primary/90 transition font-medium cursor-pointer flex gap-2
        "
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};

export default ProfileGeneral;
