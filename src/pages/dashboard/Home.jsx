import NoPostsState from "@/components/dashboard/Home/NoPostsState";
import PostForm from "@/components/dashboard/Home/PostForm";
import { useState } from "react";
import Post from "../../components/dashboard/Home/Post";

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "John Doe",
      authorImage: "https://i.pravatar.cc/150?img=1",
      time: "2 hours ago",
      content: "This is a sample post with comments!",
      images: ["https://picsum.photos/800/400?random=1"],
      likes: 42,
      comments: [
        {
          user: "Jane Smith",
          userImage: "https://i.pravatar.cc/150?img=2",
          text: "Great post! 😊",
          time: "1 hour ago",
        },
      ],
      shares: 5,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
  ]);

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
    setPosts([post, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleSave = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isSaved: !post.isSaved,
          };
        }
        return post;
      })
    );
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleEdit = (postId) => {
    console.log("Edit post:", postId);
  };

  const handleCommentSubmit = (postId, comment) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                user: "Current User",
                userImage: "https://i.pravatar.cc/150?img=5",
                text: comment.text,
                image: comment.image,
                time: "Just now",
              },
            ],
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="w-full border rounded-2xl mx-auto p-6 bg-[#F5F5F5] dark:bg-zinc-950 h-full max-w-5xl">
      <PostForm onSubmit={handleSubmitPost} />

      {/* Show NoPostsState when there are no posts */}
      {posts.length === 0 ? (
        <NoPostsState />
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onLike={handleLike}
            onSave={handleSave}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onCommentSubmit={handleCommentSubmit}
          />
        ))
      )}
    </div>
  );
};

export default Home;
