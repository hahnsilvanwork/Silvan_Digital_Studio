import type { Metadata } from 'next';
import { headers } from 'next/headers';

import './globals.css';
import { RootDocument } from '../components/layout/RootDocument';
import { NotFoundPage } from '../features/pages/NotFoundPage';

async function errorLocale() {
  return (await headers()).get('x-silvan-locale') === 'en' ? 'en' : 'de';
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await errorLocale();
  return {
    title: `${locale === 'en' ? 'Page not found' : 'Seite nicht gefunden'} | SILVAN Digital Studio`,
    alternates: { canonical: undefined },
    robots: { index: false, follow: true },
  };
}

/** Multiple root layouts require one complete document for unmatched URLs. */
export default async function GlobalNotFound() {
  const locale = await errorLocale();
  const nonce = (await headers()).get('x-silvan-nonce') ?? undefined;
  return (
    <RootDocument locale={locale} nonce={nonce}>
      <NotFoundPage locale={locale} />
    </RootDocument>
  );
}
