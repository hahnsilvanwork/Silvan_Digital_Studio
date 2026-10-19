import styles from './page-hero.module.css';

/**
 * The divider above the facts, drawn as a horizon: flat on the left, then the
 * Lägern ridge with a few houses, the church and an autumn tree of Boppelsen.
 * Same hand-drawn line language as the village illustration further down.
 */
export function HeroHorizon() {
  return <svg className={styles.horizon} viewBox="0 0 1200 90" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
      <path className={styles.horizonLine} d="M0 89H600C690 89 745 64 830 56C890 50 925 41 985 41C1045 41 1090 64 1200 89" vectorEffect="non-scaling-stroke" />
    </g>
    <g className={styles.horizonVillage} transform="translate(980 43) scale(1.6) translate(-980 -28)">
      {/* Pine on the slope */}
      <path d="M902 37V20M902 22l-4 5m4-5 4 5M902 26l-5 6m5-6 5 6M902 30l-6 6m6-6 6 6" fill="none" vectorEffect="non-scaling-stroke" />
      {/* Houses */}
      <path d="M944 31v-10l7-7 7 7v10Z" vectorEffect="non-scaling-stroke" />
      <path d="M948 29v-4h3v4" fill="none" vectorEffect="non-scaling-stroke" />
      {/* Church: nave, tower, spire, cross */}
      <path d="M962 28v-8h16v8Z" vectorEffect="non-scaling-stroke" />
      <path d="M960 20l5-5h13l2 5" vectorEffect="non-scaling-stroke" />
      <path d="M978 28V11h6v17Z" vectorEffect="non-scaling-stroke" />
      <path d="M978 11l3-9 3 9Z" vectorEffect="non-scaling-stroke" />
      <path d="M981 2V-1M979.5.5h3M981 15v2" fill="none" vectorEffect="non-scaling-stroke" />
      <path d="M989 28v-7l6-6 6 6v7Z" vectorEffect="non-scaling-stroke" />
      <path d="M1004 29v-6l5-5 5 5v6Z" vectorEffect="non-scaling-stroke" />
    </g>
    <g className={styles.horizonTree} fill="none" strokeLinecap="round" transform="translate(980 43) scale(1.6) translate(-980 -28)">
      <path d="M1036 34V14M1036 25l-6-5M1036 21l6-6M1036 17l-4-4" vectorEffect="non-scaling-stroke" />
      <circle cx="1029" cy="19" r="2" vectorEffect="non-scaling-stroke" />
      <circle cx="1043" cy="14" r="2" vectorEffect="non-scaling-stroke" />
      <circle cx="1031" cy="12" r="1.8" vectorEffect="non-scaling-stroke" />
      <circle cx="1039" cy="9" r="1.8" vectorEffect="non-scaling-stroke" />
      <circle cx="1045" cy="20" r="1.6" vectorEffect="non-scaling-stroke" />
    </g>
  </svg>;
}
