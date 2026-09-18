import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Navigation } from '../../src/components/layout/Navigation';

describe('supporting service navigation', () => {
  it('groups supporting routes while retaining direct website and contact links', () => {
    render(<Navigation locale="de" currentPath="/presence" />);
    const summary = screen.getByText('Weiteres');
    const details = summary.closest('details')!;
    expect([...details.querySelectorAll('a')].map(link => link.getAttribute('href'))).toEqual(['/presence', '/automation', '/about']);
    expect(screen.getByRole('navigation', { hidden: true }).querySelector('a[href="/reviews"]')?.closest('details')).toBeNull();
    fireEvent.click(summary);
    expect(details).toHaveAttribute('open');
    const presence = within(details).getByRole('link', { name: 'Online-Präsenz', hidden: true });
    expect(presence).toHaveAttribute('href', '/presence');
    expect(presence).toHaveAttribute('aria-current', 'page');
    fireEvent.keyDown(details, { key: 'Escape' });
    expect(details).not.toHaveAttribute('open');
  });
});
