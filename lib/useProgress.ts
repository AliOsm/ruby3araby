"use client";

import { useSyncExternalStore } from "react";
import { ProgressService } from "./progress";

/**
 * Subscribe to progress updates (localStorage changes and custom events)
 */
function subscribe(callback: () => void): () => void {
  // Listen for custom progress update events
  window.addEventListener("progressUpdate", callback);
  // Listen for storage changes from other tabs
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("progressUpdate", callback);
    window.removeEventListener("storage", callback);
  };
}

// Cache for completed lessons to avoid creating new arrays on every call
let completedLessonsCache: string[] = [];
let completedLessonsCacheKey = "";

function getCompletedLessonsSnapshot(): string[] {
  const lessons = ProgressService.getCompletedLessons();
  const key = lessons.join(",");

  // Only return a new array if the content changed
  if (key !== completedLessonsCacheKey) {
    completedLessonsCache = lessons;
    completedLessonsCacheKey = key;
  }

  return completedLessonsCache;
}

// Stable empty array for server snapshot (must be same reference every call)
const EMPTY_ARRAY: string[] = [];

/**
 * Hook to get completed lessons with hydration-safe localStorage access
 * Uses useSyncExternalStore for proper SSR/hydration handling
 */
export function useCompletedLessons(): string[] {
  return useSyncExternalStore(
    subscribe,
    getCompletedLessonsSnapshot,
    () => EMPTY_ARRAY // Server snapshot - stable reference
  );
}

/**
 * Hook to get the last visited lesson with hydration-safe localStorage access
 */
export function useLastLesson(): string | null {
  return useSyncExternalStore(
    subscribe,
    () => ProgressService.getLastLesson(),
    () => null // Server snapshot
  );
}

/**
 * Hook to get the count of completed lessons with hydration-safe localStorage access
 */
export function useCompletedCount(): number {
  return useSyncExternalStore(
    subscribe,
    () => ProgressService.getCompletedCount(),
    () => 0 // Server snapshot
  );
}
