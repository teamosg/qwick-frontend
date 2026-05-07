import { motion } from "framer-motion";
import { FaRegEye } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { formatViewCount } from "@/lib/utils";

const Card = ({ content, onApply }) => {
  const {
    thumbnail,
    communityName,
    communityAvatar,
    postedDate,
    views,
    title,
    socials,
    progress,
    compensation,
    isEnded,
  } = content || {};

  const handleAction = (e) => {
    e.stopPropagation();
    if (onApply) {
      onApply();
    }
  };

  const displayViews = views ?? 0;

  return (
    <div
      onClick={handleAction}
      className={`block w-full h-full focus:outline-none group ${isEnded ? "cursor-default" : "cursor-pointer"}`}
    >
      <motion.div
        className={`bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm w-full transition-all flex flex-col h-full border border-gray-100 dark:border-zinc-800 ${isEnded ? "opacity-90 grayscale-[0.3]" : ""}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Top: Large Thumbnail */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isEnded && (
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm text-black dark:text-white px-4 py-1.5 rounded-full text-[10px] font-medium shadow-lg tracking-widest uppercase">
              ENDED
            </div>
          )}
        </div>

        {/* Bottom: Content */}
        <div className="p-5 flex flex-col gap-4 flex-1">
          {/* Row 1: Profile, Community & Socials */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar className="w-9 h-9 border border-gray-50 dark:border-zinc-800 shadow-sm">
                <AvatarImage src={communityAvatar} alt={communityName} />
                <AvatarFallback className="bg-[#003933] text-white text-[10px] font-medium">
                  {communityName?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1.5 text-[14px] font-medium text-gray-800 dark:text-gray-200 tracking-tight">
                <span className="truncate max-w-[140px]">{communityName}</span>
                <span className="text-gray-300 dark:text-zinc-700">•</span>
                <span className="text-gray-400 dark:text-zinc-500 uppercase text-[11px] font-medium tracking-wider">
                  {postedDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {(socials || []).map(({ icon: Icon, name }, idx) => (
                <div
                  key={name + idx}
                  className="w-8 h-8 rounded-full bg-[#002B27] flex items-center justify-center text-white shadow-sm"
                >
                  {Icon && <Icon size={14} />}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Camp1aign Name */}
          <h3 className="text-[20px] font-medium text-[#090003] dark:text-white leading-[1.2] tracking-tight">
            {title}
          </h3>

          {/* Row 3: Progress Bar (Single continuous bar) */}
          <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden mt-1">
            <div 
              className="bg-[#003933] h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Row 4: Payout & Views */}
          <div className="flex items-center justify-between mt-auto pt-1">
            <div className="text-[14px] font-medium text-[#090003] dark:text-white uppercase tracking-wide">
              {compensation}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white">
              <FaRegEye className="text-gray-400 dark:text-zinc-600 w-4 h-4" />
              <span>{formatViewCount(displayViews)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
