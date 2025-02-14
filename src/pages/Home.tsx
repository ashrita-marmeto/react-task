import { Link } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import HashtagSidebar from "../components/HashtagSidebar";
import ThemeToggle from "../components/ThemeToggle";
import { MdHomeFilled } from "react-icons/md";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row mx-auto p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      {/* Left Sidebar - Home Button & Theme Toggle */}
      <div className="md:w-1/12 w-full flex md:flex-col justify-between md:justify-start md:items-end pr-8 md:pr-4">
        <div className="sticky top-4 flex md:flex-col md:space-y-4">
          {/* Home Button */}
          <Link
            to="/"
            className="flex items-center justify-center bg-blue-500 text-white text-lg font-bold mt-6 p-3 rounded-md hover:bg-blue-600 transition w-full md:w-auto"
          >
            <MdHomeFilled className="text-2xl" />
          </Link>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>

      {/* Center Feed - Posts & CreatePost */}
      <div className="md:w-7/12 w-full p-4 border-gray-300 dark:border-gray-700 transition-all duration-300">
        <h1 className="text-2xl font-bold">For You</h1>
        <CreatePost />
        <PostList />
      </div>

      {/* Right Sidebar - Hashtags + Search */}
      <div className="md:w-4/12 w-full md:pl-8 mt-4 md:mt-0">
        <div className="sticky top-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search hashtags..."
              className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          <HashtagSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
