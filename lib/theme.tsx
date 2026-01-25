"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "ruby3araby_theme";

/**
 * Get the system's preferred color scheme
 */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Get the initial theme from localStorage or default to system
 */
function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return "system";
}

/**
 * Resolve the actual theme based on preference
 */
function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider component that manages dark/light theme state
 * - Persists preference in localStorage
 * - Defaults to system preference
 * - Theme is applied via inline script in layout.tsx to prevent flash
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize with stored theme using lazy initialization
  // The inline script in layout.tsx already applies the theme class before hydration
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window !== "undefined" ? getStoredTheme() : "system"
  );
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    typeof window !== "undefined" ? resolveTheme(getStoredTheme()) : "dark"
  );

  // Apply theme to document with smooth transition
  const applyTheme = useCallback((resolved: ResolvedTheme, enableTransition = true) => {
    const root = document.documentElement;

    // Add transition class for smooth color changes
    if (enableTransition) {
      root.classList.add("theme-transition");
    }

    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    // Also set data attribute for CSS selectors
    root.setAttribute("data-theme", resolved);

    // Remove transition class after animation completes
    if (enableTransition) {
      setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 300);
    }
  }, []);

  // Set theme and persist to localStorage
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      const resolved = resolveTheme(newTheme);
      setResolvedTheme(resolved);
      applyTheme(resolved);

      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // localStorage not available
      }

      // Dispatch custom event for components that need to react
      window.dispatchEvent(
        new CustomEvent("themeChange", { detail: { theme: newTheme, resolved } })
      );
    },
    [applyTheme]
  );

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // Check current theme preference - this handler captures the latest setters
      const storedTheme = getStoredTheme();
      if (storedTheme === "system") {
        const resolved = getSystemTheme();
        setResolvedTheme(resolved);
        // Apply theme directly since we're inside an effect callback
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(resolved);
        root.setAttribute("data-theme", resolved);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const value = {
    theme,
    resolvedTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
