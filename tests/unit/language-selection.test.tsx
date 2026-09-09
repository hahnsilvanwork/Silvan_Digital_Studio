import { act, render, screen, cleanup } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { LanguageSwitcher } from '../../src/components/ui/LanguageSwitcher';
import { ProjectDetail } from '../../src/components/work/ProjectDetail';
import { projects } from '../../src/content/projects';
import { setCatalogueSelection } from '../../src/components/reviews/use-catalogue-selection';
import { ReviewInquiryConfigurator } from '../../src/components/reviews/ReviewInquiryConfigurator';

afterEach(() => { cleanup(); window.history.replaceState(null, '', '/'); });

it.each(['de', 'en'] as const)('keeps public model selection when leaving %s without copying private parameters', (locale) => {
  const path = locale === 'de' ? '/reviews' : '/en/reviews';
  window.history.replaceState(null, '', `${path}?category=reviews&model=review-round-black&contactPerson=Private&note=Secret#inquiry`);
  render(<LanguageSwitcher currentPath={path} locale={locale} />);
  const link = document.querySelector(`a[hreflang="${locale === 'de' ? 'en' : 'de'}"]`)!;
  expect(link.getAttribute('href')).toBe(`${locale === 'de' ? '/en/reviews' : '/reviews'}?category=reviews&model=review-round-black#inquiry`);
  act(() => setCatalogueSelection('chips', 'nfc-030-chip'));
  expect(link.getAttribute('href')).toContain('category=chips&model=nfc-030-chip');
});

it('drops unknown identifiers and does not carry catalogue state to other pages', () => {
  window.history.replaceState(null, '', '/reviews?category=Private&model=Secret#unknown');
  const { rerender } = render(<LanguageSwitcher currentPath="/reviews" locale="de" />);
  expect(document.querySelector('a[hreflang="en"]')).toHaveAttribute('href', '/en/reviews');
  act(() => setCatalogueSelection('chips', 'nfc-030-chip'));
  rerender(<LanguageSwitcher currentPath="/about" locale="de" />);
  expect(document.querySelector('a[hreflang="en"]')).toHaveAttribute('href', '/en/about');
});

it('restores the selected model in the target-language form without identity fields', async () => {
  window.history.replaceState(null, '', '/reviews?category=chips&model=nfc-030-chip&businessName=Private#inquiry');
  const { unmount } = render(<LanguageSwitcher currentPath="/reviews" locale="de" />);
  const href = document.querySelector('a[hreflang="en"]')!.getAttribute('href')!;
  unmount();
  window.history.replaceState(null, '', href);
  render(<ReviewInquiryConfigurator locale="en" />);
  await act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
  expect(screen.getByTestId('inquiry-model')).toHaveTextContent('NFC chip');
  expect(screen.queryByLabelText('Product')).toBeNull();
  expect(screen.getByLabelText(/Business.*optional/i)).toHaveValue('');
  expect(screen.getByText('Stick-on NFC chip')).toBeVisible();
});

it('preserves category-only selection and updates after browser history navigation', () => {
  window.history.replaceState(null, '', '/reviews?category=menu#products');
  render(<LanguageSwitcher currentPath="/reviews" locale="de" />);
  expect(document.querySelector('a[hreflang="en"]')).toHaveAttribute('href', '/en/reviews?category=menu#products');
  act(() => {
    window.history.replaceState(null, '', '/reviews?category=reviews&model=nfc-030-chip');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  // A known model determines its own category if the incoming pair disagrees.
  expect(document.querySelector('a[hreflang="en"]')).toHaveAttribute('href', '/en/reviews?category=chips&model=nfc-030-chip');
});

it.each(projects)('links the $slug demo to its available language', (project) => {
  render(<ProjectDetail project={project} next={projects[0]} locale="en" />);
  const link = screen.getByRole('link', { name: /Open demo website/i });
  if (project.slug === 'falkenried') expect(link).toHaveAttribute('href', `${project.demoUrl}/en/`);
  else {
    expect(link).toHaveAttribute('href', project.demoUrl);
    expect(link).toHaveAccessibleName(/German/i);
  }
});
