import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { ReviewInquiryConfigurator } from '../../src/components/reviews/ReviewInquiryConfigurator';

const key = 'silvan:inquiry-selection:v1';
const settle = () => act(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
const field = (name: string) => document.querySelector(`[name="${name}"]`)!;
afterEach(() => { cleanup(); vi.restoreAllMocks(); sessionStorage.clear(); window.history.replaceState(null, '', '/'); vi.restoreAllMocks(); });

it('restores safe selections after remount but never personal details or preview', async () => {
  window.history.replaceState(null, '', '/en/reviews?category=reviews&model=review-round-black');
  const first = render(<ReviewInquiryConfigurator locale="en" />); await settle();
  for (const [name, value] of Object.entries({size:'100', setup:'ready', quantity:'3', businessName:'Private company', contactPerson:'Private name', destinationUrl:'https://g.page/private', note:'Private note'})) fireEvent.change(field(name), {target:{value}});
  expect(sessionStorage.getItem(key)).toEqual(expect.any(String));
  expect(sessionStorage.getItem(key)).not.toContain('Private');
  expect(sessionStorage.getItem(key)).not.toContain('https://');
  first.unmount(); render(<ReviewInquiryConfigurator locale="en" />); await settle();
  expect(field('size')).toHaveValue('100'); expect(field('setup')).toHaveValue('ready'); expect(field('quantity')).toHaveValue('3');
  expect(field('businessName')).toHaveValue(''); expect(field('destinationUrl')).toHaveValue('');
  expect(document.querySelector('[data-inquiry-summary]')).toBeNull();
  expect(screen.getByText(/selection restored/i)).toBeVisible();
  fireEvent.click(screen.getByRole('button', {name:'Start again'})); await settle();
  expect(field('product')).toHaveValue(''); expect(screen.queryByTestId('inquiry-model')).toBeNull();
  expect(sessionStorage.getItem(key)).toBeNull();
});

it('respects an explicit different model and does not revive the previous draft', async () => {
  window.history.replaceState(null, '', '/en/reviews?category=reviews&model=review-round-black');
  const first = render(<ReviewInquiryConfigurator locale="en" />); await settle();
  fireEvent.change(field('size'), {target:{value:'100'}}); first.unmount();
  window.history.replaceState(null, '', '/en/reviews?category=menu&model=menu-square-black');
  render(<ReviewInquiryConfigurator locale="en" />); await settle();
  expect(field('size')).toHaveValue(''); expect(screen.getByTestId('inquiry-model')).toHaveTextContent('Menu · Square Black');
  expect(screen.queryByText(/selection restored/i)).toBeNull();
});

it.each(['{', JSON.stringify({version:99}), 'x'.repeat(4000)])('ignores malformed session data', async raw => {
  sessionStorage.setItem(key,raw); render(<ReviewInquiryConfigurator locale="en" />); await settle();
  expect(field('product')).toHaveValue(''); expect(screen.queryByText(/selection restored/i)).toBeNull();
});

it('works when access to session storage is denied', async () => {
  vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {throw Error('denied');});
  render(<ReviewInquiryConfigurator locale="en" />); await settle();
  fireEvent.change(field('quantity'), {target:{value:'2'}}); expect(field('quantity')).toHaveValue('2');
});
