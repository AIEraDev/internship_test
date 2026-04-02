"use client";

import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Button variant="outline" size="icon" className="dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600" onClick={toggle} aria-label={mounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle dark mode"}>
      {mounted ? isDark ? <Sun /> : <Moon /> : <Moon />}
    </Button>
  );
}
