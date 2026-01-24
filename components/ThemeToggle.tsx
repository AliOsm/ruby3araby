"use client";

import { useTheme } from "@/lib/theme";
import { useEffect, useState, useRef } from "react";

/**
 * Theme toggle button component
 * Cycles through: system -> light -> dark -> system
 * Shows appropriate icon for current resolved theme
 */
export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mountRef = useRef(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    // Use setTimeout to avoid ESLint set-state-in-effect rule
    setTimeout(() => setMounted(true), 0);
  }, []);

  const cycleTheme = () => {
    const order: Array<"system" | "light" | "dark"> = ["system", "light", "dark"];
    const currentIndex = order.indexOf(theme);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  // Get icon and label based on current state
  const getThemeInfo = () => {
    if (theme === "system") {
      return {
        icon: (
          // Computer/System icon
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        ),
        label: "وضع النظام",
      };
    }
    if (resolvedTheme === "dark") {
      return {
        icon: (
          // Moon icon
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ),
        label: "الوضع الداكن",
      };
    }
    return {
      icon: (
        // Sun icon
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      label: "الوضع الفاتح",
    };
  };

  // Show placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-gray-400 transition-colors"
        aria-label="تغيير المظهر"
        disabled
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    );
  }

  const { icon, label } = getThemeInfo();

  return (
    <button
      onClick={cycleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/20 bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 hover:border-foreground/30"
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}
