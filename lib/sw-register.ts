// Service Worker Registration
// Handles SW registration and update notifications

export interface SWRegistrationResult {
  success: boolean;
  registration?: ServiceWorkerRegistration;
  error?: Error;
  cleanup?: () => void;
}

// Track if we've already set up the controllerchange listener
let controllerChangeListenerAdded = false;

export async function registerServiceWorker(): Promise<SWRegistrationResult> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return { success: false };
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    // Check for updates periodically
    const updateInterval = setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000); // Check every hour

    // Handle updates
    const handleUpdateFound = () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, dispatch event for UI to handle
            window.dispatchEvent(new CustomEvent('swUpdate', { detail: registration }));
          }
        });
      }
    };

    registration.addEventListener('updatefound', handleUpdateFound);

    // Return cleanup function to clear interval
    const cleanup = () => {
      clearInterval(updateInterval);
      registration.removeEventListener('updatefound', handleUpdateFound);
    };

    return { success: true, registration, cleanup };
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return { success: false, error: error as Error };
  }
}

export function skipWaitingAndReload(registration: ServiceWorkerRegistration): void {
  const waiting = registration.waiting;
  if (waiting) {
    // Only add the controllerchange listener once
    if (!controllerChangeListenerAdded) {
      controllerChangeListenerAdded = true;
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    }

    waiting.postMessage({ type: 'SKIP_WAITING' });
  }
}
