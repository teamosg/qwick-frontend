import { AnimatePresence, motion } from "framer-motion";
import { Image, X } from "lucide-react";
import { useRef, useState } from "react";
import FeedSinglePost from "./FeedSinglePost";

const AnnouncementFeed = () => {
  const [postText, setPostText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

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
    if (postText.trim() || selectedImages.length > 0) {
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
    }
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
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

  const imagePreviewVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="bg-[#f9fafb] dark:bg-zinc-950 min-h-screen p-6"
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

      <motion.div
        className="bg-white dark:bg-zinc-900 shadow rounded-[12px] p-4 mb-8 border border-gray-200 dark:border-zinc-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.2 },
        }}
      >
        <div className="flex items-start gap-6">
          {/* Profile Avatar */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </motion.div>

          {/* Text Input Area */}
          <div className="flex-1">
            <motion.textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Write something"
              className="w-full resize-none border-none outline-none text-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-zinc-400 text-base leading-relaxed min-h-[50px] px-5 py-5 bg-gray-100 dark:bg-zinc-700 rounded-full mb-4 transition-colors"
              rows="1"
              whileFocus={{
                boxShadow: "0 0 0 2px rgba(0, 59, 51, 0.2)",
                transition: { duration: 0.2 },
              }}
            />

            {/* Image Preview Grid */}
            <AnimatePresence>
              {imagePreviewUrls.length > 0 && (
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {imagePreviewUrls.map((url, index) => (
                      <motion.div
                        key={index}
                        className="relative group"
                        variants={imagePreviewVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <motion.button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-3 border-t border-gray-200 dark:border-zinc-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            {/* Media Upload Button */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <motion.button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                title="Upload images (max 4)"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </motion.button>
              <AnimatePresence>
                {selectedImages.length > 0 && (
                  <motion.span
                    className="text-sm text-gray-500 dark:text-zinc-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedImages.length}/4 images
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Post Button */}
            <motion.button
              onClick={handlePostSubmit}
              disabled={!postText.trim() && selectedImages.length === 0}
              className="px-8 py-2 bg-transparent border border-[#003933] dark:border-zinc-600 hover:[#003933] hover:bg-[#003933] dark:hover:bg-zinc-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Post
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Render posts dynamically */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            >
              <FeedSinglePost post={post} onLike={() => handleLike(post.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AnnouncementFeed;
