import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const Card = ({ progress = 7 }) => {
  const progressWidth = `${progress}%`;

  return (
    <motion.div
      className="bg-white dark:bg-zinc-900 rounded-xl p-4 w-full dark:border-zinc-700 transition-colors"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 },
      }}
    >
      {/* Header */}
      <motion.div
        className="flex items-start justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <motion.img
            src="https://i.pravatar.cc/36"
            alt="Profile"
            className="w-9 h-9 rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
          <div>
            <p className="text-sm font-medium text-[#191919] dark:text-white mb-1.5">
              Content Rewards
            </p>
            <p className="text-xs text-gray-600 dark:text-zinc-400">
              Destroying Clips
            </p>
          </div>
        </div>

        <div className="text-[#003933] dark:text-zinc-400">48m</div>
      </motion.div>

      {/* Title and Description */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h3 className="font-semibold text-[#090003] dark:text-white text-sm mb-1">
          Destroying 1on1's Clips
        </h3>
        <p className="text-xs dark:text-zinc-400 mb-3 leading-snug">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking...
        </p>
      </motion.div>

      {/* Social Media Tags */}
      <motion.div
        className="flex flex-row gap-2 my-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.div
          className="text-[#666666] text-xs rounded-full gap-1 px-3 py-2 bg-[#FDF2F8] flex flex-row items-center"
          whileHover={{ scale: 1.05, backgroundColor: "#FCE7F3" }}
          transition={{ duration: 0.2 }}
        >
          <FaInstagram size={12} />
          <span>Instagram</span>
        </motion.div>
        <motion.div
          className="text-[#666666] text-xs rounded-full gap-1 px-3 py-2 bg-[#FDF2F8] flex flex-row items-center"
          whileHover={{ scale: 1.05, backgroundColor: "#FCE7F3" }}
          transition={{ duration: 0.2 }}
        >
          <FaFacebook size={12} />
          <span>Facebook</span>
        </motion.div>
        <motion.div
          className="text-[#666666] text-xs rounded-full gap-1 px-3 py-2 bg-[#FDF2F8] flex flex-row items-center"
          whileHover={{ scale: 1.05, backgroundColor: "#FCE7F3" }}
          transition={{ duration: 0.2 }}
        >
          <FaYoutube size={12} />
          <span>Youtube</span>
        </motion.div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.3 }}
      >
        <div className="flex justify-between text-xs text-[#717171] dark:text-zinc-400 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-[#E2E2E2] dark:bg-zinc-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#003933] dark:bg-[#48c4b5] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: progressWidth }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Compensation & Button */}
      <motion.div
        className="flex items-center justify-between text-xs dark:text-zinc-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div>
          <p className="font-semibold text-[#090003] dark:text-white">
            Compensation
          </p>
          <p>$1 per 1k views</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/join-community"
            className="bg-[#003933] hover:bg-[#002822]  text-white text-sm font-semibold py-1.5 px-4 rounded-full transition duration-300"
          >
            Submission
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
