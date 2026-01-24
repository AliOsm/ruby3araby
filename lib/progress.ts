/**
 * Progress Service for Ruby3araby
 *
 * Manages learner progress persistence using localStorage:
 * - Lesson completion tracking
 * - Code saving/loading per lesson
 * - Last visited lesson tracking
 */

// localStorage key prefixes
const STORAGE_PREFIX = "ruby3araby_";
const COMPLETED_KEY = `${STORAGE_PREFIX}completed`;
const LAST_LESSON_KEY = `${STORAGE_PREFIX}last_lesson`;
const CODE_PREFIX = `${STORAGE_PREFIX}code_`;

/**
 * Represents stored progress data
 */
interface ProgressData {
  completedLessons: string[];
  lastUpdated: string;
}

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = `${STORAGE_PREFIX}test`;
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get progress data from localStorage
 */
function getProgressData(): ProgressData {
  if (!isLocalStorageAvailable()) {
    return { completedLessons: [], lastUpdated: new Date().toISOString() };
  }

  try {
    const stored = localStorage.getItem(COMPLETED_KEY);
    if (stored) {
      return JSON.parse(stored) as ProgressData;
    }
  } catch {
    // Invalid JSON, reset
  }

  return { completedLessons: [], lastUpdated: new Date().toISOString() };
}

/**
 * Save progress data to localStorage
 */
function saveProgressData(data: ProgressData): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(data));
  } catch {
    // Storage quota exceeded or other error, fail silently
  }
}

/**
 * ProgressService - Singleton service for managing learner progress
 */
export const ProgressService = {
  /**
   * Mark a lesson as completed
   * @param lessonId - The lesson identifier (format: "section-slug/lesson-slug")
   */
  markComplete(lessonId: string): void {
    const data = getProgressData();
    if (!data.completedLessons.includes(lessonId)) {
      data.completedLessons.push(lessonId);
      data.lastUpdated = new Date().toISOString();
      saveProgressData(data);
    }
  },

  /**
   * Check if a lesson is completed
   * @param lessonId - The lesson identifier
   * @returns true if the lesson has been marked as completed
   */
  isComplete(lessonId: string): boolean {
    const data = getProgressData();
    return data.completedLessons.includes(lessonId);
  },

  /**
   * Get all completed lesson IDs
   * @returns Array of completed lesson identifiers
   */
  getCompletedLessons(): string[] {
    const data = getProgressData();
    return data.completedLessons;
  },

  /**
   * Get the count of completed lessons
   * @returns Number of completed lessons
   */
  getCompletedCount(): number {
    return this.getCompletedLessons().length;
  },

  /**
   * Get the last visited lesson
   * @returns The last lesson ID or null if none saved
   */
  getLastLesson(): string | null {
    if (!isLocalStorageAvailable()) {
      return null;
    }

    try {
      return localStorage.getItem(LAST_LESSON_KEY);
    } catch {
      return null;
    }
  },

  /**
   * Set the last visited lesson
   * @param lessonId - The lesson identifier
   */
  setLastLesson(lessonId: string): void {
    if (!isLocalStorageAvailable()) {
      return;
    }

    try {
      localStorage.setItem(LAST_LESSON_KEY, lessonId);
    } catch {
      // Storage error, fail silently
    }
  },

  /**
   * Save code for a specific lesson
   * @param lessonId - The lesson identifier
   * @param code - The code to save
   */
  saveCode(lessonId: string, code: string): void {
    if (!isLocalStorageAvailable()) {
      return;
    }

    try {
      const key = `${CODE_PREFIX}${lessonId}`;
      localStorage.setItem(key, code);
    } catch {
      // Storage quota exceeded or other error, fail silently
    }
  },

  /**
   * Load saved code for a specific lesson
   * @param lessonId - The lesson identifier
   * @returns The saved code or null if none exists
   */
  loadCode(lessonId: string): string | null {
    if (!isLocalStorageAvailable()) {
      return null;
    }

    try {
      const key = `${CODE_PREFIX}${lessonId}`;
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  /**
   * Clear saved code for a specific lesson
   * @param lessonId - The lesson identifier
   */
  clearCode(lessonId: string): void {
    if (!isLocalStorageAvailable()) {
      return;
    }

    try {
      const key = `${CODE_PREFIX}${lessonId}`;
      localStorage.removeItem(key);
    } catch {
      // Storage error, fail silently
    }
  },

  /**
   * Clear all progress data
   * Use with caution - this resets all learner progress
   */
  clearAllProgress(): void {
    if (!isLocalStorageAvailable()) {
      return;
    }

    try {
      // Remove completed lessons
      localStorage.removeItem(COMPLETED_KEY);
      // Remove last lesson
      localStorage.removeItem(LAST_LESSON_KEY);
      // Remove all saved code
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(CODE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    } catch {
      // Storage error, fail silently
    }
  },

  /**
   * Check if localStorage is available
   * @returns true if localStorage can be used
   */
  isAvailable(): boolean {
    return isLocalStorageAvailable();
  },
};

/**
 * Creates a debounced version of a function
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Creates a debounced code saver for a specific lesson
 * @param lessonId - The lesson identifier
 * @param delayMs - Debounce delay in milliseconds (default: 1000)
 * @returns Debounced save function
 */
export function createDebouncedCodeSaver(
  lessonId: string,
  delayMs: number = 1000
): (code: string) => void {
  return debounce((code: string) => {
    ProgressService.saveCode(lessonId, code);
  }, delayMs);
}
