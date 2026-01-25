"use client";

/**
 * Mobile menu button that dispatches a custom event to toggle the sidebar
 * Used in headers where the button needs to be inside the layout
 */
export default function MobileMenuButton() {
  return (
    <button
      onClick={() => document.dispatchEvent(new CustomEvent("toggle-sidebar"))}
      className="shrink-0 text-foreground/70 transition-colors hover:text-ruby-primary lg:hidden"
      aria-label="فتح القائمة"
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
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
