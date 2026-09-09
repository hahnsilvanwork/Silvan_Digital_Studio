import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it } from 'vitest';
import { ProductCatalog } from '../../src/components/products/ProductCatalog';
import { getContent } from '../../src/lib/locales';
afterEach(()=>{cleanup();window.history.replaceState(null,'','/');});
it.each(['de','en'] as const)('shows all variants directly without product type filters in %s',async locale=>{
 const user=userEvent.setup(); const r=getContent(locale).reviews;
 window.history.replaceState(null,'','/reviews?category=reviews&model=review-round-black');
 render(<ProductCatalog locale={locale} products={r.catalog} categories={r.categories} labels={{category:r.catalogLabel,categoryPrompt:r.categoryPrompt,productSingular:r.productSingular,productPlural:r.productPlural,view3d:r.view3dLabel,comingSoon:r.comingSoonLabel,previousProduct:r.previousProductLabel,nextProduct:r.nextProductLabel,productPosition:r.productPositionLabel,productPositionOf:r.productPositionOfLabel,close:r.close3dLabel,loading:r.loading3dLabel,error:r.error3dLabel,retry:r.retry3dLabel,interact:r.interact3dLabel}}/>);
 const count=()=>document.querySelectorAll('[data-product-index]').length;
 expect(count()).toBe(r.catalog.filter(p=>p.category==='reviews').length);
 expect(screen.queryByRole('button',{name:locale==='de'?'Aufsteller':'Stand'})).not.toBeInTheDocument();
 expect(screen.queryByText(locale==='de'?'Welcher Produkttyp passt zum Einsatzort?':'Which product type suits the location?')).not.toBeInTheDocument();
 expect(window.location.search).toContain('model=review-round-black');
 await user.selectOptions(screen.getByRole('combobox'),'chips');
 expect(count()).toBe(r.catalog.filter(p=>p.category==='chips').length);
});