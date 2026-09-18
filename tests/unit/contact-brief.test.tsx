import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactInquiry } from '../../src/components/contact/ContactInquiry';
import { ContactActions } from '../../src/components/contact/ContactActions';

afterEach(() => { window.history.replaceState({}, '', '/'); vi.restoreAllMocks(); });

describe('guided contact draft', () => {
  it('includes service questions in both channel drafts', () => {
    render(<ContactActions locale="de" reason="websites" tier="standard" />);
    const mail = new URL(screen.getByRole('link', { name: /E-Mail/ }).getAttribute('href')!);
    const whatsapp = new URL(screen.getByRole('link', { name: /WhatsApp/ }).getAttribute('href')!);
    expect(mail.searchParams.get('body')).toContain('Meine bestehende Website:');
    expect(mail.searchParams.get('body')).toContain('Business-Website');
    expect(whatsapp.searchParams.get('text')).toBe(mail.searchParams.get('body'));
  });

  it('keeps an optional brief in the draft without putting it in the page URL or storage', () => {
    window.history.replaceState({}, '', '/contact?service=websites&tier=standard');
    const storage = vi.spyOn(Storage.prototype, 'setItem');
    render(<ContactInquiry locale="de" />);
    fireEvent.change(screen.getByLabelText('Ihr Vorhaben (optional)'), { target: { value: 'Eine neue Seite für mein Café & Catering.' } });
    const mail = new URL(screen.getByRole('link', { name: /E-Mail/ }).getAttribute('href')!);
    expect(mail.searchParams.get('body')).toContain('Eine neue Seite für mein Café & Catering.');
    expect(mail.searchParams.get('body')).toContain('Business-Website');
    expect(window.location.search).toBe('?service=websites&tier=standard');
    expect(storage).not.toHaveBeenCalled();
  });

  it('offers a selectable message when copying is unavailable', async () => {
    render(<ContactInquiry locale="en" />);
    fireEvent.change(screen.getByLabelText('Your project (optional)'), { target: { value: 'A website for my workshop.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Copy enquiry text' }));
    expect(await screen.findByRole('status')).toHaveTextContent('select');
    expect((screen.getByLabelText('Your enquiry text') as HTMLTextAreaElement).value).toContain('A website for my workshop.');
  });
});
