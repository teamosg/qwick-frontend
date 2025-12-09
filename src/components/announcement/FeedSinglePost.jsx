import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Heart, Image, MessageCircle } from "lucide-react";
import AvatarUser from "../ui/AvatarUser";
import {
  useDislikeAnnouncement,
  useLikeAnnouncement,
} from "@/hooks/announcement.hook";
import { useState } from "react";
import PostModal from "./PostModal";
import { Clock } from "lucide-react";

export default function FeedSinglePost({ post }) {
  const [openComments, setOpenComments] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [index, setIndex] = useState(0); // track current slide[web:21]

  const { mutate: likeAnnouncement, isPending: isLiking } =
    useLikeAnnouncement();
  const { mutate: dislikeAnnouncement, isPending: isDisliking } =
    useDislikeAnnouncement();

  const handlePostLike = () => {
    if (post?.is_liked) {
      dislikeAnnouncement(post?.id);
    } else {
      likeAnnouncement(post?.id);
    }
  };

  const formattedImages =
    post?.files?.map((file) => ({
      src: file?.file,
      alt: `Post image ${file?.id}`,
    })) ?? [];

  const handleOpenImage = (i) => {
    setIndex(i);
    setOpenImage(true);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 shadow rounded-[12px] p-6 border border-gray-200 dark:border-zinc-700">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <AvatarUser
          src={post?.author?.avatar}
          alt={post?.author?.first_name}
          className="w-12 h-12"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm sm:text-base dark:text-white truncate">
            {post?.author?.first_name} {post?.author?.last_name}
          </h3>
          <div className="text-xs text-[#AAAAAA] dark:text-gray-400 flex items-center">
            <Clock size={10} className="mr-1" />
            {new Date(post?.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-base leading-relaxed mb-3 text-gray-700 dark:text-gray-200">
          {post?.content}
        </p>

        {post?.link && (
          <a
            href={post?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline text-sm break-all"
          >
            {post?.link}
          </a>
        )}
      </div>

      {/* Images */}
      {post?.files && post?.files.length > 0 && (
        <div className="mb-4 cursor-pointer">
          {post?.files.length === 1 ? (
            <div
              onClick={() => handleOpenImage(0)}
              className="flex justify-center"
            >
              <div className="w-full relative group">
                <img
                  src={post?.files[0]?.file}
                  alt="Post image"
                  className="w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Image className="text-white w-8 h-8" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {post?.files.map((file, i) => (
                <div
                  key={i}
                  onClick={() => handleOpenImage(i)}
                  className="w-full cursor-pointer relative group"
                >
                  <img
                    src={file?.file}
                    alt={`Post image ${i + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Image className="text-white w-7 h-7" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-6">
          <div className=" flex items-center space-x-2">
            <button
              onClick={handlePostLike}
              disabled={isLiking || isDisliking}
              className="disabled:cursor-progress cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
            >
              <Heart
                className={`w-5 h-5 ${post?.is_liked
                  ? "fill-red-500 text-red-500"
                  : "group-hover:text-red-500 dark:group-hover:text-red-400"
                  }`}
              />
            </button>
            <span className="text-sm font-medium">
              {post?.like_count} Likes
            </span>
          </div>

          <button
            onClick={() => setOpenComments(true)}
            className="cursor-pointer flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
          >
            <MessageCircle className="w-5 h-5 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
            <span className="text-sm font-medium">
              {post?.comment_count} comments
            </span>
          </button>
        </div>
      </div>

      {/* Lightbox with thumbnails */}
      <Lightbox
        open={openImage}
        close={() => setOpenImage(false)}
        slides={formattedImages}
        index={index}
        plugins={[Thumbnails]}                // enable thumbnails[web:1]
        thumbnails={{ position: "bottom" }}   // optional config[web:1]
      />

      <PostModal
        openComments={openComments}
        setOpenComments={setOpenComments}
        post={post}
        setOpenImage={setOpenImage}
      />
    </div>
  );
}
