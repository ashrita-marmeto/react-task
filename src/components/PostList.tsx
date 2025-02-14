import { useParams, useNavigate } from "react-router-dom";
import { usePostContext } from "../context/PostContext";
import Post from "./Post";

const POSTS_PER_PAGE = 3;

const PostList = () => {
  const { tag, page } = useParams<{ tag?: string; page?: string }>();
  const navigate = useNavigate();
  const { posts } = usePostContext();

  const currentPage = page ? parseInt(page) : 1;
  const filteredPosts = tag
    ? posts.filter((post) => post.hashtags.includes(tag))
    : posts;
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      {paginatedPosts.length > 0 ? (
        paginatedPosts.map((post) => <Post key={post.id} {...post} />)
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No posts found.
        </p>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={() =>
            navigate(
              currentPage === 2
                ? "/"
                : tag
                ? `/tag/${tag}/page/${currentPage - 1}`
                : `/page/${currentPage - 1}`
            )
          }
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 dark:bg-gray-700 opacity-50 cursor-not-allowed"
              : "bg-gray-200 dark:bg-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Prev
        </button>

        <span className="text-gray-600 dark:text-gray-400 font-semibold">
          Page {currentPage}
        </span>

        <button
          onClick={() =>
            navigate(
              tag
                ? `/tag/${tag}/page/${currentPage + 1}`
                : `/page/${currentPage + 1}`
            )
          }
          disabled={paginatedPosts.length < POSTS_PER_PAGE}
          className={`px-4 py-2 rounded ${
            paginatedPosts.length < POSTS_PER_PAGE
              ? "bg-gray-300 dark:bg-gray-700 opacity-50 cursor-not-allowed"
              : "bg-gray-200 dark:bg-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PostList;
