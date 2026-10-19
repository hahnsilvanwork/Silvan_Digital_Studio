import styles from './home-opening.module.css';

/** Original decorative village illustration, not a geographic map. */
export function VillageLandscape() {
  return <div className={styles.landscape} aria-hidden="true"><svg viewBox="0 0 1440 155" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <g id="home-leaf"><path d="M0 0C-6-2-7-8-4-11 1-9 3-4 0 0Z" fill="white" stroke="currentColor" strokeWidth="1.1" /></g>
      <g id="home-ash" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-3 0H5M0 0C-2-25 4-46 1-76S-2-112 0-128M1-21-18-37M1-39 21-58M1-53-23-76M0-72 22-91M0-86-13-106M0-103 10-119" />
        <path d="m-10-30-13-4m9 1-2-12m27 1 17-7m-10 3 2-15m-33 5-15-6m10 3-1-15m36 1 12-8m-10 7 1-12m-30-1-9-4m6 2-1-10" />
        {[
          [-19,-37,-65],[-24,-34,-80],[-15,-45,-15],[23,-59,48],[29,-54,75],[21,-69,12],
          [-25,-77,-48],[-30,-72,-72],[-20,-87,-12],[24,-92,50],[32,-93,78],[25,-106,10],
          [-14,-106,-36],[-20,-109,-58],[-14,-119,-10],[10,-121,38],[3,-126,5],
          [-8,-62,-34],[11,-77,45],[-8,-90,-38],[12,-99,30],[-7,-42,-40],[12,-50,35],
        ].map(([x,y,r], i) => <use key={i} href="#home-leaf" transform={`translate(${x} ${y}) rotate(${r})`} />)}
      </g>
      <g id="home-pine" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round">
        <path d="M0 0V-75M-3 0h6" />
        {[[-62,7],[-51,11],[-39,16],[-26,20],[-13,23]].map(([y,w]) => <g key={y}>
          <path d={`M0 ${y-8}Q${-w*.5} ${y+1} ${-w} ${y+3}M0 ${y-8}Q${w*.6} ${y} ${w} ${y+3}`} />
          {[.45,.75,1].map(t => <path key={t} d={`M${-w*t} ${y+3*t}l-2-6m2 6-5-1M${w*t} ${y+3*t}l2-6m-2 6 5-1`} />)}
        </g>)}
      </g>
      <g id="home-shrub" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M0 0-8-18M0 0 2-23M0 0 13-15M0 0-16-8M0 0 17-4" />
        <use href="#home-leaf" transform="translate(-8 -17) rotate(-35)" /><use href="#home-leaf" transform="translate(2 -21) rotate(15)" /><use href="#home-leaf" transform="translate(12 -14) rotate(55)" /><use href="#home-leaf" transform="translate(-14 -7) rotate(-75)" /><use href="#home-leaf" transform="translate(16 -4) rotate(80)" />
      </g>
      <g id="home-cottage" stroke="#19365c" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M0 0v-22l14-15 15 15V0Z" fill="white" />
        <path d="M14-37h32l16 16H29Z" fill="#e8edf3" /><path d="M29-21h32V0H29Z" fill="white" />
        <path d="M-3-21 14-40 32-21M41-37v-8h5v13M6-18h5v7H6ZM18-18h5v7h-5ZM12 0v-11h7V0M37-15h6v7h-6ZM50-15h6v7h-6Z" fill="white" />
        <path d="M9-17v5m12-5v5m19-4v7m13-7v7M1-3h10m9 0h8M32-3h26" />
      </g>
    </defs>
    {/* Two hills, with the foreground masking distant contours. */}
    <path d="M392 133C534 130 651 70 774 85S961 28 1085 58 1254 27 1414 85" stroke="#8a9bb5" strokeWidth="1.15" />
    <path d="M735 145C859 126 974 73 1092 83S1284 33 1430 72V155H735Z" fill="white" />
    <path d="M735 145C859 126 974 73 1092 83S1284 33 1430 72" stroke="#486084" strokeWidth="1.25" />
    <g color="#e99426"><use href="#home-shrub" transform="translate(491 117) scale(.9)" /><use href="#home-shrub" transform="translate(519 122) scale(.55)" /></g>
    <path d="M24 149C193 97 345 83 500 121S775 159 948 148 1225 130 1422 151V155H24Z" fill="white" />
    <path d="M24 149C193 97 345 83 500 121S775 159 948 148 1225 130 1422 151" stroke="#29476f" strokeWidth="1.35" />
    <g color="#29476f"><use href="#home-shrub" transform="translate(765 149) scale(.85)" /><use href="#home-pine" transform="translate(943 148) scale(.72)" /><use href="#home-pine" transform="translate(1295 139) scale(.8)" /><use href="#home-shrub" transform="translate(1325 143) scale(.75)" /></g>
    {/* A small cluster of Swiss-style gabled houses, a church and orchard. */}
    <g transform="translate(1105 139)">
      <use href="#home-cottage" transform="translate(-17 0) scale(.65)" />
      <use href="#home-cottage" transform="translate(25 -5) scale(.9)" />
      <use href="#home-cottage" transform="translate(125 -2) scale(.7)" />
      <g stroke="#19365c" strokeWidth="1.35" strokeLinejoin="round">
        <path d="M72-3v-24h47v24Z" fill="white" /><path d="m65-26 15-15h35l11 15Z" fill="#e8edf3" />
        <path d="M100-3v-63h16v63Z" fill="white" /><path d="m99-66 9-35 9 35Z" fill="white" />
        <path d="M108-101v-8m-3 4h6M103-68l5-20 5 20M105-59v8m6-8v8M80-19v8m9-8v8M105-3v-12q3-5 6 0v12" />
        <circle cx="108" cy="-38" r="4" fill="white" /><path d="M108-41v3l2 1" />
      </g>
      <path d="M-23 3q66-9 156 2m-69-5 5 6m44-4 6 5" stroke="#91a0b7" strokeWidth="1" />
    </g>
    <g color="#e58b1c"><use href="#home-ash" transform="translate(1370 148) scale(.97)" /><use href="#home-shrub" transform="translate(1002 147) scale(.43)" /><use href="#home-shrub" transform="translate(1048 145) scale(.3)" /><use href="#home-shrub" transform="translate(1243 143) scale(.34)" /></g>
    <g stroke="#dda055" strokeWidth="1" strokeLinecap="round"><path d="m1090 147 3-4 3 4m16-3 3-3 3 3m60 0 3-3 3 3m41 3 3-4 3 4m52-1 3-3 3 3M1350 151l4-2m27 2 5-1" /></g>
  </svg></div>;
}
