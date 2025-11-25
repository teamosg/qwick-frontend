import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube, FaRegEye } from "react-icons/fa";
import { Link } from "react-router";
import CampaignProgress from "../discover/CampaignProgress";
import ProgressStatus from "../discover/ProgressStatus";

const cardContent = {
  profile: {
    avatar: "https://i.pravatar.cc/36",
    name: "Content Payout",
    meta: "Destroying Clips",
  },
  type: "Article",
  views: 5600,
  timeAgo: "48m",
  title: "Destroying 1on1's Clips",
  socials: [
    { name: "Instagram", icon: FaInstagram },
    { name: "Facebook", icon: FaFacebook },
    { name: "YouTube", icon: FaYoutube },
  ],
  progress: Math.floor(Math.random() * 100),
  compensation: {
    label: "Compensation",
    details: "$1 per 1k views",
  },
  link: "/join-community",
  cta: "Apply",
};

const Card = ({ content = cardContent }) => {
  const {
    profile,
    type,
    views,
    timeAgo,
    title,
    socials,
    progress,
    compensation,
    link,
    cta,
  } = content;

  return (
    <Link to={link} className="block w-full h-full focus:outline-none group">
      <motion.div
        className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm w-full transition-colors p-5 sm:p-6 flex flex-col gap-5 h-full"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          boxShadow: "0 8px 36px 0 rgba(0,0,0,.08)",
          scale: 1.01,
          transition: { duration: 0.17 },
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-zinc-700"
            />
            <div>
              <p className="text-base font-semibold text-[#090003] dark:text-white mb-1">
                {profile.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-zinc-400">
                {profile.meta}
              </p>
            </div>
          </div>
          {/* Views & Post Type */}
          <div className="flex flex-col items-end gap-1 min-w-[75px] sm:min-w-[90px]">
            <div className="flex items-center gap-2">
              <span className="inline-block text-xs uppercase font-semibold tracking-wide dark:text-white text-[#003933] bg-gray-100 dark:bg-zinc-800 rounded-md px-2 py-1">
                {type}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-zinc-400 mt-0.5">
              <FaRegEye className="mr-1" />
              <span>
                {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}
              </span>
            </div>
            <div className="text-[#003933] text-xs dark:text-zinc-400 mt-1">
              {timeAgo}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[#090003] dark:text-white text-base sm:text-lg mb-1 leading-tight">
          {title}
        </h3>

        {/* Social Media Tags */}
        <div className="flex flex-row gap-2 mb-1">
          {socials.map(({ icon: Icon, name }, idx) => (
            <span
              key={name}
              className="text-[#666666] text-xs rounded-full gap-1 px-2 py-2 bg-[rgba(0,57,51)] dark:bg-[rgba(0,57,51,0.5)] flex flex-row items-center"
            >
              <Icon size={14} className="text-white" />
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        <div>
          <ProgressStatus progress={progress} />
        </div>

        {/* Compensation & Button */}
        <div className="flex items-end justify-between gap-6 mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
          <div>
            <p className="font-semibold text-[#090003] dark:text-white text-xs mb-1">
              {compensation.label}
            </p>
            <p className="text-sm text-gray-700 dark:text-zinc-300">
              {compensation.details}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <span className="inline-block  hover:bg-[#002822] bg-[#003933] hover:dark:bg-emerald-700 text-white text-xs font-semibold py-2 px-5 rounded-full transition-colors cursor-pointer shadow-sm">
              {cta}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Card;
