import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import CartToast from "@/components/CartToast";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * Root layout metadata.
 *
 * The canonical here points to the HOMEPAGE ('/'). It is inherited by
 * the homepage automatically, which is what we want.
 *
 * Every OTHER page in the app MUST declare its own self-referencing
 * canonical via `alternates.canonical` in its own `metadata` export
 * (or sibling layout.tsx for client-component pages). If a page does
 * not override, Google will incorrectly index it as a duplicate of
 * the homepage. This was the bug that nuked SEO.
 *
 * Likewise, never inject <link rel="canonical"> in <head> from this
 * root layout — it would clobber per-page canonicals defined via the
 * Metadata API.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  // Per-page titles already include "| Southern Cities Construction" — NO
  // title.template here, otherwise the brand suffix double-stamps. This is
  // the default that applies ONLY when a page doesn't export its own title.
  title: `${SITE_CONFIG.name} | A Construction Platform, Backed by a Licensed GC — Charlotte, NC`,
  description: SITE_CONFIG.positioning.metaDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    url: '/',
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    title: `${SITE_CONFIG.name} | A Construction Platform, Backed by a Licensed GC — Charlotte, NC`,
    description: SITE_CONFIG.positioning.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.legalName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LocalBusinessJsonLd />
        {children}
        <CartToast />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18126177237"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18126177237');
          `}
        </Script>
        <Script
          id="ghl-chat-widget"
          src="https://widgets.leadconnectorhq.com/loader.js"
          strategy="afterInteractive"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69f10ea01913342fc0114339"
          data-source="WEB_USER"
        />
        <Script id="ghl-chat-widget-color" strategy="afterInteractive">
          {`
            (function(){
              var BRAND = '#EA6827';
              var AVATAR = '/chat-avatar.jpg';
              var avatarUrl = (typeof window !== 'undefined' ? window.location.origin : '') + AVATAR;
              function swapAvatars(root){
                if(!root || !root.querySelectorAll) return;
                var imgs = root.querySelectorAll('img');
                imgs.forEach(function(img){
                  try {
                    var src = (img.getAttribute('src') || '').toLowerCase();
                    var alt = (img.getAttribute('alt') || '').toLowerCase();
                    var w = img.clientWidth || 0;
                    var h = img.clientHeight || 0;
                    var looksLikeAvatar =
                      /avatar|agent|profile|user|representative/.test(src) ||
                      /agent|chat with|representative|profile|avatar|hi there|question/.test(alt) ||
                      (w && h && w === h && w <= 96);
                    if (looksLikeAvatar) {
                      img.setAttribute('src', avatarUrl);
                      img.setAttribute('srcset', avatarUrl + ' 1x, ' + avatarUrl + ' 2x');
                    }
                  } catch(e) {}
                });
              }
              function paintWidget(el){
                if(!el) return;
                try { el.setAttribute('primary-color', BRAND); } catch(e) {}
                try { el.setAttribute('header-color', BRAND); } catch(e) {}
                try { el.setAttribute('color', BRAND); } catch(e) {}
                try { el.setAttribute('brand-color', BRAND); } catch(e) {}
                try { el.setAttribute('agent-image-url', avatarUrl); } catch(e) {}
                try { el.setAttribute('agent-avatar', avatarUrl); } catch(e) {}
                try { el.style.setProperty('--primary-color', BRAND); } catch(e) {}
                try { el.style.setProperty('--launcher-color', BRAND); } catch(e) {}
                try { el.style.setProperty('--launcher-bg', BRAND); } catch(e) {}
                try { el.style.setProperty('--header-color', BRAND); } catch(e) {}
                try { el.style.setProperty('--bubble-bg', BRAND); } catch(e) {}
                try { el.style.setProperty('--primary-button-color', BRAND); } catch(e) {}
                if (el.shadowRoot) {
                  var existing = el.shadowRoot.getElementById('sc-brand-orange-style');
                  if (!existing) {
                    var s = document.createElement('style');
                    s.id = 'sc-brand-orange-style';
                    s.textContent =
                      ':host{ --primary-color:'+BRAND+'; --launcher-color:'+BRAND+'; --launcher-bg:'+BRAND+'; --header-color:'+BRAND+'; --bubble-bg:'+BRAND+'; --primary-button-color:'+BRAND+'; --send-button-color:'+BRAND+'; --color-primary:'+BRAND+'; --primary:'+BRAND+'; }'+
                      '[class*="launcher"]{background-color:'+BRAND+'!important;background-image:none!important;border-color:'+BRAND+'!important;}'+
                      '[class*="header"]{background-color:'+BRAND+'!important;}'+
                      '[class*="send"]{background-color:'+BRAND+'!important;color:#fff!important;}'+
                      'button[type="submit"]{background-color:'+BRAND+'!important;color:#fff!important;}';
                    el.shadowRoot.appendChild(s);
                  }
                  swapAvatars(el.shadowRoot);
                }
                swapAvatars(el);
              }
              function scan(){
                var nodes = document.querySelectorAll('chat-widget, [id^="chat-widget"], [class*="chat-widget"]');
                nodes.forEach(paintWidget);
              }
              scan();
              var attempts = 0;
              var interval = setInterval(function(){
                attempts++;
                scan();
                if (attempts > 60) clearInterval(interval);
              }, 500);
              var mo = new MutationObserver(scan);
              try { mo.observe(document.body, { childList: true, subtree: true }); } catch(e) {}
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
