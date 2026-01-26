"use client";

import { useEffect, useState, useRef } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const STORAGE_KEY = "ruby3araby_install_dismissed";
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// Track if prompt was shown this session (prevents repeated showing on navigation)
let shownThisSession = false;

// Helper to check if dismissed recently
function isDismissedRecently(): boolean {
  const dismissedAt = localStorage.getItem(STORAGE_KEY);
  return !!(
    dismissedAt &&
    Date.now() - parseInt(dismissedAt) < DISMISS_DURATION
  );
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if already shown this session
    if (shownThisSession) {
      return;
    }

    // Check if dismissed recently
    if (isDismissedRecently()) {
      return;
    }

    // Detect iOS
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as { MSStream?: unknown }).MSStream;

    if (isIOS) {
      // Show iOS guide after delay
      timerRef.current = setTimeout(() => {
        // Double-check dismissal before showing (in case user dismissed on another page)
        if (!isDismissedRecently()) {
          shownThisSession = true;
          setShowIOSGuide(true);
        }
      }, 30000); // 30 seconds
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }

    // Handle beforeinstallprompt for Chrome/Edge/Android
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after delay (only if not shown this session and no pending timer)
      if (!shownThisSession && !timerRef.current) {
        timerRef.current = setTimeout(() => {
          timerRef.current = null;
          // Double-check dismissal before showing (in case user dismissed on another page)
          if (!isDismissedRecently()) {
            shownThisSession = true;
            setShowPrompt(true);
          }
        }, 30000); // 30 seconds
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Handle successful install
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      // Clear any pending timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setShowPrompt(false);
    setShowIOSGuide(false);
  };

  if (isInstalled) return null;

  // Chrome/Edge/Android install prompt
  if (showPrompt && deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center shrink-0">
              <svg
                className="w-7 h-7 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-base">
                تثبيت روبي عربي
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                ثبّت التطبيق للوصول السريع والتعلم بدون إنترنت
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1.5 -mt-1 -mr-1 hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="إغلاق"
            >
              <svg
                className="w-5 h-5 text-neutral-500"
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

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleInstall}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
            >
              تثبيت
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            >
              لاحقاً
            </button>
          </div>
        </div>
      </div>
    );
  }

  // iOS install guide
  if (showIOSGuide) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center shrink-0">
              <svg
                className="w-7 h-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-base">
                أضف للشاشة الرئيسية
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                للوصول السريع والتعلم بدون إنترنت
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1.5 -mt-1 -mr-1 hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="إغلاق"
            >
              <svg
                className="w-5 h-5 text-neutral-500"
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

          <div className="mt-4 bg-neutral-800/50 rounded-lg p-3">
            <ol className="text-sm text-neutral-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-700 flex items-center justify-center text-xs shrink-0">
                  1
                </span>
                <span>
                  اضغط على زر{" "}
                  <span className="inline-flex items-center gap-1 text-blue-400">
                    المشاركة
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
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-700 flex items-center justify-center text-xs shrink-0">
                  2
                </span>
                <span>اختر &quot;إضافة إلى الشاشة الرئيسية&quot;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-700 flex items-center justify-center text-xs shrink-0">
                  3
                </span>
                <span>اضغط &quot;إضافة&quot;</span>
              </li>
            </ol>
          </div>

          <button
            onClick={handleDismiss}
            className="w-full mt-3 px-4 py-2.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors text-sm"
          >
            تم الفهم
          </button>
        </div>
      </div>
    );
  }

  return null;
}
