import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it } from 'vitest';
import { InquiryDisclosure } from '../../src/components/reviews/InquiryDisclosure';
import { setCatalogueSelection } from '../../src/components/reviews/use-catalogue-selection';

afterEach(() => window.history.replaceState(null, '', '/'));

it('starts collapsed and opens synchronously when a model is requested', async () => {
  const user = userEvent.setup();
  const {container} = render(<InquiryDisclosure locale="de"><input aria-label="Notiz" /></InquiryDisclosure>);
  const disclosure = container.querySelector('details')!;
  expect(disclosure.open).toBe(false);
  act(() => setCatalogueSelection('reviews', 'review-round-black', true));
  expect(disclosure.open).toBe(true);
  await user.type(screen.getByRole('textbox'), 'Bitte anrufen');
  await user.click(container.querySelector('summary')!);
  expect(disclosure.open).toBe(false);
  act(() => setCatalogueSelection('reviews', 'review-round-black', true));
  expect(disclosure.open).toBe(true);
  expect(screen.getByRole('textbox')).toHaveValue('Bitte anrufen');
});

it('opens an incoming enquiry link, but ordinary category filtering stays collapsed', () => {
  window.history.replaceState(null, '', '/en/reviews?category=reviews#inquiry');
  const first = render(<InquiryDisclosure locale="en"><p>Form</p></InquiryDisclosure>);
  expect(first.container.querySelector('details')!.open).toBe(true);
  first.unmount();
  window.history.replaceState(null, '', '/reviews');
  const second = render(<InquiryDisclosure locale="de"><p>Form</p></InquiryDisclosure>);
  act(() => setCatalogueSelection('menu'));
  expect(second.container.querySelector('details')!.open).toBe(false);
});
