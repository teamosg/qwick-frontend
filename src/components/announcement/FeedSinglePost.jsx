import { Heart, MessageCircle, Share } from "lucide-react";
import AvatarUser from "../ui/AvatarUser";
import { useDislikeAnnouncement, useLikeAnnouncement } from "@/hooks/announcement.hook";

export default function FeedSinglePost({ post }) {
  const { mutate: likeAnnouncement, isPending: isLiking } = useLikeAnnouncement()
  const { mutate: dislikeAnnouncement, isPending: isDisliking } = useDislikeAnnouncement()

  const handlePostLike = () => {
    if (post?.is_liked) {
      dislikeAnnouncement(post?.id)
    } else {
      likeAnnouncement(post?.id)
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-900 shadow rounded-[12px] p-6 mb-8 border border-gray-200 dark:border-zinc-700">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <AvatarUser
          src={post?.avatar}
          alt={post?.author?.first_name}
          className="w-12 h-12"
        />
        <div className="flex gap-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
            {post?.author?.first_name} {post?.author?.last_name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-[16px]">
            {post?.timestamp}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-base leading-relaxed mb-3 text-gray-700 dark:text-gray-200">
          {post?.content}
        </p>

        {/* Link Preview - only show if link exists */}
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

      {/* Images - only show if images exist */}
      {post?.files && post?.files.length > 0 && (
        <div className="mb-4">
          {post?.files.length === 1 ? (
            // Single image - centered with 50% width
            <div className="flex justify-center">
              <div className="w-1/2">
                <img
                  src={post?.files[0]?.file}
                  alt="Post image"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          ) : (
            // Multiple images - 2 per row with 50% width each
            <div className="grid grid-cols-2 gap-3">
              {post?.files.map((file, index) => (
                <div key={index} className="w-full">
                  <img
                    src={file?.file}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-6">
          {/* Like Button */}
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
            <span className="text-sm font-medium">{post?.like_count} Likes</span>
          </div>

          {/* Comment Button */}
          <button className="cursor-pointer flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group">
            <MessageCircle className="w-5 h-5 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
            <span className="text-sm font-medium">
              {post?.comment_count} comments
            </span>
          </button>
        </div>

        {/* Share Button */}
        {/* <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors group">
          <Share className="w-5 h-5 group-hover:text-green-500 dark:group-hover:text-green-400" />
          <span className="text-sm font-medium">Share</span>
        </button> */}
      </div>
    </div>
  );
}
