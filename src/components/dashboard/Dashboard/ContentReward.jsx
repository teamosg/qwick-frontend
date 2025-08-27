import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router";

const ContentReward = ({ progress = 7 }) => {
  const progressWidth = `${progress}%`;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-4 w-full  border border-zinc-200 dark:border-zinc-700 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src="https://i.pravatar.cc/36"
          alt="Profile"
          className="w-9 h-9 rounded-full"
        />
        <span className="text-sm font-medium text-zinc-800 dark:text-white">
          Destroying.com
        </span>
      </div>

      {/* Title and Description */}
      <h3 className="font-semibold text-[#090003] dark:text-white text-sm mb-1">
        Destroying 1on1’s Clips
      </h3>
      <p className="text-xs text-[#717171] dark:text-zinc-400 mb-3 leading-snug">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking...
      </p>

      {/* Progress */}
      <div className="text-sm text-zinc-800 dark:text-white font-medium mb-2">
        ${1673.18} of ${14968.3}
        <span className="ml-2">{progress}%</span>
      </div>
      <div className="h-2 bg-[#E2E2E2]  rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-[#003933] dark:bg-[#48c4b5] rounded-full transition-all duration-300"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Meta info */}
      <div className="grid grid-cols-3 text-xs text-[#717171] dark:text-zinc-400 mb-4">
        <div>
          <p className="font-semibold text-[#090003] dark:text-white">Type</p>
          <p>Clipping</p>
        </div>
        <div>
          <p className="font-semibold text-[#090003] dark:text-white">
            Platforms
          </p>
          <div className="flex gap-1 mt-1">
            <Instagram size={14} />
            <Facebook size={14} />
            <Youtube size={14} />
          </div>
        </div>
        <div>
          <p className="font-semibold text-[#090003] dark:text-white">Views</p>
          <p>47,116</p>
        </div>
      </div>

      {/* Compensation & Button */}
      <div className="flex items-center justify-between text-xs text-[#717171] dark:text-zinc-400">
        <div>
          <p className="font-semibold text-[#090003] dark:text-white">
            Compensation
          </p>
          <p>$1 per 1k views</p>
        </div>
        <Link
          to="/apply"
          className="bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-semibold py-1.5 px-4 rounded-full transition"
        >
          Apply
        </Link>
      </div>
    </div>
  );
};

export default ContentReward;
