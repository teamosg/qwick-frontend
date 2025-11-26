import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import AnnouncementPostForm from "./AnnounceMentPostForm";
import FeedSinglePost from "./FeedSinglePost";
import { useCommunityStore } from "@/store/communityStore";
import { useGetAnnouncementsList } from "@/hooks/announcement.hook";
import FeedSinglePostSkeleton from "../skeletons/FeedSinglePostSkeleton";

const AnnouncementFeed = () => {
  const [postText, setPostText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const { selectedCreatorCommunity } = useCommunityStore()
  console.log(selectedCreatorCommunity);

  const communityUsername = selectedCreatorCommunity?.username;

  const { data: announcementsList, isLoading: isLoadingAnnouncements } = useGetAnnouncementsList(communityUsername);

  console.log(announcementsList);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Adam Smith",
      avatar: "http://placehold.co/120x120",
      content:
        "Social media website template. Love that idea — I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
      link: "https://whop.com/joined/oddsjam/announcements-x5RfvG6BHgs9rP/app/",
      images: [
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400&h=300&fit=crop",
      ],
      timestamp: "43m",
      likes: 2,
      comments: 2,
      isLiked: false,
    },
    {
      id: 2,
      author: "Adam Smith",
      avatar: "http://placehold.co/120x120",
      content:
        "Social media website template. Love that idea — I think journaling could really help me stay motivated. Appreciate the tip, Sam!",
      link: "https://whop.com/joined/oddsjam/announcements-x5RfvG6BHgs9rP/app/",
      images: [
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=400&h=300&fit=crop",
      ],
      timestamp: "43m",
      likes: 2,
      comments: 2,
      isLiked: false,
    },
  ]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    // Filter for image files
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    // Limit to 4 images
    if (selectedImages.length + imageFiles.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    setSelectedImages((prev) => [...prev, ...imageFiles]);


    // Create preview URLs
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };


  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };


  const handlePostSubmit = () => {
    if (postText.trim() || imagePreviewUrls.length > 0) {
      const newPost = {
        id: Date.now(),
        author: "You",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        content: postText,
        link: "",
        images: imagePreviewUrls,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        isLiked: false,
      };

      setPosts([newPost, ...posts]);
      setPostText("");
      setSelectedImages([]);
      setImagePreviewUrls([]);

      console.log(newPost);
    }
  };




  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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




  if (isLoadingAnnouncements) {
    return (
      <>
        {
          [...new Array(2)].map((_, index) => (
            <FeedSinglePostSkeleton key={index} />
          ))
        }
      </>
    )
  }

  return (
    <motion.div
      className="bg-[#f9fafb] dark:bg-zinc-950 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-[24px] text-gray-900 dark:text-white font-semibold mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Announcement
      </motion.h2>

      <AnnouncementPostForm
        postText={postText}
        setPostText={setPostText}
        imagePreviewUrls={imagePreviewUrls}
        setImagePreviewUrls={setImagePreviewUrls}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
        handlePostSubmit={handlePostSubmit}
      />

      {/* Render posts dynamically */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {announcementsList?.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            >
              <FeedSinglePost post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AnnouncementFeed;
