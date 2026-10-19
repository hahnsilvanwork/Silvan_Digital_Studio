import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Navigation } from '../../src/components/layout/Navigation';

describe('service navigation', () => {
  it('groups all four services and retains a separate studio and contact link', () => {
    render(<Navigation locale="de" currentPath="/presence" />);
    const summary = screen.getByText('Leistungen');
    const details = summary.closest('details')!;
    expect([...details.querySelectorAll('a')].map(link => link.getAttribute('href'))).toEqual(['/websites', '/presence', '/reviews', '/automation']);
    expect(screen.getByRole('navigation', { hidden: true }).querySelector('a[href="/about"]')?.closest('details')).toBeNull();
    fireEvent.click(summary);
    expect(details).toHaveAttribute('open');
    const presence = within(details).getByRole('link', { name: 'Google-Unternehmensprofil', hidden: true });
    expect(presence).toHaveAttribute('href', '/presence');
    expect(presence).toHaveAttribute('aria-current', 'page');
    fireEvent.keyDown(details, { key: 'Escape' });
    expect(details).not.toHaveAttribute('open');
  });
});
