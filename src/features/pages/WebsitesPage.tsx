import type { Locale } from "../../content/types";
import { auditCopy } from "../../content/audit-copy";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { getContent } from "../../lib/locales";
import { ServicePage } from "./ServicePage";
import layoutStyles from "../../styles/layout.module.css";
import pageStyles from "../../styles/pages.module.css";
import { websiteComparison } from '../../content/website-offer-copy';
import exampleStyles from '../../components/services/examples.module.css';

interface WebsitesPageProps {
  readonly locale: Locale;
}

export function WebsitesPage({ locale }: WebsitesPageProps) {
  const scope = auditCopy[locale].websiteScope;
  const comparison = websiteComparison[locale];
  return (
    <ServicePage
      locale={locale}
      route="/websites"
      service={getContent(locale).websites}
    >
      <section className={`${layoutStyles.container} ${pageStyles.section}`}>
        <details className={exampleStyles.disclosure}>
          <summary>{locale === 'de' ? 'Pakete im Detail vergleichen' : 'Compare package details'}</summary>
          <div>
            <h2 className={pageStyles.legalHeading}>{comparison.title}</h2>
            <p>{comparison.intro}</p>
            <div className={exampleStyles.tableRegion} tabIndex={0} role="region" aria-label={comparison.title}>
              <table><thead><tr><th scope="col">{locale === 'de' ? 'Bereich' : 'Area'}</th>{getContent(locale).websites.priceTiers.map(tier => <th key={tier.id} scope="col">{tier.name}</th>)}</tr></thead>
                <tbody>{comparison.rows.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((cell,index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p>{comparison.shared}</p>
          </div>
        </details>
      </section>
      <section className={`${layoutStyles.container} ${pageStyles.section}`}>
        <SectionHeading title={scope.maintenanceTitle} intro={scope.maintenanceIntro} />
        <div className={pageStyles.sectionBody}>
          <p className={pageStyles.note}>{scope.maintenanceAgreement}</p>
        </div>
      </section>
    </ServicePage>
  );
}
