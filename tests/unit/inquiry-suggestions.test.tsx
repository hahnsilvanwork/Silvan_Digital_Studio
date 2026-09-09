import { act, render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it } from 'vitest';
import { ReviewInquiryConfigurator } from '../../src/components/reviews/ReviewInquiryConfigurator';

afterEach(() => window.history.replaceState(null, '', '/'));
const settle = () => act(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));

it.each(['de', 'en'] as const)('selects a matching model and preserves private entries in %s', async locale => {
  const user = userEvent.setup();
  const { container } = render(<ReviewInquiryConfigurator locale={locale} />);
  await settle();
  const select = async (name: string, value: string) => user.selectOptions(container.querySelector<HTMLSelectElement>(`[name=${name}]`)!, value);
  await select('destination', 'reviews');
  await select('product', 'standard-card');
  await select('shape', 'round');
  await user.type(container.querySelector<HTMLInputElement>('[name=quantity]')!, '3');
  await user.type(container.querySelector<HTMLInputElement>('[name=contactPerson]')!, 'Private Visitor');
  await user.type(container.querySelector<HTMLTextAreaElement>('[name=note]')!, 'Keep this note');
  const suggestions = screen.getByTestId('inquiry-suggestions');
  await user.click(within(suggestions).getAllByRole('button')[0]);
  await waitFor(() => expect(screen.getByTestId('inquiry-model')).toBeVisible());
  await settle();
  expect(container.querySelector('[name=product]')).toBeNull();
  expect(container.querySelector('[name=contactPerson]')).toHaveValue('Private Visitor');
  expect(container.querySelector('[name=note]')).toHaveValue('Keep this note');
  expect(container.querySelector('[name=quantity]')).toHaveValue('3');
  await waitFor(() => expect(container.querySelector('[name=size]')).toHaveFocus());
  expect(screen.getByTestId('inquiry-total')).toHaveTextContent('CHF 100');
  expect(window.location.search).not.toContain('Private');
});

it('keeps the chosen destination when adopting a neutral sticker', async () => {
  const user = userEvent.setup();
  const { container } = render(<ReviewInquiryConfigurator locale="en" />);
  await settle();
  await user.selectOptions(container.querySelector<HTMLSelectElement>('[name=destination]')!, 'menu');
  await user.selectOptions(container.querySelector<HTMLSelectElement>('[name=product]')!, 'nfc-chip');
  await user.click(within(screen.getByTestId('inquiry-suggestions')).getByRole('button'));
  await settle();
  expect(container.querySelector('[name=destination]')).toHaveValue('menu');
  expect(screen.getByTestId('inquiry-model')).toHaveTextContent('Stick-on NFC chip');
});
