import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaRetweet,
  FaBookmark,
  FaRegBookmark,
  FaShare,
} from "react-icons/fa";
import { usePostContext } from "../context/PostContext";
import userPfp from "../assets/user-pfp.png";

const Post = ({
  id,
  name,
  username,
  timestamp,
  content,
  hashtags,
  image,
  likes,
}: {
  id: number;
  profilePic: string;
  name: string;
  username: string;
  timestamp: string;
  content: string;
  hashtags: string[];
  image?: string;
  likes: number;
}) => {
  const { likePost } = usePostContext();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    likePost(id);
  };

  const handleComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-md dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        {/* Use dynamic profilePic instead of hardcoded import */}
        <img src={userPfp} alt="Profile" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-gray-500 dark:text-gray-400">
            {username} • {timestamp}
          </p>
        </div>
      </div>

      <p className="mt-2">{content}</p>

      {/* Use dynamic post image instead of hardcoded import */}
      {image && (
        <img src={image} alt="Post" className="mt-2 w-full rounded-md" />
      )}

      {/* Hashtags Section */}
      {hashtags.length > 0 && (
        <div className="mt-2">
          {hashtags.map((tag, index) => (
            <span
              key={index}
              className="text-blue-500 dark:text-blue-400 mr-2 cursor-pointer hover:underline"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex justify-between text-gray-600 dark:text-gray-400">
        {/* Like */}
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 p-2 group"
        >
          {isLiked ? (
            <FaHeart className="text-red-500 group-hover:scale-110 transition" />
          ) : (
            <FaRegHeart className="group-hover:text-red-500 group-hover:scale-110 transition" />
          )}
          <span>{likes}</span>
        </button>

        {/* Comment */}
        <button className="flex items-center space-x-1 p-2 group">
          <FaComment className="group-hover:text-blue-500 group-hover:scale-110 transition" />
          <span>{comments.length}</span>
        </button>

        {/* Repost */}
        <button className="flex items-center space-x-1 p-2 group">
          <FaRetweet className="group-hover:text-green-500 group-hover:scale-110 transition" />
        </button>

        {/* Bookmark */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="flex items-center space-x-1 p-2 group"
        >
          {isBookmarked ? (
            <FaBookmark className="text-blue-500 group-hover:scale-110 transition" />
          ) : (
            <FaRegBookmark className="group-hover:text-blue-500 group-hover:scale-110 transition" />
          )}
        </button>

        {/* Share */}
        <button className="flex items-center space-x-1 p-2 group">
          <FaShare className="group-hover:text-blue-500 group-hover:scale-110 transition" />
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={handleComment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 disabled:opacity-50"
          disabled={!comment.trim()}
        >
          Comment
        </button>

        {/* Display Comments */}
        {comments.length > 0 && (
          <div className="mt-3">
            {comments.map((cmt, index) => (
              <p
                key={index}
                className="text-gray-700 dark:text-gray-300 p-2 border-b dark:border-gray-700"
              >
                {cmt}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Post;
