import { useTheme } from "../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-gray-700 dark:text-white transition-all"
    >
      {theme === "light" ? (
        <MdDarkMode className="text-2xl" />
      ) : (
        <MdLightMode className="text-2xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
