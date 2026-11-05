'use client';

import { useEffect } from 'react';

/** The GHL chat widget loads globally from the root layout for the rest of
 * the site. This page is a focused ad-landing page with one job (book a
 * consultation) — the widget's unprompted popup is exactly the kind of
 * competing distraction it's built to avoid, so hide it here only. */
export default function HideChatWidget() {
  useEffect(() => {
    const hide = () => {
      document
        .querySelectorAll('chat-widget, [id^="chat-widget"], [class*="chat-widget"], #chat-widget-container')
        .forEach((el) => {
          (el as HTMLElement).style.setProperty('display', 'none', 'important');
        });
    };
    hide();
    // The widget re-shows itself on a delay (its own greeting-bubble auto-open) and
    // can flip its own inline display style back — a one-shot hide doesn't survive
    // that, so keep watching attribute/style changes for the life of the page.
    const observer = new MutationObserver(hide);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class', 'data-active'] });
    return () => observer.disconnect();
  }, []);

  return null;
}
