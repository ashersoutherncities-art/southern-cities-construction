'use client';

import { useSyncExternalStore } from 'react';

function subscribeBrowser(onChange: () => void) {
  const events = ['focus', 'pageshow', 'storage'];
  for (const event of events) window.addEventListener(event, onChange);
  return () => { for (const event of events) window.removeEventListener(event, onChange); };
}

/** Read primitive browser state with an explicit, hydration-safe server value. */
export function useBrowserSnapshot<T>(read: () => T, serverValue: T, subscribe = subscribeBrowser): T {
  return useSyncExternalStore(subscribe, read, () => serverValue);
}
