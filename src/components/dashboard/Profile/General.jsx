import { Button } from "@/components/ui/button";
import { useEditProfile, useProfile } from "@/hooks/auth.hook";
import { useEffect, useState } from "react";

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
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        bio: data.bio || "",
        username: data.username || "",
        phone: data.phone_number || "",
      });
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split the name field before sending
    const [first_name = "", last_name = ""] = formData.name.trim().split(" ");

    const payload = {
      first_name,
      last_name,
      bio: formData.bio,
      username: formData.username,
      phone_number: formData.phone,
    };

    editProfile(payload);
  };

  if (isProfileLoading) {
    return <p className="p-6 text-gray-500">Loading profile...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Name */}
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
          className="w-full mt-2 px-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent outline-none placeholder:text-[#697586]"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
        rows={4}
          id="bio"
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          placeholder="Tell us about yourself"
          className="w-full mt-2 px-3 py-3 max-h-60 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent outline-none placeholder:text-[#697586]"
        />
      </div>

      {/* Username */}
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
          className="w-full mt-2 px-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent outline-none placeholder:text-[#697586]"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="Enter phone number"
          className="w-full mt-2 px-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#364152] focus:border-transparent outline-none placeholder:text-[#697586]"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="bg-[#003933] text-white px-12 py-5 cursor-pointer rounded-lg hover:bg-[#002822] transition font-medium flex gap-2 justify-center"
      >
        {isPending ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};

export default ProfileGeneral;
