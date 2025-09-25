import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        relative flex items-center gap-2 px-4 py-2 rounded-2xl
        font-medium transition-all duration-200
        bg-gradient-to-r from-yellow-300 to-orange-400
        dark:from-indigo-500 dark:to-purple-700
        shadow-sm dark:shadow-lg
        hover:scale-105 hover:shadow-xl
        text-gray-700 dark:text-gray-100 cursor-pointer
      "
    >
      <span className="flex items-center gap-2 transition-transform duration-500">
        {theme === "dark" ? (
          <>
            <Moon className="w-5 h-5 animate-pulse" />
          </>
        ) : (
          <>
            <Sun className="w-5 h-5 animate-spin-slow" />
          </>
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
