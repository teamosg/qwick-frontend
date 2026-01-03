import NoPostsState from "@/components/dashboard/Home/NoPostsState";
import PostForm from "@/components/dashboard/Home/PostForm";
import Post from "../../components/dashboard/Home/Post";
import { PostSkeletonList } from "@/components/dashboard/Home/PostSkeleton";
import { useFeed } from "@/hooks/announcement.hook";

const Home = () => {
  const { data: feedPosts, isLoading: isFeedLoading } = useFeed()
  const posts = feedPosts?.announcements || [];


  return (
    <div
      className="p-4"
    >
      <div className="w-full border rounded-2xl mx-auto p-2 md:p-6 space-y-6 bg-[#F5F5F5] dark:bg-transparent c h-full max-w-5xl">
        <PostForm />
        {
          isFeedLoading ? (
            <PostSkeletonList />
          ) : (
            /* Show NoPostsState when there are no posts */
            posts.length === 0 ? (
              <NoPostsState />
            ) : (
              posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                />
              ))
            )
          )
        }
      </div>
    </div>
  );
};

export default Home;
