"use client";

import { useTheme } from "@/lib/theme";
import { useEffect, useState, useRef, useCallback } from "react";

// Icon components for each theme option
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function SystemIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

type ThemeOption = "light" | "dark" | "system";

interface ThemeMenuItem {
  value: ThemeOption;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const themeOptions: ThemeMenuItem[] = [
  { value: "light", label: "فاتح", icon: SunIcon },
  { value: "dark", label: "داكن", icon: MoonIcon },
  { value: "system", label: "تلقائي", icon: SystemIcon },
];

/**
 * Theme toggle dropdown component
 * Shows a dropdown menu to select theme (Light/Dark/System)
 * with icons and checkmark for current selection
 */
export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const mountRef = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    setTimeout(() => setMounted(true), 0);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Focus menu item when dropdown opens or focus changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      menuItemRefs.current[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        // When opening, focus the current theme option
        const currentIndex = themeOptions.findIndex((opt) => opt.value === theme);
        setFocusedIndex(currentIndex);
      }
      return !prev;
    });
  }, [theme]);

  const handleSelect = useCallback(
    (value: ThemeOption) => {
      setTheme(value);
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    },
    [setTheme]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
          event.preventDefault();
          handleToggle();
        }
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev < themeOptions.length - 1 ? prev + 1 : 0;
            menuItemRefs.current[next]?.focus();
            return next;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev > 0 ? prev - 1 : themeOptions.length - 1;
            menuItemRefs.current[next]?.focus();
            return next;
          });
          break;
        case "Home":
          event.preventDefault();
          setFocusedIndex(0);
          menuItemRefs.current[0]?.focus();
          break;
        case "End":
          event.preventDefault();
          setFocusedIndex(themeOptions.length - 1);
          menuItemRefs.current[themeOptions.length - 1]?.focus();
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (focusedIndex >= 0) {
            handleSelect(themeOptions[focusedIndex].value);
          }
          break;
        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    },
    [isOpen, focusedIndex, handleToggle, handleSelect]
  );

  // Icon for trigger button - uses CSS to switch based on actual theme class
  // This avoids hydration mismatch since CSS reads from DOM, not React state
  const ThemeIcon = () => {
    if (theme === "system") {
      return <SystemIcon className="h-5 w-5" />;
    }
    // Use CSS-based switching to avoid flash during hydration
    return (
      <>
        <SunIcon className="h-5 w-5 dark:hidden" />
        <MoonIcon className="h-5 w-5 hidden dark:block" />
      </>
    );
  };

  // Show placeholder during SSR with CSS-based icon switching
  // The inline script in layout.tsx sets the theme class before React hydrates
  if (!mounted) {
    return (
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/20 bg-foreground/5 text-foreground transition-colors"
        aria-label="تغيير المظهر"
        disabled
      >
        {/* Show sun in light mode, moon in dark mode via CSS */}
        <SunIcon className="h-5 w-5 dark:hidden" />
        <MoonIcon className="h-5 w-5 hidden dark:block" />
      </button>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/20 bg-foreground/5 text-foreground transition-colors hover:bg-foreground/10 hover:border-foreground/30"
        aria-label="تغيير المظهر"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <ThemeIcon />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="اختر المظهر"
          className="absolute left-0 top-full z-50 mt-2 min-w-[140px] origin-top-left rounded-lg border border-foreground/20 bg-background py-1 shadow-lg"
          onKeyDown={handleKeyDown}
        >
          {themeOptions.map((option, index) => {
            const Icon = option.icon;
            const isSelected = theme === option.value;

            return (
              <button
                key={option.value}
                ref={(el) => {
                  menuItemRefs.current[index] = el;
                }}
                role="menuitem"
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? "bg-ruby-primary/10 text-ruby-primary"
                    : "text-foreground hover:bg-foreground/5"
                } ${focusedIndex === index ? "bg-foreground/10" : ""}`}
                tabIndex={focusedIndex === index ? 0 : -1}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-right">{option.label}</span>
                {isSelected && <CheckIcon className="h-4 w-4 text-ruby-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
