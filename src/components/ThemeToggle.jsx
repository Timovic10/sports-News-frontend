import { useState, useEffect } from "react";
import { toggleTheme } from "../theme.jsx";
import { MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleToggle = () => {
    toggleTheme();
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full text-black dark:text-white transition-colors duration-300"
    >
      {isDark ? (
        <MdLightMode color="#fff" size={20} />
      ) : (
        <MdLightMode color="#fff" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
