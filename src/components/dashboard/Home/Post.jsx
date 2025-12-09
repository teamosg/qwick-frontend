import { Clock } from "lucide-react";
import PostComments from "./PostComments";
import CommentSection from "./CommentSection";
import PostImages from "./PostImages";
import PostActions from "./PostActions";


const Post = ({ post }) => {

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow p-3 sm:p-6">
      {/* ================= POST HEADER ================= */}
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img
            src={post?.author?.avatar}
            alt={post?.author?.first_name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
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

        {/* Three Dot Menu */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1">
              <MoreHorizontal size={18} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700"
          >
            <DropdownMenuItem
              className="cursor-pointer"
            >
              <Edit size={16} className="mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 size={16} className="mr-2 text-red-600" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      {/* ================= POST CONTENT ================= */}
      <p className="dark:text-gray-300 mb-3 sm:mb-4 whitespace-pre-line text-sm sm:text-base leading-relaxed">
        {post?.content}
      </p>

      {/* ================= POST IMAGES ================= */}
      {
        post?.files?.length > 0 && (
          <PostImages post={post} />
        )
      }

      {/* ================= POST ACTIONS ================= */}
      <PostActions post={post} />

      {/* ================= COMMENTS ================= */}
      <PostComments comments={post?.comments} />

      {/* ================= COMMENT INPUT (NO IMAGE ICON) ================= */}
      <CommentSection post={post} />

    </div>
  );
};

export default Post;
