import NoPostsState from "@/components/dashboard/Home/NoPostsState";
import PostForm from "@/components/dashboard/Home/PostForm";
import Post from "../../components/dashboard/Home/Post";
import { PostSkeletonList } from "@/components/dashboard/Home/PostSkeleton";
import { useFeed } from "@/hooks/announcement.hook";

const Home = () => {
  const { data: feedPosts, isLoading: isFeedLoading } = useFeed()
  console.log(feedPosts);

  const posts = feedPosts?.announcements || [];

  const handleSubmitPost = (newPost) => {
    const post = {
      id: Date.now(),
      author: "Current User",
      authorImage: "https://i.pravatar.cc/150?img=5",
      time: "Just now",
      content: newPost.content,
      images: newPost.images || [],
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false,
      isSaved: false,
      postType: "public",
    };

    console.log(post);
  };


  return (
    <div className="w-full border rounded-2xl mx-auto p-6 bg-[#F5F5F5] dark:bg-transparent c h-full max-w-5xl">
      <PostForm onSubmit={handleSubmitPost} />
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
  );
};

export default Home;
