export function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M3 12h17M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function PhoneIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M6.6 3.5h2.6l1.5 4.2-2 1.3a11 11 0 0 0 6.3 6.3l1.3-2 4.2 1.5v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

/**
 * German pages show the familiar Swiss notation (078 ...); English pages keep
 * +41 because a number starting with 0 cannot be dialled from abroad.
 */
export function localPhone(international: string, locale: 'de' | 'en' = 'de') {
  return locale === 'en' ? international : international.replace(/^\+41\s?/, '0');
}
