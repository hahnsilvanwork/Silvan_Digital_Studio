import { SiteShell } from "../components/layout/SiteShell";
import pageStyles from "../styles/pages.module.css";
import layoutStyles from "../styles/layout.module.css";
import { getContent } from "../lib/locales";

export default function Home() {
  const content = getContent("de");
  const { hero } = content.home;

  return (
    <SiteShell currentPath="/" locale="de">
      <div className={pageStyles.page}>
        <section className={`${layoutStyles.container} ${pageStyles.hero}`}>
          <p className={pageStyles.heroLabel}>{hero.serviceLine}</p>
          <h1 className={pageStyles.heroTitle}>{hero.headline}</h1>
          <p className={pageStyles.editorial}>{hero.supporting}</p>
        </section>
      </div>
    </SiteShell>
  );
}
