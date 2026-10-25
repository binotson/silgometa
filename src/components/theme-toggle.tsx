"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/components/ui";
import { THEME_STORAGE_KEY as STORAGE_KEY } from "@/lib/theme";
function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  // React clears attributes on <html> when Strict Mode remounts in development;
  // re-apply the theme before paint. A no-op in production.
  useLayoutEffect(() => {
    if (document.documentElement.hasAttribute("data-theme")) return;
    let theme: string | null = null;
    try {
      theme = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode): the choice lasts for this page only.
    }
  }

  // Both icons are rendered and swapped with CSS, so server and client markup match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-sm border border-line text-navy-900 transition-colors hover:border-gold-500",
        className,
      )}
    >
      <Moon aria-hidden className="size-5 dark:hidden" />
      <Sun aria-hidden className="hidden size-5 dark:block" />
    </button>
  );
}
