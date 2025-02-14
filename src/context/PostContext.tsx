import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/storage";
import userPfp from "../assets/user-pfp.png";
import image1 from "../assets/image-1.jpg";
import image2 from "../assets/image-2.jpg";

interface Post {
  id: number;
  profilePic: string;
  name: string;
  username: string;
  timestamp: string;
  content: string;
  hashtags: string[];
  image?: string;
  likes: number;
}

interface PostContextType {
  posts: Post[];
  likePost: (id: number) => void;
  addPost: (newPost: Omit<Post, "id" | "timestamp">) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(() =>
    getLocalStorage("posts", [
      {
        id: 1,
        profilePic: userPfp,
        name: "User 1",
        username: "@user-1",
        timestamp: new Date().toLocaleString(),
        content: "Learning React! 🚀 ",
        hashtags: ["react"],
        image: image1,
        likes: 10,
      },
      {
        id: 2,
        profilePic: userPfp,
        name: "User 2",
        username: "@user-2",
        timestamp: new Date().toLocaleString(),
        content: "TypeScript is amazing!",
        hashtags: ["typescript"],
        likes: 5,
      },
      {
        id: 3,
        profilePic: userPfp,
        name: "User 3",
        username: "@user-3",
        timestamp: new Date().toLocaleString(),
        content: "Shopify is revolutionary!",
        hashtags: ["shopify"],
        image: image2,
        likes: 5,
      },
    ])
  );

  const likePost = (id: number) => {
    setPosts((prevPosts) => {
      const updated = prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      );
      setLocalStorage("posts", updated);
      return updated;
    });
  };

  const addPost = (newPost: Omit<Post, "id" | "timestamp">) => {
    const postWithId = {
      ...newPost,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
    };
    setPosts((prevPosts) => {
      const updated = [postWithId, ...prevPosts];
      setLocalStorage("posts", updated);
      return updated;
    });
  };

  return (
    <PostContext.Provider value={{ posts, likePost, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("usePostContext must be used within a PostProvider");
  return context;
};
