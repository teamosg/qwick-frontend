import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router";

const ContentReward = ({ progress = 7 }) => {
  const progressWidth = `${progress}%`;

  return (
    <div className="bg-card dark:bg-card rounded-xl shadow-md p-4 w-full border border-border dark:border-border transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src="https://i.pravatar.cc/36"
          alt="Profile"
          className="w-9 h-9 rounded-full"
        />
        <span className="text-sm font-medium text-foreground dark:text-foreground">
          Destroying.com
        </span>
      </div>

      {/* Title and Description */}
      <h3 className="font-semibold text-foreground text-sm mb-1">
        Destroying 1on1’s Clips
      </h3>
      <p className="text-xs text-foreground-subtle mb-3 leading-snug">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking...
      </p>

      {/* Progress */}
      <div className="text-sm text-foreground dark:text-foreground font-medium mb-2">
        ${1673.18} of ${14968.3}
        <span className="ml-2">{progress}%</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-border-strong rounded-full transition-all duration-300"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Meta info */}
      <div className="grid grid-cols-3 text-xs text-foreground-subtle mb-4">
        <div>
          <p className="font-semibold text-foreground">Type</p>
          <p>Clipping</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">
            Platforms
          </p>
          <div className="flex gap-1 mt-1">
            <Instagram size={14} />
            <Facebook size={14} />
            <Youtube size={14} />
          </div>
        </div>
        <div>
          <p className="font-semibold text-foreground">Views</p>
          <p>47,116</p>
        </div>
      </div>

      {/* Compensation & Button */}
      <div className="flex items-center justify-between text-xs text-foreground-subtle">
        <div>
          <p className="font-semibold text-foreground">
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
