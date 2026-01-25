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

function getCompletedLessonsSnapshot(): string[] {
  const lessons = ProgressService.getCompletedLessons();

  // Fast path: length changed = definitely different
  if (lessons.length !== completedLessonsCache.length) {
    completedLessonsCache = lessons;
    return completedLessonsCache;
  }

  // Slow path: compare contents only if lengths match
  for (let i = 0; i < lessons.length; i++) {
    if (lessons[i] !== completedLessonsCache[i]) {
      completedLessonsCache = lessons;
      return completedLessonsCache;
    }
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
