import NoPostsState from "@/components/dashboard/Home/NoPostsState";
import PostForm from "@/components/dashboard/Home/PostForm";
import Post from "../../components/dashboard/Home/Post";
import { PostSkeletonList } from "@/components/dashboard/Home/PostSkeleton";
import { useFeed } from "@/hooks/announcement.hook";

const Home = () => {
  const { data: feedPosts, isLoading: isFeedLoading } = useFeed()
  const posts = feedPosts?.announcements || [];


  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <PostForm />
        {isFeedLoading ? (
          <PostSkeletonList />
        ) : posts.length === 0 ? (
          <NoPostsState />
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Home;
