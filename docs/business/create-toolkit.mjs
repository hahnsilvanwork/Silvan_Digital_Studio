// Aus dem Repository-Stamm starten. Keine Kundendaten in diese Vorlage schreiben.
import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
const dependencyRoot = process.env.BUSINESS_NODE_MODULES;
if (!dependencyRoot) throw new Error('BUSINESS_NODE_MODULES auf das gebündelte node_modules setzen.');
const require = createRequire(path.join(dependencyRoot, '..', 'business-runtime.cjs'));
const { Workbook, SpreadsheetFile } = await import(pathToFileURL(require.resolve('@oai/artifact-tool')));
const wb = Workbook.create();
const websites = wb.worksheets.add('Websites');
const nfc = wb.worksheets.add('NFC');
const inputs = wb.worksheets.add('Kosten');
const leads = wb.worksheets.add('Anfragen');
const out = path.resolve('artifacts/business');
await fs.mkdir(out, { recursive: true });
const set=(s,c,v)=>s.getRange(c).values=[[v]];
const formula=(s,c,v)=>s.getRange(c).formulas=[[v.replace(/((?:Kosten!)?[A-Z]+\d+)=""/g,'COUNT($1)=0')]];
const editable=(s,r)=>{s.getRange(r).format.fill='#EAF3FF';s.getRange(r).format.font.color='#1553A6';};
function base(s,title,headers,last){
 s.showGridLines=false;s.getRange(`A1:${last}110`).format.font.name='Arial';s.getRange(`A1:${last}110`).format.font.size=10;
 s.getRange(`A1:${last}110`).format.columnWidth=18;s.getRange('A:A').format.columnWidth=32;
 set(s,'A1',title);s.getRange('A1').format.font.size=16;
 s.getRange(`A5:${last}5`).values=[headers];s.getRange(`A5:${last}5`).format.fill='#173A44';s.getRange(`A5:${last}5`).format.font.color='#FFFFFF';s.getRange(`A5:${last}5`).format.wrapText=true;s.getRange(`A5:${last}5`).format.rowHeight=46;
 s.freezePanes.freezeRows(5);
 s.getRange(`B6:${last}110`).setNumberFormat('#,##0.00;(#,##0.00);"–"');
}
base(inputs,'Kostengrundlage · CHF', ['Eingabe','Wert','Einheit / Definition','Beleg / Stand'],'D');
set(inputs,'A3','Blaue Felder ausfüllen. Leer = unbekannt. 0 nur bei belegter Kostenfreiheit.');
const costs=[['Interner Stundensatz',90,'CHF/h; veränderbare Startannahme, keine gemessenen Kosten'],['Gemeinkosten je Projekt',null,'CHF; sachgerechter Anteil, ohne Doppelzählung'],['Risiko-/Gewinnaufschlag',null,'Anteil auf Vollkosten, z.B. 0.2 = 20%'],['Umsatzsteuer im Preis',null,'Anteil; nur bestätigten Status eintragen'],['Monatliche Fixkosten',null,'CHF; nicht erneut im Projekt-Breakeven abziehen']];
inputs.getRange('A6:C10').values=costs;editable(inputs,'B6:B10');editable(inputs,'D6:D10');inputs.getRange('C:C').format.columnWidth=58;inputs.getRange('D:D').format.columnWidth=36;inputs.getRange('B8:B9').setNumberFormat('0.0%');
inputs.dataValidations.add({range:'B6:B10',rule:{type:'decimal',operator:'greaterThanOrEqual',formula1:0}});
set(inputs,'D6','Startannahme · 09.09.2026 · prüfen');
set(inputs,'A13','Monatliche Fixkosten dienen der separaten Deckungsbeitragsrechnung.');
set(inputs,'A14','Preis- und Kostenbasis konsistent halten: abziehbare Vorsteuer aus Kosten entfernen.');
base(websites,'Website-Kalkulation · je Projekt', ['Paket','Preis ab CHF','Preis bis CHF','Offerte brutto CHF','Direktkosten CHF','Beratung h','Umsetzung h','Korrekturen h','Administration h','Support h','Gesamtzeit h','Nettoerlös CHF','Vollkosten CHF','Ergebnis CHF','Mindestpreis brutto','Max. Stunden','Aufträge / Monat'],'Q');
set(websites,'A3','Quellen: src/content/de.ts, Stand 09.09.2026. Offerte und Aufwand fehlen noch.');
websites.getRange('A6:C9').values=[['Einstieg',300,699],['Business',700,1999],['Umfangreich',2000,4999],['Individuell',5000,null]];
editable(websites,'D6:J9');
websites.dataValidations.add({range:'D6:J9',rule:{type:'decimal',operator:'greaterThanOrEqual',formula1:0}});
for(let r=6;r<=9;r++){
 formula(websites,`K${r}`,`=IF(COUNT(F${r}:J${r})<5,"",SUM(F${r}:J${r}))`);
 formula(websites,`L${r}`,`=IF(OR(D${r}="",Kosten!B9=""),"",D${r}/(1+Kosten!B9))`);
 formula(websites,`M${r}`,`=IF(OR(E${r}="",K${r}="",Kosten!B6="",Kosten!B7=""),"",E${r}+K${r}*Kosten!B6+Kosten!B7)`);
 formula(websites,`N${r}`,`=IF(OR(L${r}="",M${r}=""),"",L${r}-M${r})`);
 formula(websites,`O${r}`,`=IF(OR(M${r}="",Kosten!B8="",Kosten!B9=""),"",M${r}*(1+Kosten!B8)*(1+Kosten!B9))`);
 formula(websites,`P${r}`,`=IF(OR(L${r}="",E${r}="",Kosten!B6="",Kosten!B7=""),"",IF(Kosten!B6=0,"n.a.",(L${r}-E${r}-Kosten!B7)/Kosten!B6))`);
 formula(websites,`Q${r}`,`=IF(OR(L${r}="",E${r}="",K${r}="",Kosten!B6="",Kosten!B10=""),"",IF(L${r}-E${r}-K${r}*Kosten!B6<=0,"nicht erreichbar",ROUNDUP(Kosten!B10/(L${r}-E${r}-K${r}*Kosten!B6),0)))`);
}
websites.getRange('N6:N9').conditionalFormats.add('cellIs',{operator:'lessThan',formula:0,format:{fill:'#FDE9E7',font:{color:'#B42318'}}});
set(websites,'A12','Max. Stunden: Kostendeckung ohne Gewinnaufschlag. Negative Zahl = bereits ohne Arbeitszeit defizitär.');
set(websites,'A13','Aufträge/Monat: Fixkosten / (Nettoerlös − Direktkosten − Arbeitskosten), ohne Projekt-Gemeinkostenanteil.');
base(nfc,'NFC-Kalkulation · Staffel und Grenzkosten', ['Produkt-ID','1 Stück CHF','2 Stück CHF','Weiteres CHF','Menge','Einkauf / Stk.','Druck / Stk.','Ausschussquote','Programmierung min/Stk.','Verpackung / Auftrag','Versandkosten','Reklamation CHF','Fixzeit h','Preis brutto CHF','Variable Kosten / Stk.','Auftragskosten CHF','Ergebnis CHF','Grenzerlös 2. netto','Grenzerlös ab 3. netto','Grenzbeitrag ab 3.','Stück bis Kostendeckung'],'U');
set(nfc,'A3','Quelle: src/lib/product-pricing.ts / chip-pricing.ts, 09.09.2026. Versand separat, hier ohne Versanderlös.');
nfc.getRange('A6:D10').values=[['standard-card',49,80,20],['nfc-chip',15,25,5],['personalized-card',69,100,25],['fully-custom-card',99,150,30],['standard-stand',49,null,null]];
editable(nfc,'E6:M10');nfc.getRange('H6:H10').setNumberFormat('0.0%');
nfc.dataValidations.add({range:'E6:E10',rule:{type:'whole',operator:'between',formula1:1,formula2:999}});
nfc.dataValidations.add({range:'F6:M10',rule:{type:'decimal',operator:'greaterThanOrEqual',formula1:0}});
nfc.dataValidations.add({range:'H6:H10',rule:{type:'decimal',operator:'between',formula1:0,formula2:0.99}});
for(let r=6;r<=10;r++){
 formula(nfc,`N${r}`,r===10?`=IF(E${r}="","",IF(E${r}=1,B${r},"Offerte nötig"))`:`=IF(E${r}="","",IF(E${r}=1,B${r},C${r}+(E${r}-2)*D${r}))`);
 formula(nfc,`O${r}`,`=IF(OR(COUNT(F${r}:I${r})<4,Kosten!B6=""),"",IF(H${r}>=1,"ungültig",(F${r}+G${r})/(1-H${r})+I${r}/60*Kosten!B6))`);
 formula(nfc,`P${r}`,`=IF(OR(COUNT(J${r}:M${r})<4,Kosten!B6="",Kosten!B7=""),"",SUM(J${r}:L${r})+M${r}*Kosten!B6+Kosten!B7)`);
 formula(nfc,`Q${r}`,`=IF(OR(E${r}="",O${r}="",P${r}="",Kosten!B9=""),"",IF(ISNUMBER(N${r}),N${r}/(1+Kosten!B9)-E${r}*O${r}-P${r},"Offerte nötig"))`);
 if(r<10){
 formula(nfc,`R${r}`,`=IF(Kosten!B9="","",(C${r}-B${r})/(1+Kosten!B9))`);
 formula(nfc,`S${r}`,`=IF(Kosten!B9="","",D${r}/(1+Kosten!B9))`);
 formula(nfc,`T${r}`,`=IF(OR(S${r}="",O${r}=""),"",S${r}-O${r})`);
 formula(nfc,`U${r}`,`=IF(OR(O${r}="",P${r}="",Kosten!B9="",T${r}=""),"",IF(B${r}/(1+Kosten!B9)-O${r}-P${r}>=0,1,IF(C${r}/(1+Kosten!B9)-2*O${r}-P${r}>=0,2,IF(T${r}<=0,"nicht erreichbar",MAX(3,ROUNDUP((P${r}-(C${r}-2*D${r})/(1+Kosten!B9))/T${r},0))))))`);
 }else{set(nfc,`R${r}`,'nach Absprache');set(nfc,`S${r}`,'nach Absprache');set(nfc,`T${r}`,'nach Absprache');formula(nfc,`U${r}`,`=IF(OR(O${r}="",P${r}="",Kosten!B9=""),"",IF(B${r}/(1+Kosten!B9)-O${r}-P${r}>=0,1,"Offerte nötig"))`);}
}
set(nfc,'A13','Grenzkosten = Spalte O. Grenzbeitrag 2. Stück = R − O. Ab 3. Stück = T.');
set(nfc,'A14','Ausschuss bezieht sich auf Einkauf + Druck. Zeit für Nacharbeit in Programmierung bzw. Fixzeit berücksichtigen.');
set(nfc,'A15','Über 10 Stück ist der Preis ein Richtpreis vor zusätzlichem Rabatt. Breakeven gilt nur für unveränderte Staffel und Kosten.');
set(nfc,'A16','Kostendeckung zeigt die erste tragfähige Menge. Bei negativem Grenzbeitrag können spätere Mengen wieder Verlust bringen.');
base(leads,'Anfragen · nur tatsächlich eingegangene Kontakte', ['Anfrage-ID','Eingang Datum','Kanal','Leistung','Qualifiziert Datum','Offerte Datum','Annahme Datum','Absage Datum','Offerte CHF','Ist-Zeit h','Nächster Schritt','Termin','Verantwortlich','Beleg privat','Erstreaktion Datum'],'O');
set(leads,'A3','Leeres Register. Öffnungsklicks separat aggregieren; keine personenbezogene Klick-Zuordnung herstellen.');
editable(leads,'A6:O105');leads.getRange('B6:B105').setNumberFormat('dd.mm.yyyy hh:mm');leads.getRange('E6:H105').setNumberFormat('dd.mm.yyyy');leads.getRange('L6:L105').setNumberFormat('dd.mm.yyyy');leads.getRange('O6:O105').setNumberFormat('dd.mm.yyyy hh:mm');
leads.getRange('C6:C105').dataValidation={rule:{type:'list',values:['E-Mail','WhatsApp','Telefon','LinkedIn','Empfehlung','Andere']}};
leads.getRange('D6:D105').dataValidation={rule:{type:'list',values:['Website','NFC','Google-Präsenz','Automation','Mehrere','Noch offen']}};
leads.tables.add('A5:O105',true,'AnfragenRegister');
// Synthetische Rechenprüfung, danach alle temporären Eingaben entfernen.
inputs.getRange('B6:B10').values=[[50],[10],[0.2],[0],[100]];websites.getRange('D6:J6').values=[[300,20,1,2,0,0,1]];
nfc.getRange('E7:M7').values=[[3,1,1,0,0,0,0,0,0]];
wb.recalculate();
console.log('Synthetische Prüfung',JSON.stringify({website:websites.getRange('K6:Q6').values,nfc:nfc.getRange('N7:U7').values}));
const result=websites.getRange('N6').values[0][0];if(result!==70)throw new Error(`Website Rechnung: ${result}`);
if(nfc.getRange('Q7').values[0][0]!==14)throw new Error('NFC Rechnung');
for(let r=6;r<=9;r++){
 const [first,pair,additional]=nfc.getRange(`B${r}:D${r}`).values[0];
 for(const qty of [1,2,3,10,11]){set(nfc,`E${r}`,qty);wb.recalculate();const expected=qty===1?first:pair+(qty-2)*additional;if(nfc.getRange(`N${r}`).values[0][0]!==expected)throw new Error(`Staffel ${r}/${qty}`);}
}
nfc.getRange('E6:E10').clear({applyTo:'contents'});
inputs.getRange('B6:B10').clear({applyTo:'contents'});set(inputs,'B6',90);websites.getRange('D6:J6').clear({applyTo:'contents'});nfc.getRange('E7:M7').clear({applyTo:'contents'});
wb.recalculate();
if(websites.getRange('L6').values[0][0]!==''||nfc.getRange('Q7').values[0][0]!=='')throw new Error('Fehlende Kosten dürfen kein Ergebnis zeigen');
console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!',options:{useRegex:true,maxResults:20},maxChars:1500})).ndjson);
for(const [s,r,suffix] of [[websites,'A1:G13',''],[websites,'H5:Q9','-Ergebnis'],[nfc,'A1:H10',''],[nfc,'I5:U10','-Ergebnis'],[inputs,'A1:D14',''],[leads,'A1:F10',''],[leads,'G5:O10','-Details']]){
 const preview=await wb.render({sheetName:s.name,range:r,scale:1,format:'png'});await fs.writeFile(path.join(out,`${s.name}${suffix}.png`),new Uint8Array(await preview.arrayBuffer()));
}
await (await SpreadsheetFile.exportXlsx(wb)).save(path.join(out,'Betriebskalkulation.xlsx'));
console.log('Gespeichert: artifacts/business/Betriebskalkulation.xlsx');
