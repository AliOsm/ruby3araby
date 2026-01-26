"use client";

import { useEffect, useState, useRef } from "react";
import { registerServiceWorker, skipWaitingAndReload } from "@/lib/sw-register";
import { OfflineIndicator } from "./OfflineIndicator";
import { InstallPrompt } from "./InstallPrompt";

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Register service worker
    registerServiceWorker().then((result) => {
      if (result.success && result.registration) {
        setRegistration(result.registration);
        if (result.cleanup) {
          cleanupRef.current = result.cleanup;
        }
      }
    });

    // Listen for update events
    const handleUpdate = (event: CustomEvent<ServiceWorkerRegistration>) => {
      setRegistration(event.detail);
      setUpdateAvailable(true);
    };

    window.addEventListener("swUpdate", handleUpdate as EventListener);

    return () => {
      window.removeEventListener("swUpdate", handleUpdate as EventListener);
      // Clean up the update interval
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  const handleUpdate = () => {
    if (registration) {
      skipWaitingAndReload(registration);
    }
  };

  return (
    <>
      {children}
      <OfflineIndicator />
      <InstallPrompt />

      {/* Update available notification */}
      {updateAvailable && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-blue-900/90 text-blue-100 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <svg
            className="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="font-medium">تحديث متاح</p>
          </div>
          <button
            onClick={handleUpdate}
            className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 rounded text-sm font-medium transition-colors"
          >
            تحديث
          </button>
          <button
            onClick={() => setUpdateAvailable(false)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="إغلاق"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
