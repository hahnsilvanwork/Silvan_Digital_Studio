import layoutStyles from "../../src/styles/layout.module.css";
import pageStyles from "../../src/styles/pages.module.css";

export function DesignSystemFixture() {
  return (
    <section
      className={`${layoutStyles.shell} ${pageStyles.page}`}
      data-testid="design-system-fixture"
    >
      <div className={`${layoutStyles.container} ${layoutStyles.grid12}`}>
        <div className={`${layoutStyles.spanFull} ${layoutStyles.asymmetric}`}>
          <a data-touch-target href="#fixture-details">
            Fixture link
          </a>
          <button data-touch-target type="button">
            Fixture button
          </button>
          <div
            className={`${layoutStyles.asymmetricMain} ${pageStyles.darkBand}`}
            id="fixture-details"
          >
            <a data-touch-target href="#fixture-project">
              Dark-band link
            </a>
          </div>
          <div
            className={pageStyles.projectMedia}
            data-project="archa"
            id="fixture-project"
          />
        </div>
      </div>
    </section>
  );
}
