import Image from "next/image";
import styles from "./nfc-screen.module.css";

type ScreenKind = "menu" | "review" | "instagram" | "facebook" | "stay";

function Photo({ name, className = "" }: { name: string; className?: string }) {
  return <Image src={`/images/motion/${name}.webp`} width={320} height={320} sizes="180px" alt="" className={`${styles.photo} ${className}`} />;
}

function Avatar() {
  return <span className={styles.avatar}>v<span>CAFÉ VOGEL</span></span>;
}

function BottomNav() {
  return <div className={styles.bottomNav}><span>⌂</span><span>⌕</span><span>⊞</span><span>♡</span><span className={styles.miniAvatar}>v</span></div>;
}

/** Familiar interface patterns with fictional, explicitly labelled demo content. */
export function NfcDemoScreen({ kind, de }: { kind: ScreenKind; de: boolean }) {
  if (kind === "instagram") return <div className={`${styles.app} ${styles.instagram}`}>
    <header className={styles.appHeader}><b>cafe.vogel <small>⌄</small></b><span>⊞ ≡</span></header>
    <div className={styles.profileTop}><Avatar /><div className={styles.stats}><span><b>24</b>{de ? "Beiträge" : "posts"}</span><span><b>860</b>{de ? "Follower" : "followers"}</span><span><b>128</b>{de ? "Gefolgt" : "following"}</span></div></div>
    <div className={styles.bio}><b>Café Vogel</b><span>{de ? "Café · Hausgemachte Patisserie" : "Café · Homemade patisserie"}</span><span>{de ? "Kaffee. Gute Gespräche. Zürich." : "Coffee. Good company. Zurich."}</span><span className={styles.link}>↗ cafe-vogel.example</span></div>
    <div className={styles.actions}><span>{de ? "Folgen" : "Follow"}</span><span>{de ? "Nachricht" : "Message"}</span><span>⌄</span></div>
    <div className={styles.stories}>{["cafe", "patisserie", "team"].map((name, i) => <div key={name}><Photo name={name} /><span>{(de ? ["Café", "Patisserie", "Team"] : ["Café", "Pastries", "Team"])[i]}</span></div>)}</div>
    <div className={styles.gridTabs}><b>▦</b><span>▷</span><span>♙</span></div>
    <div className={styles.feedWindow}><div className={styles.grid}>{["patisserie", "cafe", "team", "cafe", "patisserie", "cafe", "team", "cafe", "patisserie"].map((name, i) => <Photo key={i} name={name} />)}</div></div>
    <BottomNav />
  </div>;

  if (kind === "facebook") return <div className={`${styles.app} ${styles.facebook}`}>
    <header className={styles.appHeader}><b className={styles.facebookWord}>facebook</b><span>⌕ ≡</span></header>
    <div className={styles.cover}><Photo name="cafe" /></div>
    <div className={styles.facebookAvatar}><Avatar /></div>
    <div className={styles.bio}><strong>Café Vogel</strong><span>{de ? "Ein guter Ort für eine kleine Pause." : "A lovely place for a little break."}</span><span>{de ? "Café · Zürich" : "Café · Zurich"}</span></div>
    <div className={styles.actions}><span>{de ? "Folgen" : "Follow"}</span><span>{de ? "Nachricht" : "Message"}</span></div>
    <div className={styles.facebookTabs}><b>{de ? "Beiträge" : "Posts"}</b><span>{de ? "Info" : "About"}</span><span>{de ? "Fotos" : "Photos"}</span></div>
    <div className={styles.post}><div className={styles.postAuthor}><span className={styles.miniAvatar}>v</span><span><b>Café Vogel</b><small>{de ? "Heute" : "Today"} · ◉</small></span><span>···</span></div><p>{de ? "Frisch aus unserer Backstube. ☕" : "Fresh from our bakery. ☕"}</p><Photo name="patisserie" /></div>
  </div>;

  if (kind === "review") return <div className={`${styles.app} ${styles.review}`}>
    <header className={styles.appHeader}><span>‹</span><b className={styles.googleWord}><i>G</i><i>o</i><i>o</i><i>g</i><i>l</i><i>e</i></b><span>⋮</span></header>
    <div className={styles.reviewCover}><Photo name="cafe" /></div><div className={styles.reviewBody}><h3>Café Vogel</h3><p>{de ? "Ihre Erfahrung zählt." : "Your experience matters."}</p><span className={styles.reviewHint}>{de ? "Öffentlich auf Google teilen" : "Share publicly on Google"}</span><div className={styles.stars}>☆ ☆ ☆ ☆ ☆</div><div className={styles.input}>{de ? "Wie war Ihr Besuch?" : "How was your visit?"}</div><div className={styles.addPhoto}>▧ &nbsp; {de ? "Fotos hinzufügen" : "Add photos"}</div><span className={styles.disabledButton}>{de ? "Posten" : "Post"}</span></div>
  </div>;

  if (kind === "stay") return <div className={`${styles.app} ${styles.stay}`}>
    <header className={styles.appHeader}><span>‹</span><b>airbnb</b><span>↥ ♡</span></header><div className={styles.stayCover}><Photo name="apartment" /><span>1 / 6</span></div><div className={styles.stayBody}><span className={styles.location}>{de ? "ZÜRICH · STADTOASE" : "ZURICH · CITY RETREAT"}</span><h3>{de ? "Ihr Zuhause auf Zeit" : "Your home away from home"}</h3><p>{de ? "Helles Apartment mit viel Ruhe." : "A bright apartment. Room to unwind."}</p><div className={styles.facts}><span>{de ? "2 Gäste" : "2 guests"}</span><span>{de ? "1 Schlafzimmer" : "1 bedroom"}</span><span>{de ? "1 Bad" : "1 bath"}</span></div><div className={styles.host}><span className={styles.hostIcon}>⌂</span><span><b>{de ? "Willkommen in Zürich" : "Welcome to Zurich"}</b><small>{de ? "Alles für Ihren Aufenthalt" : "Everything for your stay"}</small></span></div><div className={styles.amenities}><span>⌁ {de ? "WLAN" : "Wi-Fi"}</span><span>♧ {de ? "Küche" : "Kitchen"}</span></div><span className={styles.stayButton}>{de ? "Unterkunft ansehen" : "View accommodation"}</span></div>
  </div>;

  return <div className={`${styles.app} ${styles.menu}`}>
    <header className={styles.menuHeader}><b>CAFÉ VOGEL</b><span>≡</span></header><div className={styles.menuCover}><Photo name="patisserie" /><span>{de ? "Mit Liebe." : "Made with love."}<br />{de ? "Jeden Tag." : "Every day."}</span></div><div className={styles.menuBody}><span className={styles.location}>{de ? "UNSERE SPEISEKARTE" : "OUR MENU"}</span><h3>{de ? "Zeit für etwas Gutes." : "Time for something good."}</h3><div className={styles.menuTabs}><b>{de ? "Kaffee" : "Coffee"}</b><span>{de ? "Patisserie" : "Pastries"}</span><span>Brunch</span></div>{[["Espresso", de ? "Kräftig. Klar. Klassisch." : "Bold. Pure. Classic.", "4.50"], ["Flat White", de ? "Doppelter Espresso, feine Milch" : "Double espresso, silky milk", "5.50"], ["Cappuccino", de ? "Mit cremigem Milchschaum" : "With velvety milk foam", "5.50"]].map(([name, description, price]) => <div key={name} className={styles.menuItem}><span><b>{name}</b><small>{description}</small></span><strong>{price}</strong></div>)}<div className={styles.menuFooter}>{de ? "Hausgemacht. Mitten in Zürich." : "Homemade. In the heart of Zurich."}</div></div>
  </div>;
}
