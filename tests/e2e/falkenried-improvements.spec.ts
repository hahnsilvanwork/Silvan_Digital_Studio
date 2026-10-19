import { expect, test } from '@playwright/test';

const base = '/demos/falkenried';
for (const lang of ['de', 'en'] as const) {
  const prefix = lang === 'en' ? '/en' : '';
  test(`${lang} property action selects the object and keeps the enquiry local`, async ({ page }) => {
    const submissions: string[] = [];
    page.on('request', request => { if (request.method() === 'POST') submissions.push(request.url()); });
    await page.goto(`${base}${prefix}/immobilien/`);
    const form = page.locator('#property-enquiry form');
    await form.locator('[name="message"]').fill('Fictional test enquiry');
    const action = page.locator('[data-property-title]').first();
    const title = await action.getAttribute('data-property-title');
    await action.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#property-enquiry$/);
    await expect(form.locator('[name="objekt"]')).toHaveValue(title!);
    await expect(form.locator('[name="objekt"]')).toBeFocused();
    const nextAction = page.locator('[data-property-title]').nth(1);
    const nextTitle = await nextAction.getAttribute('data-property-title');
    await nextAction.focus();
    await page.keyboard.press('Enter');
    await expect(form.locator('[name="objekt"]')).toHaveValue(nextTitle!);
    await expect(form.locator('[name="objekt"]')).toBeFocused();
    await expect(form.locator('[name="message"]')).toHaveValue('Fictional test enquiry');
    await form.locator('[name="name"]').fill('Demo Test');
    await form.locator('[name="email"]').fill('demo@example.test');
    await form.getByRole('button').click();
    await expect(form.locator('.form-summary')).toBeVisible();
    await expect(form.locator('.form-summary')).toContainText(lang === 'de' ? 'Es wurde nichts versendet oder dauerhaft gespeichert.' : 'Nothing has been sent or saved permanently.');
    expect(submissions).toEqual([]);
  });

  test(`${lang} demo actions have honest destinations`, async ({ page }) => {
    await page.goto(`${base}${prefix}/${lang === 'de' ? 'aktuelles' : 'news'}/`);
    await expect(page.locator('a[href="https://falkenried.example"]')).toHaveCount(0);
    await expect(page.getByText(lang === 'de' ? 'Beispielbeitrag' : 'Sample post', { exact: true })).toHaveCount(3);
    await page.goto(`${base}${prefix}/${lang === 'de' ? 'partner' : 'partners'}/`);
    const action = page.getByRole('link', { name: lang === 'de' ? 'Demo-Kontakt öffnen' : 'Open demo contact' }).first();
    await action.click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/${lang === 'de' ? 'kontakt' : 'contact'}/?$`));
    await page.goto(`${base}${prefix}/faq/`);
    await page.getByRole('link', { name: lang === 'de' ? 'Demo-Hinweis lesen' : 'Read demo notice' }).click();
    await expect(page).toHaveURL(/#demo-hinweis$/);
    await expect(page.locator('#demo-hinweis')).toBeVisible();
  });
}

test('English concept and service routes stay English', async ({ page }) => {
  await page.goto(`${base}/en/`);
  await expect(page.locator('.group-about')).toContainText('Three services. One shared idea.');
  await page.locator('.group-about').getByRole('link', { name: 'The idea behind Falkenried' }).click();
  await expect(page).toHaveURL(/\/en\/history\/?$/);
  await page.goto(`${base}/en/bmw-garage/`);
  await page.getByRole('link', { name: 'Try a service enquiry' }).first().click();
  await expect(page).toHaveURL(/\/en\/contact\/?#general-inquiry$/);
  await expect(page.locator('#general-inquiry')).toContainText('Nothing is sent.');
});
