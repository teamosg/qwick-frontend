import { useGetSavedAnnouncements } from "@/hooks/announcement.hook";
import SavedPostCard from "./SavedPostCard";
import { Loader2 } from "lucide-react";

const SavedPosts = () => {
  const { data: savedPosts, isLoading } = useGetSavedAnnouncements();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  if (!savedPosts?.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No saved posts found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {savedPosts.map((post, index) => (
        <SavedPostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};

export default SavedPosts;
