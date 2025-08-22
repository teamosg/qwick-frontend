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

const ProfileGeneral = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="user@gmail.com"
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
          placeholder="Input your first name"
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
          placeholder="JHJKDhaHBD"
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
          placeholder="dam@sdakvjg"
          className="w-full rounded-full border-gray-300 px-4 py-3 text-gray-600"
        />
      </div>

      {/* Phone Number Field */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </Label>
        <div className="flex gap-2">
          <Select defaultValue="us">
            <SelectTrigger className="w-20 rounded-full border-gray-300">
              <SelectValue>
                <div className="flex items-center gap-2">🇺🇸</div>
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
            placeholder="••••••••••"
            className="flex-1 rounded-full border-gray-300 px-4 py-3 text-gray-600"
          />
        </div>
      </div>

      {/* Sign In Button */}
      <Button className="w-full bg-emerald-800 hover:bg-emerald-900 text-white rounded-full py-6 text-lg font-medium mt-8">
        Sign in
      </Button>
    </div>
  );
};

export default ProfileGeneral;
