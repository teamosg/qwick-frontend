import image from "@/assets/savedPostImage.png";
import notImplemented from "@/dummyMessages/notImplemented";
import { EllipsisVertical } from "lucide-react";
import { motion } from "framer-motion";

const savedPosts = [
  {
    image,
    title:
      "I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
    description:
      "Social media website template. Love that idea — I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
  },
  {
    image,
    title:
      "I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
    description:
      "Social media website template. Love that idea — I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
  },
  {
    image,
    title:
      "I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
    description:
      "Social media website template. Love that idea — I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
  },
];

const SavedPosts = () => {
  return (
    <div className="space-y-4">
      {savedPosts?.map((post, index) => {
        const { image, title, description } = post;
        return (
          <motion.div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all shadow-sm hover:shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Image */}
            <div className="w-full sm:w-[171px] sm:h-[132px] rounded-lg overflow-hidden shrink-0">
              <img
                src={image}
                alt={title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Text */}
            <div className="flex-1 space-y-2">
              <h1 className="text-gray-900 dark:text-white font-semibold text-lg sm:text-xl leading-snug">
                {title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {description}
              </p>
            </div>

            {/* Options Icon */}
            <button
              onClick={() => notImplemented()}
              className="self-start sm:self-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <EllipsisVertical />
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SavedPosts;
