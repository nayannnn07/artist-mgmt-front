"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      onClick={toggleTheme}
      className="border-foreground bg-background text-foreground hover:bg-primary/20 size-8 border-none shadow-none focus:ring-0 focus:ring-offset-0 focus:outline-none"
    >
      <span className="sr-only">Toggle Theme</span>
      {resolvedTheme === "dark" ? (
        <LuMoon className="size-5" />
      ) : (
        <LuSun className="size-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
