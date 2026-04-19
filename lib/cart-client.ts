export const CART_COOKIE_KEY = 'scc_cart';

export function getCartItemsFromCookie(): string[] {
  if (typeof document === 'undefined') return [];
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CART_COOKIE_KEY}=`));
  if (!match) return [];
  const value = decodeURIComponent(match.split('=').slice(1).join('='));
  return value ? value.split(',').map((v) => v.trim()).filter(Boolean) : [];
}

export function setCartItemsCookie(items: string[]) {
  if (typeof document === 'undefined') return;
  const value = encodeURIComponent(items.join(','));
  document.cookie = `${CART_COOKIE_KEY}=${value}; path=/; max-age=86400; samesite=lax`;
}

export function clearCartCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${CART_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}
