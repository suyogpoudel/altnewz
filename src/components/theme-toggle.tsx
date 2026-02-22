"use client";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      size="icon"
      variant="outline"
    >
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeToggle;
