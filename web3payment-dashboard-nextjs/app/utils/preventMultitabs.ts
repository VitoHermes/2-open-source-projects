declare global {
  interface Window {
    id: number;
    multipleTabsDetected: boolean;
  }
}

const APP_NAME = 'PayPAI';
const STORAGE_KEYS = {
  FIRST_TAB: 'payPai_firstTab',
  SECOND_TAB: 'payPai_secondTab',
  HEARTBEAT: 'payPai_heartbeat',
};

/**
 * Prevents multiple tabs of the app from being open simultaneously
 * Works on both desktop and mobile browsers
 */
export default function preventMultipleTabs(url: string): void {
  try {
    const id: number = Date.now();
    window.id = id;

    window.name = APP_NAME;

    window.localStorage.setItem(STORAGE_KEYS.FIRST_TAB, `${id}`);

    const onStorageEvent = (e: StorageEvent): void => {
      if (!e || e.key === null) return;

      if (e.key === STORAGE_KEYS.FIRST_TAB) {
        const newID = Date.now();
        console.log('Another tab detected. Redirecting to existing tab.');

        window.onbeforeunload = null;

        try {
          window.open(url, APP_NAME);

          window.localStorage.setItem(STORAGE_KEYS.SECOND_TAB, `${newID}`);
          window.close();

          if (window.parent && window.parent !== window) {
            window.parent.close();
          }
        } catch (closeError) {
          console.warn('Failed to close tab automatically:', closeError);
          if (/Mobi|Android/i.test(navigator.userAgent)) {
            alert('Please close this tab. The app is already open in another tab.');
          }
        }
      }

      if (
        e.key === STORAGE_KEYS.SECOND_TAB &&
        window.id.toString() === window.localStorage.getItem(STORAGE_KEYS.FIRST_TAB)
      ) {
        console.log('Confirmed as the primary tab.');
        window.multipleTabsDetected = true;

        window.focus();
      }
    };

    setTimeout(() => {
      window.addEventListener('storage', onStorageEvent);

      const checkExistingTabs = () => {
        const heartbeat = window.localStorage.getItem(STORAGE_KEYS.HEARTBEAT);
        if (heartbeat) {
          const [tabId, timestamp] = heartbeat.split(':');
          if (
            tabId !==
              `${
                // biome-ignore lint/style/useNumberNamespace: <explanation>
                id
              }` &&
            // biome-ignore lint/style/useNumberNamespace: <explanation>
            Date.now() - parseInt(timestamp || '0') < 3000
          ) {
            onStorageEvent(
              new StorageEvent('storage', {
                key: STORAGE_KEYS.FIRST_TAB,
              }),
            );
            return true;
          }
        }
        return false;
      };

      if (!checkExistingTabs()) {
        setInterval(checkExistingTabs, 2000);
      }
    }, 100);

    window.addEventListener('beforeunload', () => {
      if (window.localStorage.getItem(STORAGE_KEYS.FIRST_TAB) === `${id}`) {
        window.localStorage.removeItem(STORAGE_KEYS.FIRST_TAB);
      }
    });
  } catch (error) {
    console.error('Multiple tab prevention failed:', error);
  }
}
