// Service Worker Registration
// Handles SW registration and update notifications

export interface SWRegistrationResult {
  success: boolean;
  registration?: ServiceWorkerRegistration;
  error?: Error;
}

export async function registerServiceWorker(): Promise<SWRegistrationResult> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return { success: false };
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000); // Check every hour

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, dispatch event for UI to handle
            window.dispatchEvent(new CustomEvent('swUpdate', { detail: registration }));
          }
        });
      }
    });

    return { success: true, registration };
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return { success: false, error: error as Error };
  }
}

export function skipWaitingAndReload(registration: ServiceWorkerRegistration): void {
  const waiting = registration.waiting;
  if (waiting) {
    waiting.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }
}
