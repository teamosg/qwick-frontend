import { motion } from "framer-motion";
import { Link, useParams } from "react-router";

import JoinCommunityImage from '@/assets/JoinCommunityImage.png'
import { useJoinCommunity, useGetCommunityByUsername } from "@/hooks/community.hook";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

const JoinCommunity = () => {
  const { communityUsername } = useParams();
  const { data: community, isLoading, isError } = useGetCommunityByUsername(communityUsername);
  const { mutate: joinCommunity, isPending: isJoining } = useJoinCommunity()


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

  const handleJoinCommunity = () => {
    if (communityUsername) {
      joinCommunity({ communityUsername })
    }
  }

  if (isLoading) {
    return (
      <div className="bg-[#f9fafb] dark:bg-zinc-950 flex-1 overflow-y-auto p-6">
        <div className="mb-9 inline-block">
          <Skeleton className="h-8 w-48 mb-4 shadow" />
        </div>
        <div className="bg-gray-100 dark:bg-zinc-900 p-6 rounded-xl max-w-3xl items-center justify-center mx-auto border border-gray-200 dark:border-zinc-700">
          <Skeleton className="h-[400px] w-full rounded-xl mb-6 shadow-sm" />
          <div className="max-w-md mx-auto space-y-6 flex flex-col items-center py-4">
            <Skeleton className="h-8 w-64 shadow-sm" />
            <Skeleton className="h-4 w-full shadow-sm" />
            <div className="w-full pt-4">
              <Skeleton className="h-12 w-full rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || (!isLoading && !community)) {
    return (
      <div className="bg-[#f9fafb] dark:bg-zinc-950 flex-1 overflow-y-auto flex items-center justify-center p-6 shadow-xl rounded-xl">
        <div className="text-center max-w-lg p-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-red-500 font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Community Doesn't Exist</h2>
          <p className="text-[#717171] dark:text-zinc-400 mb-8 leading-relaxed">
            The community you are looking for was not found. It might have been deleted or the username is incorrect.
          </p>
          <Link
            to="/discover"
            className="inline-block text-white bg-[#003933] hover:bg-[#002822] px-8 py-3 rounded-full font-semibold transition shadow-lg active:scale-95"
          >
            Go to Discover
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-[#f9fafb] dark:bg-zinc-950 flex-1 overflow-y-auto p-6 md:p-10"
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
        {/* <h1 className="text-[#191919] dark:text-white text-2xl font-semibold">
          Join Community
        </h1> */}
      </motion.div>

      <motion.div
        className="bg-gray-100 dark:bg-zinc-900 p-6 rounded-xl max-w-3xl items-center justify-center mx-auto border border-gray-200 dark:border-zinc-700 shadow-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-h-100 overflow-hidden rounded-xl mb-6 shadow-sm border border-gray-200 dark:border-zinc-800">
          <motion.img
            src={community?.banner_image || JoinCommunityImage}
            alt=""
            className="max-w-full object-cover w-full h-full"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          />
        </div>

        <motion.div
          className="max-w-md mx-auto text-center"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl text-[#090003] dark:text-white font-semibold mb-6"
            variants={itemVariants}
          >
            Welcome to {community?.business_name || communityUsername}
          </motion.h2>
          <motion.p
            className="text-[18px] text-[#717171] dark:text-zinc-400 mb-11"
            variants={itemVariants}
          >
            Join this community to start earning rewards for your content!
          </motion.p>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              disabled={isJoining || community?.is_member}
              onClick={handleJoinCommunity}
              className="mx-auto max-w-sm flex items-center justify-center w-full text-white bg-[#003933] hover:bg-[#002822] text-[18px] font-semibold p-2.5 rounded-full cursor-pointer transition shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {
                isJoining ? <Spinner className={'text-white size-6'} /> : (community?.is_member ? 'Already joined' : 'Join Community')
              }
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default JoinCommunity;
