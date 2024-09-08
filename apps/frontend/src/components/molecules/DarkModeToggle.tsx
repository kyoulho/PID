"use client";

import { useThemeStore } from "@/store/ThemeStore";
import { Button } from "@/components/atoms/Button";
import { useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  return (
    <Button onClick={toggleDarkMode}>
      <DarkModeIcon fontSize="large" />
    </Button>
  );
}
