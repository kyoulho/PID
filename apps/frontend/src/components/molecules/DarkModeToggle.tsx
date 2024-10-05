"use client";

import { useThemeStore } from "@/store/ThemeStore";
import { useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  return (
    <button onClick={toggleDarkMode}>
      <DarkModeIcon fontSize="large" />
    </button>
  );
}
