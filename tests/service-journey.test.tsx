// @vitest-environment jsdom
import { createElement, type AnchorHTMLAttributes } from 'react';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SiteNav from '@/components/SiteNav';
import ServicesPage from '@/app/services/page';
import AllServicesPage from '@/app/services/all/page';
import CartPage from '@/app/cart/page';
import AddToCartButton from '@/components/AddToCartButton';
import DealAnalyzer from '@/app/construction-department/app/DealAnalyzer';
import ConsentBanner from '@/components/analytics/ConsentBanner';
import { getCartParamFromCookie } from '@/lib/cart-client';

const browser = vi.hoisted(() => ({ path: '/services', search: '', router: { push: vi.fn(), replace: vi.fn() }, recording: vi.fn() }));
vi.mock('next/navigation', () => ({ usePathname: () => browser.path, useSearchParams: () => new URLSearchParams(browser.search), useRouter: () => browser.router }));
vi.mock('next/link', () => ({ default: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} /> }));
vi.mock('next/image', () => ({ default: ({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) => createElement('img', { src, alt, width, height }) }));
vi.mock('posthog-js', () => ({ default: { startSessionRecording: browser.recording } }));
vi.mock('@/components/analytics/PostHogProvider', () => ({ posthogReady: () => true }));

beforeEach(() => {
  browser.path = '/services';
  browser.search = '';
  browser.router.push.mockReset();
  browser.router.replace.mockReset();
  browser.recording.mockReset();
  document.cookie = 'scc_cart=; path=/; max-age=0';
  window.localStorage.clear();
});
afterEach(() => { cleanup(); vi.unstubAllEnvs(); });

describe('shared service navigation', () => {
  it('keeps the service menu open after hovering and clicking its arrow', () => {
    render(<SiteNav />);
    const toggle = screen.getByRole('button', { name: 'Toggle Services menu' });
    fireEvent.mouseOver(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(toggle, { detail: 1 });
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    const menu = document.getElementById(toggle.getAttribute('aria-controls')!);
    expect(menu).not.toBeNull();
    expect(within(menu!).getByRole('link', { name: 'Plan · Deal Pack' }).getAttribute('href')).toBe('/deal-pack');
    expect(within(menu!).queryByText(/For realtors|For wholesalers/)).toBeNull();
    fireEvent.keyDown(toggle, { key: 'Escape' });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes mobile menus when navigation changes', () => {
    const view = render(<SiteNav />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const services = screen.getByRole('button', { name: 'Services' });
    fireEvent.click(services);
    expect(services.getAttribute('aria-expanded')).toBe('true');
    browser.path = '/deal-pack';
    view.rerender(<SiteNav />);
    expect(screen.queryByRole('button', { name: 'Close menu' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('false');
  });

  it('offers screen, plan, and build without making visitors select a professional role', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('heading', { name: 'Start with your project. Screen. Plan. Build.' })).toBeTruthy();
    const main = screen.getByRole('main');
    const links = within(main).getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(links).toContain('/deal-pack');
    expect(links).toContain('/construction');
    expect(links).toContain('/lp/rehab-budget-range-execution-risk-snapshot');
    expect(links.some((href) => /wholesaler|realtor|investor-deal-pack/.test(href || ''))).toBe(false);
  });

  it('keeps numeric inputs mounted while the deal analysis recalculates', () => {
    render(<DealAnalyzer arv={100000} rehab={10000} squareFeet={1000} />);
    const price = screen.getByLabelText('Purchase price') as HTMLInputElement;
    price.focus();
    fireEvent.change(price, { target: { value: '12345' } });
    expect(screen.getByLabelText('Purchase price')).toBe(price);
    expect(document.activeElement).toBe(price);
    expect(price.value).toBe('12345');
  });

  it('groups the complete catalog by purchase type without routing visitors by role', () => {
    render(<AllServicesPage />);
    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: 'Buy now — fixed price' }).getAttribute('href')).toBe('#fixed');
    expect(within(main).getByRole('heading', { name: 'Compare Deal Packs' })).toBeTruthy();
    expect(within(main).queryByText('For Realtors')).toBeNull();
    expect(within(main).queryByText('Jump to your role.')).toBeNull();
  });
});

describe('cart navigation and isolation', () => {
  it('removes one isolated item without discarding the remaining item or changing the global cart', async () => {
    document.cookie = 'scc_cart=home-assessment; path=/';
    browser.search = 'lp=1&cart=execution-consultation,deal-pack-bid-ready&from=realtor-deal-pack';
    const view = render(<CartPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Remove Execution Consultation from cart' }));
    const destination = browser.router.replace.mock.calls.at(-1)?.[0] as string;
    const next = new URL(destination, 'https://site.example.test');
    expect(next.searchParams.get('cart')).toBe('deal-pack-bid-ready');
    expect(next.searchParams.get('lp')).toBe('1');
    expect(next.searchParams.get('from')).toBe('realtor-deal-pack');
    browser.search = next.search.slice(1);
    view.rerender(<CartPage />);
    expect(screen.queryByRole('button', { name: 'Remove Execution Consultation from cart' })).toBeNull();
    expect(screen.getByRole('button', { name: /Remove .*Bid-Ready.* from cart/ })).toBeTruthy();
    expect(getCartParamFromCookie()).toBe('home-assessment');
  });

  it('does not resurrect the global cart after an isolated cart is cleared', async () => {
    document.cookie = 'scc_cart=home-assessment; path=/';
    browser.search = 'lp=1&cart=execution-consultation';
    const view = render(<CartPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Clear cart' }));
    browser.search = new URL(browser.router.replace.mock.calls.at(-1)![0], 'https://site.example.test').search.slice(1);
    view.rerender(<CartPage />);
    expect(screen.queryByRole('button', { name: /Remove .* from cart/ })).toBeNull();
    expect(getCartParamFromCookie()).toBe('home-assessment');
  });

  it('loads and clears a saved global cart without a render loop', async () => {
    document.cookie = 'scc_cart=execution-consultation; path=/';
    render(<CartPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Clear cart' }));
    await waitFor(() => expect(getCartParamFromCookie()).toBe(''));
    expect(browser.router.replace).not.toHaveBeenCalled();
  });

  it('adds a landing-page offer using internal navigation without modifying the global cart', () => {
    document.cookie = 'scc_cart=home-assessment; path=/';
    render(<AddToCartButton itemKey="deal-pack-bid-ready" mode="direct-lp" lpSlug="realtor-deal-pack" />);
    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart' }));
    expect(browser.router.push).toHaveBeenCalledWith('/cart?cart=deal-pack-bid-ready&lp=1&from=realtor-deal-pack');
    expect(getCartParamFromCookie()).toBe('home-assessment');
  });
});

it('starts session replay only after a visitor accepts', async () => {
  vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', 'synthetic-analytics-test-key');
  render(<ConsentBanner />);
  expect(browser.recording).not.toHaveBeenCalled();
  fireEvent.click(await screen.findByRole('button', { name: 'Accept' }));
  expect(browser.recording).toHaveBeenCalledTimes(1);
  expect(window.localStorage.getItem('scc_analytics_consent')).toBe('accepted');
  expect(screen.queryByRole('button', { name: 'Accept' })).toBeNull();
});
