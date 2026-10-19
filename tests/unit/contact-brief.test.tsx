import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactInquiry } from '../../src/components/contact/ContactInquiry';
import { ContactActions } from '../../src/components/contact/ContactActions';

afterEach(() => { window.history.replaceState({}, '', '/'); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('guided contact draft', () => {
  it('finishes preparation with matching email and WhatsApp drafts and preserves the brief when the service changes', () => {
    window.history.replaceState({}, '', '/contact?service=websites&tier=standard');
    render(<ContactInquiry locale="de" />);
    fireEvent.change(screen.getByLabelText('Ihr Vorhaben (optional)'), { target: { value: 'Grüezi – Website & Öffnungszeiten\nDanke 👋' } });
    const finish = within(screen.getByRole('group', { name: 'Anfrage weitergeben' }));
    const mailLink = finish.getByRole('link', { name: /E-Mail öffnen/ });
    const body = new URL(mailLink.getAttribute('href')!).searchParams.get('body');
    expect(body).toContain('Grüezi – Website & Öffnungszeiten\nDanke 👋');
    expect(body).toContain('Business-Website');
    expect(new URL(finish.getByRole('link', { name: /In WhatsApp öffnen/ }).getAttribute('href')!).searchParams.get('text')).toBe(body);
    fireEvent.change(screen.getByLabelText('Worum geht es?'), { target: { value: 'presence' } });
    expect(finish.getByRole('link', { name: /E-Mail öffnen/ })).toBe(mailLink);
    const changed = new URL(mailLink.getAttribute('href')!).searchParams.get('body');
    expect(changed).toContain('Grüezi – Website & Öffnungszeiten\nDanke 👋');
    expect(changed).not.toContain('Business-Website');
    expect(finish.queryByRole('link', { name: /Anrufen|LinkedIn/ })).toBeNull();
  });
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
    const mail = new URL(within(screen.getByRole('group', {name: 'Direktkontakt'})).getByRole('link', { name: /E-Mail/ }).getAttribute('href')!);
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

  it('clears a successful copy status after editing or changing the selection', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', Object.create(navigator, { clipboard: { value: { writeText } } }));
    render(<ContactInquiry locale="en" />);
    const brief = screen.getByLabelText('Your project (optional)');
    fireEvent.change(brief, { target: { value: 'My café & shop 👋' } });
    fireEvent.click(screen.getByRole('button', { name: 'Copy enquiry text' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Nothing has been sent yet');
    expect(writeText.mock.calls[0][0]).toContain('My café & shop 👋');
    fireEvent.change(brief, { target: { value: 'A different project' } });
    expect(screen.queryByRole('status')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Copy enquiry text' }));
    await screen.findByRole('status');
    fireEvent.change(screen.getByLabelText('What is your enquiry about?'), { target: { value: 'presence' } });
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('offers the complete current draft when clipboard permission is denied', async () => {
    vi.stubGlobal('navigator', Object.create(navigator, { clipboard: { value: { writeText: vi.fn().mockRejectedValue(new Error('Denied')) } } }));
    window.history.replaceState({}, '', '/contact?service=websites&tier=standard');
    render(<ContactInquiry locale="en" />);
    fireEvent.change(screen.getByLabelText('Your project (optional)'), { target: { value: 'My shop' } });
    fireEvent.click(screen.getByRole('button', { name: 'Copy enquiry text' }));
    expect(await screen.findByRole('status')).toHaveTextContent('select and copy');
    const finish = within(screen.getByRole('group', { name: 'Continue with your enquiry' }));
    const body = new URL(finish.getByRole('link', { name: /Open email/ }).getAttribute('href')!).searchParams.get('body');
    expect(screen.getByLabelText('Your enquiry text')).toHaveValue(body);
    expect(screen.getByLabelText('Your enquiry text')).toHaveAttribute('readonly');
  });
});
