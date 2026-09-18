import { expect, it } from 'vitest';
import { consumeInquirySelection, saveInquirySelection, SELECTION_KEY, SELECTION_TTL } from '../../src/lib/inquiry-session';
import { EMPTY_REVIEW_INQUIRY } from '../../src/lib/validation';

const values = {...EMPTY_REVIEW_INQUIRY, destination:'reviews', product:'standard-card', shape:'round', size:'100', quantity:'3', setup:'ready'};
function storage() { const data = new Map<string,string>(); return {getItem:(key:string)=>data.get(key)??null, setItem:(key:string,value:string)=>{data.set(key,value);}, removeItem:(key:string)=>{data.delete(key);}}; }

it('expires stale and future drafts and consumes valid data once', () => {
  for (const time of [99,100+SELECTION_TTL+1]) {
    const s=storage(); saveInquirySelection(s,'review-round-black',values,100);
    expect(consumeInquirySelection(s,'review-round-black',time)).toBeNull(); expect(s.getItem(SELECTION_KEY)).toBeNull();
  }
  const s=storage(); saveInquirySelection(s,'review-round-black',values,100);
  expect(consumeInquirySelection(s,'review-round-black',101)).toEqual(values);
  expect(consumeInquirySelection(s,'review-round-black',102)).toBeNull();
});

it('rejects unknown options, inconsistent model data and unexpected fields', () => {
  for(const selection of [{...values,product:'unknown'}, {...values,shape:'square'}, {...values,quantity:'1000'}, {...values,note:'private'}]) {
    const s=storage(); const safe=Object.fromEntries(['destination','product','shape','size','quantity','setup'].map(field => [field,selection[field as keyof typeof selection]]));
    const payload = selection.note ? {...safe,note:selection.note} : safe;
    s.setItem(SELECTION_KEY,JSON.stringify({version:1,createdAt:100,modelId:'review-round-black',selection:payload}));
    expect(consumeInquirySelection(s,'review-round-black',101)).toBeNull();
  }
});

it('excludes all free text and invalid quantities from autosave', () => {
  const s=storage(); saveInquirySelection(s,'review-round-black',{...values,quantity:'private text',businessName:'private company',note:'private instructions',destinationUrl:'https://private.example'});
  expect(s.getItem(SELECTION_KEY)).not.toContain('private');
  expect(consumeInquirySelection(s,'review-round-black')).toEqual({...values,quantity:''});
});

it('refuses restoration if clearing the stored selection fails', () => {
  const s=storage(); saveInquirySelection(s,'review-round-black',values);
  expect(consumeInquirySelection({...s,removeItem:()=>{throw Error('denied');}},'review-round-black')).toBeNull();
});

it('does not revive a model draft on a model-free entry', () => {
  const s=storage(); saveInquirySelection(s,'review-round-black',values);
  expect(consumeInquirySelection(s,'')).toBeNull();
});
