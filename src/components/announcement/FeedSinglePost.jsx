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
        <div className="mb-4">
          {(() => {
            const files = post.files;
            const count = files.length;

            if (count === 1) {
              return (
                <div 
                  onClick={() => handleOpenImage(0)} 
                  className="cursor-pointer rounded-xl overflow-hidden bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800"
                >
                  <img 
                    src={files[0].file} 
                    alt="Post image" 
                    className="w-full h-auto max-h-[600px] object-contain mx-auto transition-all duration-300 hover:brightness-95" 
                  />
                </div>
              );
            }

            if (count === 2) {
              return (
                <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
                  {files.map((file, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleOpenImage(i)} 
                      className="aspect-[4/5] cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
                    >
                      <img 
                        src={file.file} 
                        alt="" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  ))}
                </div>
              );
            }

            if (count === 3) {
              return (
                <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
                  <div 
                    onClick={() => handleOpenImage(0)} 
                    className="col-span-2 aspect-[16/10] cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
                  >
                    <img 
                      src={files[0].file} 
                      alt="" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div 
                    onClick={() => handleOpenImage(1)} 
                    className="aspect-square cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
                  >
                    <img 
                      src={files[1].file} 
                      alt="" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div 
                    onClick={() => handleOpenImage(2)} 
                    className="aspect-square cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
                  >
                    <img 
                      src={files[2].file} 
                      alt="" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
                {files.slice(0, 4).map((file, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleOpenImage(i)} 
                    className="relative aspect-square cursor-pointer overflow-hidden bg-gray-50 dark:bg-zinc-900"
                  >
                    <img 
                      src={file.file} 
                      alt="" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                    {i === 3 && count > 4 && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">+{count - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
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
