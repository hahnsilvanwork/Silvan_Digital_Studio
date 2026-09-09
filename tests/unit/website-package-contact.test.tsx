import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ContactInquiry } from '../../src/components/contact/ContactInquiry';
import { getWebsiteTier } from '../../src/lib/contact-inquiry';
import { PriceTierList } from '../../src/components/services/PriceTierList';
import { getContent } from '../../src/lib/locales';

afterEach(() => window.history.replaceState({}, '', '/'));
describe('website package handoff', () => {
  it('accepts a single known tier only for the website service', () => {
    expect(getWebsiteTier(new URLSearchParams('service=websites&tier=standard'))).toBe('standard');
    for (const query of ['tier=standard','service=automation&tier=standard','service=websites&tier=unknown','service=websites&tier=simple&tier=custom']) {
      expect(getWebsiteTier(new URLSearchParams(query))).toBeNull();
    }
  });
  it('carries an editable package into both contact drafts without reflecting arbitrary parameters', () => {
    window.history.replaceState({}, '', '/contact?service=websites&tier=standard&note=private');
    render(<ContactInquiry locale="de" />);
    expect(screen.getByLabelText('Website-Umfang')).toHaveValue('standard');
    expect(decodeURIComponent(screen.getByRole('link', {name:/WhatsApp/}).getAttribute('href')!)).toContain('Business-Website');
    expect(decodeURIComponent(screen.getByRole('link', {name:/E-Mail/}).getAttribute('href')!)).not.toContain('private');
    fireEvent.change(screen.getByLabelText('Website-Umfang'), {target:{value:'custom'}});
    expect(decodeURIComponent(screen.getByRole('link', {name:/E-Mail/}).getAttribute('href')!)).toContain('Individuelles Projekt');
    fireEvent.change(screen.getByLabelText('Worum geht es?'), {target:{value:'presence'}});
    expect(window.location.search).toBe('?service=presence');
    expect(screen.queryByLabelText('Website-Umfang')).not.toBeInTheDocument();
  });
  it('offers one localized enquiry link per website package', () => {
    render(<PriceTierList tiers={getContent('en').websites.priceTiers} websiteLocale="en" />);
    const links=screen.getAllByRole('link',{name:/Discuss this scope/});
    expect(links).toHaveLength(4);
    expect(links[1]).toHaveAttribute('href','/en/contact?service=websites&tier=standard');
  });
});
