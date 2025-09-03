import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-full border-gray-300 px-4 py-3 text-gray-600"
        />
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
          Bio
        </Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          placeholder="Tell us about yourself"
          className="w-full min-h-[100px] rounded-xl border-gray-300 px-4 py-3 text-gray-600 resize-none"
        />
      </div>

      {/* Username Field */}
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          placeholder="Enter your username"
          className="w-full rounded-full border-gray-300 px-4 py-3 text-gray-600"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-full border-gray-300 px-4 py-3 text-gray-600"
        />
      </div>

      {/* Phone Number Field */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </Label>
        <div className="flex gap-2">
          <Select
            value={formData.countryCode}
            onValueChange={(value) => handleInputChange("countryCode", value)}
          >
            <SelectTrigger className="w-20 rounded-full border-gray-300">
              <SelectValue>
                <div className="flex items-center gap-2">
                  {formData.countryCode === "us" && "🇺🇸"}
                  {formData.countryCode === "uk" && "🇬🇧"}
                  {formData.countryCode === "ca" && "🇨🇦"}
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
          </Select>

          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter phone number"
            className="flex-1 rounded-full border-gray-300 px-4 py-3 text-gray-600"
          />
        </div>
      </div>

      {/* Update Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-emerald-800 hover:bg-emerald-900 text-white rounded-full py-6 text-lg font-medium mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};

export default ProfileGeneral;
