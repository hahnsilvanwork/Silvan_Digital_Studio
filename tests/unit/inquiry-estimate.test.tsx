import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { InquiryEstimate } from '../../src/components/reviews/InquiryEstimate';

it('shows a short live estimate for piece quantities and marks additional discounts', () => {
  const { rerender } = render(<InquiryEstimate product="standard-card" quantity="2" locale="de" />);
  expect(screen.getByRole('status')).toHaveTextContent('Grundkosten ca. CHF 80');
  expect(screen.getByRole('status')).not.toHaveTextContent('jedes weitere');
  rerender(<InquiryEstimate product="nfc-chip" quantity="11" locale="de" />);
  expect(screen.getByRole('status')).toHaveTextContent('Grundkosten ca. CHF 70');
  expect(screen.getByRole('status')).toHaveTextContent('noch nicht abgezogen');
  rerender(<InquiryEstimate product="nfc-chip" quantity="0" locale="de" />);
  expect(screen.getByRole('status')).not.toHaveTextContent('CHF');
});
