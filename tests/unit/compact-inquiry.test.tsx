import { act, render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it } from 'vitest';
import { ReviewInquiryConfigurator } from '../../src/components/reviews/ReviewInquiryConfigurator';
import { setCatalogueSelection } from '../../src/components/reviews/use-catalogue-selection';
import { getContent } from '../../src/lib/locales';

afterEach(() => window.history.replaceState(null, '', '/'));
const settle = () => act(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));

it.each(['de', 'en'] as const)('summarizes fixed model details and validates only remaining choices in %s', async locale => {
  const user = userEvent.setup();
  window.history.replaceState(null, '', '/reviews?category=reviews&model=review-round-black#inquiry');
  const { container } = render(<ReviewInquiryConfigurator locale={locale} />);
  await settle();
  const selected = screen.getByTestId('inquiry-model');
  expect(within(selected).getByText('CHF 49.–')).toBeVisible();
  expect(within(selected).getByRole('img')).toBeVisible();
  expect(container.querySelector('[name=product]')).toBeNull();
  expect(container.querySelector('[name=shape]')).toBeNull();
  expect(container.querySelector('[name=size]')).toHaveValue('');
  await waitFor(() => expect(container.querySelector('[name=size]')).toHaveFocus());
  await user.click(screen.getByRole('button', { name: locale === 'de' ? 'Angaben prüfen' : 'Review details' }));
  expect(container.querySelector('[name=size]')).toHaveFocus();
  await user.selectOptions(container.querySelector<HTMLSelectElement>('[name=size]')!, '80');
  await user.selectOptions(container.querySelector<HTMLSelectElement>('[name=setup]')!, 'needs-setup');
  await user.click(screen.getByRole('button', { name: locale === 'de' ? 'Angaben prüfen' : 'Review details' }));
  const email = screen.getByRole('link', { name: locale === 'de' ? 'Per E-Mail anfragen' : 'Enquire by email' });
  expect(decodeURIComponent(email.getAttribute('href')!)).toContain(getContent(locale).reviews.catalog.find(p => p.id === 'review-round-black')!.title);
});

it('allows changing a fixed choice without keeping a stale model or erasing contact details', async () => {
  const user = userEvent.setup();
  window.history.replaceState(null, '', '/en/reviews?category=reviews&model=review-round-black');
  const { container } = render(<ReviewInquiryConfigurator locale="en" />);
  await settle();
  await user.type(container.querySelector<HTMLInputElement>('[name=contactPerson]')!, 'Private Example');
  await user.click(screen.getByRole('button', { name: 'Adjust selection' }));
  await waitFor(() => expect(container.querySelector('[name=destination]')).toHaveFocus());
  await user.selectOptions(screen.getByLabelText('Product'), 'personalized-card');
  await settle();
  expect(screen.queryByTestId('inquiry-model')).toBeNull();
  expect(window.location.search).not.toContain('model=');
  expect(container.querySelector('[name=contactPerson]')).toHaveValue('Private Example');
  expect(screen.getByTestId('inquiry-total')).toHaveTextContent('Estimated base cost CHF 69');
});

it('keeps the generic chip destination editable and resets compact mode on a new model', async () => {
  const user = userEvent.setup();
  window.history.replaceState(null, '', '/en/reviews?category=chips&model=nfc-030-chip');
  const { container } = render(<ReviewInquiryConfigurator locale="en" />);
  await settle();
  expect(container.querySelector('[name=destination]')).toHaveValue('other');
  await user.selectOptions(container.querySelector<HTMLSelectElement>('[name=destination]')!, 'reviews');
  expect(window.location.search).toContain('model=nfc-030-chip');
  expect(screen.getByTestId('inquiry-model')).toHaveTextContent('Stick-on NFC chip');
  await user.click(screen.getByRole('button', { name: 'Adjust selection' }));
  act(() => setCatalogueSelection('reviews', 'review-stand-white'));
  await settle();
  expect(container.querySelector('[name=product]')).toBeNull();
  expect(container.querySelector('[name=shape]')).toBeNull();
  expect(screen.getByTestId('inquiry-model')).toBeVisible();
});
