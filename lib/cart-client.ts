export const CART_COOKIE_KEY = 'scc_cart';

function getCartCookieValue() {
  if (typeof document === 'undefined') return '';
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CART_COOKIE_KEY}=`));
  if (!match) return '';
  return decodeURIComponent(match.split('=').slice(1).join('='));
}

export function getCartItemsFromCookie(): string[] {
  const value = getCartCookieValue();
  return value ? value.split(',').map((v) => v.trim()).filter(Boolean) : [];
}

export function getCartParamFromCookie(): string {
  const value = getCartCookieValue();
  if (!value) return '';

  let decoded = value;
  for (let i = 0; i < 3; i += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }

  return decoded;
}

export function setCartItemsCookie(items: string[]) {
  if (typeof document === 'undefined') return;
  const value = encodeURIComponent(items.join(','));
  document.cookie = `${CART_COOKIE_KEY}=${value}; path=/; max-age=86400; samesite=lax`;
}

export function setCartParamCookie(value: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${CART_COOKIE_KEY}=${value}; path=/; max-age=86400; samesite=lax`;
}

export function clearCartCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${CART_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}
