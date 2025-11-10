import { motion } from "framer-motion";
import { Link } from "react-router";

const JoinCommunity = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="bg-[#f9fafb] dark:bg-zinc-950 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-9 inline-block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-[#191919] dark:text-white text-2xl font-semibold">
          Join Community
        </h1>
      </motion.div>

      <motion.div
        className="bg-gray-100 dark:bg-zinc-900 p-6 rounded-xl max-w-3xl items-center justify-center mx-auto border border-gray-200 dark:border-zinc-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src="https://placehold.co/1200x800"
          alt=""
          className="max-w-full object-cover rounded-xl mb-6"
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        />

        <motion.div
          className="max-w-md mx-auto text-center"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-3"
            variants={itemVariants}
          >
            <motion.img
              src="https://i.pravatar.cc/36"
              alt="Profile"
              className="w-6 h-6 rounded-full"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="">
                <span className="text-sm font-medium text-[#717171] dark:text-white capitalize">
                  Prothinidi Thomas
                </span>
              </Link>
            </motion.div>
          </motion.div>
          <motion.h2
            className="text-2xl text-[#090003] dark:text-white font-semibold mb-6"
            variants={itemVariants}
          >
            It is a long established fact that a reader will be distracted by
            the
          </motion.h2>
          <motion.p
            className="text-[18px] text-[#717171] dark:text-zinc-400 mb-11"
            variants={itemVariants}
          >
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of{" "}
          </motion.p>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/`}
              className="inline-block max-w-sm w-full text-[#003933] dark:text-white hover:bg-[#002822] text-[18px] font-semibold p-2.5 rounded-full cursor-pointer transition mb-4 border border-[#003933] hover:text-white"
            >
              Join to WaitList
            </Link>
          </motion.div>{" "}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/announcement`}
              className="inline-block max-w-sm w-full text-white bg-[#003933] hover:bg-[#002822] text-[18px] font-semibold p-2.5 rounded-full cursor-pointer transition"
            >
              Join
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default JoinCommunity;
