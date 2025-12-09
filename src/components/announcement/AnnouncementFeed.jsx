import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import AnnouncementPostForm from "./AnnounceMentPostForm";
import FeedSinglePost from "./FeedSinglePost";
import { useCommunityStore } from "@/store/communityStore";
import { useCreateAnnouncements, useGetAnnouncementsList } from "@/hooks/announcement.hook";
import FeedSinglePostSkeleton from "../skeletons/FeedSinglePostSkeleton";
import NoAnnouncementsYet from "../Alerts/NoAnnouncementsYet";
import { toast } from "sonner";


const AnnouncementFeed = () => {
  const { selectedCreatorCommunity } = useCommunityStore()

  const [postText, setPostText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const creator = selectedCreatorCommunity?.creator


  const communityUsername = selectedCreatorCommunity?.username;
  const { data: announcementsList, isLoading: isLoadingAnnouncements } = useGetAnnouncementsList(communityUsername);
  const canPost = selectedCreatorCommunity?.can_edit


  const { mutate: createAnnouncement, isPending: isCreatingAnnouncement } = useCreateAnnouncements(communityUsername)


  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    // Filter for image files
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    // Limit to 4 images
    if (selectedImages.length + imageFiles.length > 4) {
      toast.error("Maximum 4 images allowed");
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

      const formData = new FormData()
      formData.append("content", postText)
      selectedImages?.forEach(file => formData.append("files", file))

      console.log(formData);
      createAnnouncement(formData, {
        onSuccess: () => {
          setPostText("");
          setSelectedImages([]);
          setImagePreviewUrls([])
        }
      })
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

      {/* {
        !!canPost && (
          <AnnouncementPostForm
            creator={creator}
            isPosting={isCreatingAnnouncement}
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
        )
      } */}

      <AnnouncementPostForm
        creator={creator}
        isPosting={isCreatingAnnouncement}
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

      {
        !!announcementsList?.length ||
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <NoAnnouncementsYet owner={canPost} />
        </motion.div>
      }



      {/* Render posts dynamically */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
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
