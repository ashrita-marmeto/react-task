import { usePostContext } from "../context/PostContext";
import { Link } from "react-router-dom";

const HashtagSidebar = () => {
  const { posts } = usePostContext();

  const allHashtags = posts.flatMap((post) => post.hashtags);
  const hashtagCounts = allHashtags.reduce(
    (acc: Record<string, number>, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    },
    {}
  );

  const sortedTags = Object.keys(hashtagCounts).sort(
    (a, b) => hashtagCounts[b] - hashtagCounts[a]
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-md shadow-md sticky top-4 transition-all duration-300">
      <h2 className="text-xl font-bold mb-2">Trending</h2>
      <ul>
        {sortedTags.length > 0 ? (
          sortedTags.map((tag) => (
            <li key={tag} className="mb-2">
              <Link
                to={`/tag/${tag.slice(0)}`}
                className="text-blue-500 dark:text-blue-400 font-semibold hover:underline"
              >
                {tag} ({hashtagCounts[tag]})
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No hashtags yet.</p>
        )}
      </ul>
    </div>
  );
};

export default HashtagSidebar;
