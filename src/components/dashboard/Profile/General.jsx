import { Button } from "@/components/ui/button";
import { useEditProfile, useProfile } from "@/hooks/auth.hook";
import { useEffect, useState } from "react";
import ProfileInfoSkeleton from "./components/ProfileInfoSkeleton";
import { formatUsername } from "@/utils/usernameUtils";

const ProfileGeneral = () => {
  const { data, isLoading: isProfileLoading } = useProfile();
  const { mutate: editProfile, isPending } = useEditProfile();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    username: "",
    phone: "",
  });

  // Populate fields when profile data arrives
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.full_name || "",
        bio: data.bio || "",
        username: data.username || "",
        phone: data.phone_number || "",
      });
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    let processedValue = value;
    if (field === "username") {
      processedValue = formatUsername(value);
    }
    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData for multipart submission
    const formDataPayload = new FormData();
    formDataPayload.append("full_name", formData.name);
    formDataPayload.append("bio", formData.bio);
    formDataPayload.append("username", formatUsername(formData.username));
    formDataPayload.append("phone_number", formData.phone);

    editProfile(formDataPayload);
  };

  if (isProfileLoading) {
    return <ProfileInfoSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit} className="md:p-6 space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-foreground-strong dark:text-white"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter your name"
          className="w-full mt-2 px-3 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-foreground-muted outline-none text-foreground placeholder:text-foreground-muted"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label
          htmlFor="bio"
          className="text-sm font-medium text-foreground-strong dark:text-white"
        >
          Bio
        </label>
        <textarea
          rows={4}
          id="bio"
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          placeholder="Tell us about yourself"
          className="w-full mt-2 px-3 py-3 max-h-60 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-foreground-muted outline-none text-foreground placeholder:text-foreground-muted"
        />
      </div>

      {/* Username */}
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-foreground-strong dark:text-white"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          placeholder="Enter your username"
          className="w-full mt-2 px-3 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-foreground-muted outline-none text-foreground placeholder:text-foreground-muted"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="text-sm font-medium text-foreground-strong dark:text-white"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="Phone Number"
          className="w-full mt-2 px-3 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-foreground-muted outline-none text-foreground placeholder:text-foreground-muted"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-12 py-5 cursor-pointer rounded-lg transition font-medium flex gap-2 justify-center"
      >
        {isPending ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};

export default ProfileGeneral;
