import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube, FaRegEye } from "react-icons/fa";
import ProgressStatus from "../discover/ProgressStatus";

const Card = ({ content, onApply }) => {
  const {
    thumbnail,
    name,
    meta,
    type,
    views,
    title,
    socials,
    progress,
    compensation,
    cta,
    isEnded,
    endDate,
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
        className={`bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm w-full transition-colors p-5 sm:p-6 flex flex-col gap-5 h-full ${isEnded ? "opacity-90 grayscale-[0.3]" : ""
          }`}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={!isEnded ? {
          boxShadow: "0 8px 36px 0 rgba(0,0,0,.08)",
          scale: 1.01,
          transition: { duration: 0.17 },
        } : {}}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-4">
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-zinc-700"
            />
            <div>
              <p className="text-base font-semibold text-[#090003] dark:text-white mb-1">
                {name}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-600 dark:text-zinc-400">
                  {meta}
                </p>
                {isEnded && (
                  <span className="text-[10px] bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">
                    ENDED
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Views & Post Type */}
          <div className="flex flex-col items-end gap-1 min-w-[75px] sm:min-w-[90px]">
            {type && (
              <div className="flex items-center gap-2">
                <span className="inline-block text-xs uppercase font-semibold tracking-wide dark:text-white text-[#003933] bg-gray-100 dark:bg-zinc-800 rounded-md px-2 py-1">
                  {type}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-zinc-400 mt-0.5">
              <FaRegEye className="mr-1" />
              <span>
                {displayViews >= 1000 ? `${(displayViews / 1000).toFixed(1)}k` : displayViews}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="font-semibold text-[#090003] dark:text-white text-base sm:text-lg leading-tight">
            {title}
          </h3>
          {endDate && (
            <p className={`text-[11px] font-medium ${isEnded ? "text-red-500" : "text-gray-500 dark:text-zinc-400"}`}>
              {isEnded ? "Ended on" : "Ends on"} {endDate}
            </p>
          )}
        </div>

        {/* Social Media Tags */}
        <div className="flex flex-row gap-2 mb-1">
          {(socials || []).map(({ icon: Icon, name }, idx) => (
            <span
              key={name + idx}
              className="text-[#666666] text-xs rounded-full gap-1 px-2 py-2 bg-[rgba(0,57,51)] dark:bg-[rgba(0,57,51,0.5)] flex flex-row items-center"
            >
              {Icon && <Icon size={14} className="text-white" />}
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        <div>
          <ProgressStatus progress={progress ?? 0} />
        </div>

        {/* Compensation & Button */}
        <div className="flex items-end justify-between gap-6 mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
          <div>
            <p className="font-semibold text-[#090003] dark:text-white text-xs mb-1">
              {compensation?.label}
            </p>
            <p className="text-sm text-gray-700 dark:text-zinc-300">
              {compensation?.details}
            </p>
          </div>
          <motion.div whileHover={!isEnded ? { scale: 1.04 } : {}} whileTap={!isEnded ? { scale: 0.98 } : {}}>
            <span
              onClick={handleAction}
              className={`inline-block text-xs font-semibold py-2 px-5 rounded-full transition-colors shadow-sm ${isEnded
                ? "bg-gray-200 dark:bg-zinc-800 text-gray-500 dark:text-zinc-500 cursor-not-allowed"
                : "bg-[#003933] dark:bg-[#003933] hover:bg-[#002822] text-white cursor-pointer"
                }`}>
              {isEnded ? "Ended" : cta}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
