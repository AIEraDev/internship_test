"use client";

import { cn } from "@/lib/utils";
import { useDarkMode } from "@/hooks/useDarkMode";

interface HtmlWithDarkModeProps {
  children: React.ReactNode;
  fontClass: string;
}

export function HtmlWithDarkMode({ children, fontClass }: HtmlWithDarkModeProps) {
  const { isDark } = useDarkMode();
  return (
    <html lang="en" className={cn(fontClass, isDark ? "dark" : "")} suppressHydrationWarning>
      {children}
    </html>
  );
}
