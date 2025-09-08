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
    {
      id: 2,
      author: "Alice Johnson",
      authorImage: "https://i.pravatar.cc/150?img=3",
      time: "3 hours ago",
      content: "Loving the weather today!",
      images: ["https://picsum.photos/800/400?random=2"],
      likes: 15,
      comments: [
        {
          user: "Bob Lee",
          userImage: "https://i.pravatar.cc/150?img=4",
          text: "Me too! ☀️",
          time: "2 hours ago",
        },
      ],
      shares: 2,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 3,
      author: "Charlie Kim",
      authorImage: "https://i.pravatar.cc/150?img=5",
      time: "4 hours ago",
      content: "Check out this cool photo!",
      images: ["https://picsum.photos/800/400?random=3"],
      likes: 23,
      comments: [],
      shares: 1,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 4,
      author: "Diana Prince",
      authorImage: "https://i.pravatar.cc/150?img=6",
      time: "5 hours ago",
      content: "Had a great lunch with friends.",
      images: ["https://picsum.photos/800/400?random=4"],
      likes: 30,
      comments: [
        {
          user: "Clark Kent",
          userImage: "https://i.pravatar.cc/150?img=7",
          text: "Looks delicious!",
          time: "4 hours ago",
        },
      ],
      shares: 3,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 5,
      author: "Ethan Hunt",
      authorImage: "https://i.pravatar.cc/150?img=8",
      time: "6 hours ago",
      content: "Mission accomplished.",
      images: ["https://picsum.photos/800/400?random=5"],
      likes: 50,
      comments: [],
      shares: 10,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 6,
      author: "Fiona Gallagher",
      authorImage: "https://i.pravatar.cc/150?img=9",
      time: "7 hours ago",
      content: "Family time is the best time.",
      images: ["https://picsum.photos/800/400?random=6"],
      likes: 18,
      comments: [],
      shares: 0,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 7,
      author: "George Clooney",
      authorImage: "https://i.pravatar.cc/150?img=10",
      time: "8 hours ago",
      content: "Coffee break ☕",
      images: ["https://picsum.photos/800/400?random=7"],
      likes: 12,
      comments: [],
      shares: 1,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 8,
      author: "Hannah Montana",
      authorImage: "https://i.pravatar.cc/150?img=11",
      time: "9 hours ago",
      content: "Best of both worlds!",
      images: ["https://picsum.photos/800/400?random=8"],
      likes: 33,
      comments: [],
      shares: 4,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 9,
      author: "Ian Somerhalder",
      authorImage: "https://i.pravatar.cc/150?img=12",
      time: "10 hours ago",
      content: "Nature walk 🌲",
      images: ["https://picsum.photos/800/400?random=9"],
      likes: 27,
      comments: [],
      shares: 2,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 10,
      author: "Julia Roberts",
      authorImage: "https://i.pravatar.cc/150?img=13",
      time: "11 hours ago",
      content: "Smile and the world smiles with you.",
      images: ["https://picsum.photos/800/400?random=10"],
      likes: 40,
      comments: [],
      shares: 6,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 11,
      author: "Kevin Hart",
      authorImage: "https://i.pravatar.cc/150?img=14",
      time: "12 hours ago",
      content: "Laugh every day!",
      images: ["https://picsum.photos/800/400?random=11"],
      likes: 22,
      comments: [],
      shares: 3,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 12,
      author: "Laura Palmer",
      authorImage: "https://i.pravatar.cc/150?img=15",
      time: "13 hours ago",
      content: "Mystery of the day...",
      images: ["https://picsum.photos/800/400?random=12"],
      likes: 17,
      comments: [],
      shares: 1,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 13,
      author: "Mike Ross",
      authorImage: "https://i.pravatar.cc/150?img=16",
      time: "14 hours ago",
      content: "Case closed.",
      images: ["https://picsum.photos/800/400?random=13"],
      likes: 29,
      comments: [],
      shares: 2,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 14,
      author: "Nina Dobrev",
      authorImage: "https://i.pravatar.cc/150?img=17",
      time: "15 hours ago",
      content: "Sunset vibes 🌅",
      images: ["https://picsum.photos/800/400?random=14"],
      likes: 35,
      comments: [],
      shares: 5,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 15,
      author: "Oscar Isaac",
      authorImage: "https://i.pravatar.cc/150?img=18",
      time: "16 hours ago",
      content: "Movie night!",
      images: ["https://picsum.photos/800/400?random=15"],
      likes: 21,
      comments: [],
      shares: 2,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 16,
      author: "Pam Beesly",
      authorImage: "https://i.pravatar.cc/150?img=19",
      time: "17 hours ago",
      content: "Art is life.",
      images: ["https://picsum.photos/800/400?random=16"],
      likes: 19,
      comments: [],
      shares: 1,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 17,
      author: "Quentin Tarantino",
      authorImage: "https://i.pravatar.cc/150?img=20",
      time: "18 hours ago",
      content: "What's your favorite movie?",
      images: ["https://picsum.photos/800/400?random=17"],
      likes: 44,
      comments: [],
      shares: 7,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 18,
      author: "Rachel Green",
      authorImage: "https://i.pravatar.cc/150?img=21",
      time: "19 hours ago",
      content: "Shopping spree 🛍️",
      images: ["https://picsum.photos/800/400?random=18"],
      likes: 28,
      comments: [],
      shares: 3,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 19,
      author: "Steve Rogers",
      authorImage: "https://i.pravatar.cc/150?img=22",
      time: "20 hours ago",
      content: "On your left.",
      images: ["https://picsum.photos/800/400?random=19"],
      likes: 60,
      comments: [],
      shares: 12,
      isLiked: false,
      isSaved: false,
      postType: "public",
    },
    {
      id: 20,
      author: "Tony Stark",
      authorImage: "https://i.pravatar.cc/150?img=23",
      time: "21 hours ago",
      content: "I am Iron Man.",
      images: ["https://picsum.photos/800/400?random=20"],
      likes: 100,
      comments: [],
      shares: 20,
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
    <div className="max-w-3xl mx-auto p-4 bg-[#f9fafb] dark:bg-zinc-950 h-full">
      <PostForm onSubmit={handleSubmitPost} />
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={handleLike}
          onSave={handleSave}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onCommentSubmit={handleCommentSubmit}
        />
      ))}
    </div>
  );
};

export default Home;
