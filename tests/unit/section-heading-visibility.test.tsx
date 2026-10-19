import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeading } from '../../src/components/ui/SectionHeading';

describe('section headings reached from page links', () => {
  it('keeps the destination and its explanation readable without waiting for motion', () => {
    render(<SectionHeading immediate title="Leistungen und Preise" intro="Die Angebote im Überblick." />);
    const heading = screen.getByRole('heading', { name: 'Leistungen und Preise' });
    expect(heading).not.toHaveAttribute('data-reveal');
    expect(heading.querySelector('[data-mask-item]')).toBeNull();
    expect(screen.getByText('Die Angebote im Überblick.')).not.toHaveAttribute('data-reveal');
  });

  it('retains opt-in existing reveal behaviour for other presentations', () => {
    render(<SectionHeading title="Eine Geschichte" />);
    expect(screen.getByRole('heading', { name: 'Eine Geschichte' })).toHaveAttribute('data-reveal', 'mask');
  });
});
