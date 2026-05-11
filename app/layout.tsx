import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import CartToast from "@/components/CartToast";

export const metadata: Metadata = {
  title: "Southern Cities Construction | Project Support and Full Contracting — Charlotte, NC",
  description: "Southern Cities makes residential construction easier in North Carolina. Buy clear project support for permits, budgets, contractor fit, and oversight, or bring in our licensed general contracting team when one company should run the whole project.",
  keywords: "residential construction support Charlotte NC, permit administration, budget review, construction oversight, contractor fit, full contracting, renovations, rehabs, additions, new construction Charlotte, Southern Cities Construction",
  metadataBase: new URL("https://southerncitiesconstruction.com"),
  alternates: {
    canonical: "https://southerncitiesconstruction.com",
  },
  openGraph: {
    type: "website",
    url: "https://southerncitiesconstruction.com",
    title: "Southern Cities Construction | Project Support and Full Contracting — Charlotte, NC",
    description: "Southern Cities makes residential construction easier in North Carolina. Project support for permits, budgets, contractor fit, and oversight — plus full contracting when one company should run the whole project.",
    siteName: "Southern Cities Construction",
  },
  twitter: {
    card: "summary_large_image",
    title: "Southern Cities Construction | Project Support and Full Contracting — Charlotte, NC",
    description: "Residential construction made easier in North Carolina. Buy clear project support, or bring in licensed full contracting when the project calls for it.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://southerncitiesconstruction.com" />
      </head>
      <body>
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
