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
            className="flex items-start p-6 gap-3 bg-[#F5F5F5]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="max-h-[132px] max-w-[171px] overflow-hidden">
              <img src={image} alt={title} />
            </div>

            <div>
              <h1 className="text-gray-800 font-bold text-2xl">{title}</h1>
              <p className="text-[#717171]">{description}</p>
            </div>
            <div className="cursor-pointer" onClick={() => notImplemented()}>
              <EllipsisVertical />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SavedPosts;
