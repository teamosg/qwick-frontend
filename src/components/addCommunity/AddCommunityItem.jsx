import Coaching from "@/assets/svg/Coaching";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AddCommunityItem = ({ selected, onClick, data }) => {

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-md px-6 py-8 shadow transition-all duration-300 border-2 cursor-pointer  dark:bg-zinc-900  ${selected
        ? "border-[#003933] bg-[#f0fdf4] shadow-lg"
        : "border-transparent hover:shadow-md"
        }`}
    >
      <motion.div
        className={`p-4 flex items-center justify-center w-15 h-15 rounded-2xl mb-3 transition-colors duration-300 bg-[#e5fff6]
        `}
        whileHover={{ scale: 1.05 }}
      >
        <Coaching />
      </motion.div>

      <h3
        className={`text-xl font-semibold transition-colors duration-300 dark:text-white ${selected ? "text-[#003933]" : "text-[#090003]"
          }`}
      >
        {data.title}
      </h3>
    </motion.div>
  );
};

export default AddCommunityItem;
