import image from "@/assets/savedPostImage.png";
import notImplemented from "@/dummyMessages/notImplemented";
import { EllipsisVertical } from "lucide-react";
import { motion } from "framer-motion";

const savedPosts = [
  {
    image,
    title:
      " I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
    description:
      "Social media website template. Love that idea — I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
  },
  {
    image,
    title:
      " I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
    description:
      "Social media website template. Love that idea — I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
  },
  {
    image,
    title:
      " I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
    description:
      "Social media website template. Love that idea — I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
  },
];

const SavedPosts = () => {
  return (
    <div className="space-y-3">
      {savedPosts?.map((post, index) => {
        const { image, title, description } = post;
        return (
          <motion.div
            key={index}
            className="flex items-start p-6 gap-3 bg-gray-100 dark:bg-zinc-800 rounded-lg transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="max-h-[132px] max-w-[171px] overflow-hidden rounded-lg">
              <img src={image} alt={title} className="object-cover w-full h-full" />
            </div>

            <div className="flex-1">
              <h1 className="text-gray-900 dark:text-white font-bold text-2xl">
                {title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
            </div>

            <div className="cursor-pointer text-gray-500 dark:text-gray-400" onClick={() => notImplemented()}>
              <EllipsisVertical />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SavedPosts;
