import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className={` cursor-pointer
        h-9 w-9 rounded-full transition-all duration-300
        flex items-center justify-center
        shadow-md hover:shadow-lg
        backdrop-blur-sm bg-white/30 dark:bg-slate-700/30
        text-yellow-500 dark:text-purple-300
        focus:outline-none focus:ring-0
      `}
      style={{
        border: "none",
        padding: 0,
        margin: 0,
      }}
    >
      <div className="relative h-5 w-5">
        <Sun
          strokeWidth={2.5}
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 transform ${
            theme === "dark" ? "opacity-0 scale-90 rotate-90" : "opacity-100 scale-100 rotate-0"
          }`}
        />
        <Moon
          strokeWidth={2.5}
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 transform ${
            theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 -rotate-90"
          }`}
        />
      </div>
    </button>
  ); 
}