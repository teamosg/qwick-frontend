import Coaching from "@/assets/svg/Coaching";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AddCommunityItem = ({ selected, onClick, data }) => {

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl px-6 py-8 shadow-sm transition-all duration-300 border-2 cursor-pointer bg-card dark:bg-card ${
        selected
          ? "border-primary bg-qwick-red-25 dark:bg-qwick-red-950/30 shadow-md"
          : "border-border hover:border-border-strong hover:bg-qwick-gray-25 dark:hover:bg-qwick-gray-800/50 hover:shadow-md"
      }`}
    >
      <motion.div
        className={`p-4 flex items-center justify-center w-15 h-15 rounded-2xl mb-4 transition-colors duration-300 ${
          selected
            ? "bg-primary/10 text-primary"
            : "bg-secondary dark:bg-qwick-gray-800 text-foreground-muted"
        }`}
        whileHover={{ scale: 1.05 }}
      >
        <Coaching />
      </motion.div>

      <h3
        className="text-xl font-semibold transition-colors duration-300 text-foreground-strong dark:text-white"
      >
        {data.title}
      </h3>
    </motion.div>
  );
};

export default AddCommunityItem;
