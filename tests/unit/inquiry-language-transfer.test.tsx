import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { ReviewInquiryConfigurator } from '../../src/components/reviews/ReviewInquiryConfigurator';
import { LanguageSwitcher } from '../../src/components/ui/LanguageSwitcher';
import { DRAFT_KEY, saveInquiryDraft } from '../../src/lib/inquiry-draft';
import { EMPTY_REVIEW_INQUIRY } from '../../src/lib/validation';
const values = {...EMPTY_REVIEW_INQUIRY, product:'standard-card', destination:'reviews', shape:'round',size:'100',quantity:'3',setup:'needs-setup',businessName:'Private company',contactPerson:'Private name',note:'Private note'};
const frame=()=>act(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>resolve())));
afterEach(()=>{cleanup();sessionStorage.clear();window.history.replaceState(null,'','/');vi.restoreAllMocks();});
it.each(['de','en'] as const)('transfers full draft and translated current preview from %s',async(locale)=>{
 const source=locale==='de'?'/reviews':'/en/reviews'; const target=locale==='de'?'/en/reviews':'/reviews'; const other=locale==='de'?'en':'de';
 window.history.replaceState(null,'',source+'?category=reviews&model=review-round-black#inquiry');
 saveInquiryDraft(sessionStorage,window.location.pathname+window.location.search+window.location.hash,{values,preview:true,adjustingSelection:false});
 const first=render(<><LanguageSwitcher locale={locale} currentPath={source}/><ReviewInquiryConfigurator locale={locale}/></>);await frame();
 expect(document.querySelector('[data-inquiry-summary]')).toHaveTextContent('Private company');expect(document.querySelector('[data-inquiry-summary]')).toHaveTextContent('100');
 expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull();
 const link=document.querySelector(`a[hreflang="${other}"]`)!; const href=link.getAttribute('href')!;
 const stop=(event:Event)=>event.preventDefault();document.addEventListener('click',stop);fireEvent.click(link);document.removeEventListener('click',stop);
 expect(sessionStorage.getItem(DRAFT_KEY)).toContain('Private note');expect(href).not.toContain('Private');first.unmount();
 window.history.replaceState(null,'',href);render(<ReviewInquiryConfigurator locale={other}/>);await frame();
 expect(window.location.pathname).toBe(target);expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull();
 const summary=document.querySelector('[data-inquiry-summary]')!;expect(summary).toHaveTextContent('Private note');expect(summary).toHaveTextContent('Private name');expect(summary).toHaveTextContent('CHF 100');
 fireEvent.click(screen.getByRole('button',{name:other==='en'?'Edit details':'Angaben bearbeiten'}));
 expect(document.querySelector('[name="quantity"]')).toHaveValue('3');expect(document.querySelector('[name="businessName"]')).toHaveValue('Private company');
 fireEvent.change(document.querySelector('[name="quantity"]')!,{target:{value:'4'}});expect(document.querySelector('[data-inquiry-summary]')).toBeNull();
});
it('keeps an edited form when storage is blocked and visitor cancels',async()=>{
 window.history.replaceState(null,'','/reviews');render(<><LanguageSwitcher locale="de" currentPath="/reviews"/><ReviewInquiryConfigurator locale="de"/></>);await frame();
 fireEvent.change(document.querySelector('[name="businessName"]')!,{target:{value:'Keep this'}});
 const confirm=vi.spyOn(window,'confirm').mockReturnValue(false);vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw Error('blocked');});
 expect(fireEvent.click(document.querySelector('a[hreflang="en"]')!)).toBe(false);expect(confirm).toHaveBeenCalled();expect(document.querySelector('[name="businessName"]')).toHaveValue('Keep this');
});
it('does not save for modified clicks or ordinary field edits',async()=>{
 window.history.replaceState(null,'','/reviews');render(<><LanguageSwitcher locale="de" currentPath="/reviews"/><ReviewInquiryConfigurator locale="de"/></>);await frame();fireEvent.change(document.querySelector('[name="note"]')!,{target:{value:'Private'}});expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull();
 const stop=(event:Event)=>event.preventDefault();document.addEventListener('click',stop);fireEvent.click(document.querySelector('a[hreflang="en"]')!,{ctrlKey:true});document.removeEventListener('click',stop);expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull();
});
