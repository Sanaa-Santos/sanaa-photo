import { Link } from "react-router-dom";
import {
  BISQUE, FIREBRICK, MAX_W, DESKTOP_BREAKPOINT,
  useIsDesktop, Diamond, FadeIn, Shell, Nav, Footer,
} from "./Shared";

const HERO_URL  = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781882012/jake-farzana-austin-wedding-portfolio-hero_afnnyy.jpg";
const PRICE_URL = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781882012/jake-farzana-austin-wedding-portfolio-flat-rate_vpyisz.jpg";

// Real portfolio gallery — Corbin & Zuleyma, then Jake & Farzana, in order.
// Each <img> renders at its natural aspect ratio (no fixed ratio/crop), so
// the masonry effect (matching mathilde-rietsch.com/portfolio/mariage) comes
// from the photos themselves: a two-column grid where each column flows
// independently, rather than a single row-locked grid.
const PHOTOS = [
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270041/corbin-zuleyma-01_yhhetf.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270041/corbin-zuleyma-02_zfvm04.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270040/corbin-zuleyma-03_bh4ms1.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270039/corbin-zuleyma-04_kvrlw9.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270039/corbin-zuleyma-05_ohv3nl.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270038/corbin-zuleyma-06_icvdws.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270037/corbin-zuleyma-07_djtyxh.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270037/corbin-zuleyma-08_rgqfu4.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270036/corbin-zuleyma-09_d9orvy.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270035/corbin-zuleyma-10_fp4elx.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270035/corbin-zuleyma-11_ndgh6w.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270034/corbin-zuleyma-12_g5mya2.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270033/corbin-zuleyma-13_htreqf.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270033/corbin-zuleyma-14_xqnz02.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270032/corbin-zuleyma-15_yhrvok.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270031/corbin-zuleyma-16_eqyzzz.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270030/corbin-zuleyma-18_qwvsbt.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270030/corbin-zuleyma-17_weejyr.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270029/corbin-zuleyma-19_xdtxzn.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270028/corbin-zuleyma-20_hp96qw.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270028/corbin-zuleyma-21_l71con.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270028/corbin-zuleyma-22_gciqhd.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270027/corbin-zuleyma-23_u0iu1b.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270162/Jake-Farzana-818_1_vvu2io.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270162/Jake-Farzana-805_1_gqqcww.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270161/Jake-Farzana-786_1_1_ei1lnf.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270160/Jake-Farzana-771_1_lhkmdx.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270159/Jake-Farzana-761_1_gzhff4.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270159/Jake-Farzana-740_1_zigio0.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270158/Jake-Farzana-725_1_ga3fq0.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270157/Jake-Farzana-716_1_nrtdsx.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270157/Jake-Farzana-709_1_bm22vo.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270156/Jake-Farzana-657_1_qgxlpw.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270155/Jake-Farzana-600_1_chm90u.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270154/Jake-Farzana-544_1_rojlpw.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270153/Jake-Farzana-541_1_n0j3nv.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270152/Jake-Farzana-531_1_uudmiy.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270151/Jake-Farzana-499_1_o5q5sw.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270151/Jake-Farzana-346_1_v0s2zh.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270150/Jake-Farzana-335_1_krzzt5.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270149/Jake-Farzana-319_1_y1vtgg.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270149/Jake-Farzana-317_1_bi5i8t.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270147/Jake-Farzana-276_1_o5orc8.jpg",
  "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782270146/Jake-Farzana-236_1_jgg4mf.jpg",
];

function GalleryFrame({ src }) {
  return (
    <div style={{ overflow:"hidden", borderRadius:3 }}>
      <img src={src} alt="" loading="lazy"
        style={{ width:"100%", height:"auto", display:"block" }}/>
    </div>
  );
}

// ── HERO + GALLERY ────────────────────────────────────────────────────────────
// Hero functions identically to the homepage Hero: a Shell-wrapped, 100svh-tall
// image with the header copy overlaid directly on it (gradient for legibility,
// text pinned to the bottom), sitting under the fixed/transparent Nav so it
// reads as full-bleed at the top of the page — same structure, same behavior.
// The Gallery below shares a separate, single continuous tile-pattern
// background (its own Shell) so there's no seam within the gallery itself.
function PortfolioHero() {
  return (
    <Shell>
      <section style={{ position:"relative", minHeight:"100svh", display:"flex", alignItems:"flex-end" }}>
        <img src={HERO_URL} alt="Jake & Farzana"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center center", display:"block" }}/>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}/>
        <div style={{ position:"relative", zIndex:2, width:"100%", padding:"0 1.5rem 3.5rem" }}>
          <FadeIn>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:BISQUE, opacity:0.72, marginBottom:"0.5rem",
              display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <Diamond color={FIREBRICK} size={7}/>Portfolio
            </p>
            <h1 style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(2.6rem, 11vw, 5rem)",
              fontWeight:400, color:BISQUE, lineHeight:1.08, marginBottom:"0.75rem" }}>
              The <em>work</em>
            </h1>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.95rem",
              color:BISQUE, opacity:0.85 }}>
              Every photo below was delivered to a real couple.
            </p>
          </FadeIn>
        </div>
      </section>
    </Shell>
  );
}

function PortfolioGallery() {
  const isDesktop = useIsDesktop();
  const left = PHOTOS.filter((_,i) => i % 2 === 0);
  const right = PHOTOS.filter((_,i) => i % 2 === 1);

  return (
    <Shell>
      <div style={{ padding:"2.5rem 1.5rem 3rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:isDesktop ? 16 : 10 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:isDesktop ? 16 : 10 }}>
            {left.map((src,i) => (
              <FadeIn key={src} delay={Math.min(i*0.05, 0.4)}>
                <GalleryFrame src={src}/>
              </FadeIn>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:isDesktop ? 16 : 10 }}>
            {right.map((src,i) => (
              <FadeIn key={src} delay={Math.min(i*0.05 + 0.05, 0.4)}>
                <GalleryFrame src={src}/>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ── PRICING CTA ───────────────────────────────────────────────────────────────
// Same section as the homepage, reused here per the mockup (page 1 of the
// portfolio PDF shows the identical "One day. One price." block at the
// bottom before the footer).
function PricingCTA() {
  const isDesktop = useIsDesktop();
  return (
    <Shell>
      <section style={{ position:"relative", overflow:"hidden", aspectRatio:"3/4" }}>
        <img src={PRICE_URL} alt=""
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center center", display:"block" }}/>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg, rgba(247,221,194,0.45) 0%, transparent 40%)",
          pointerEvents:"none" }}/>
        <div style={{ position:"relative", zIndex:1, padding:"2rem 1.5rem 0" }}>
          <FadeIn>
            <p style={{ fontFamily:"'Manrope', sans-serif",
              fontSize: isDesktop ? "0.85rem" : "0.62rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:FIREBRICK, opacity:0.9, marginBottom: isDesktop ? "0.5rem" : "0.25rem" }}>The Flat Rate</p>
            <h2 style={{ fontFamily:"'Libre Baskerville', serif",
              fontSize: isDesktop ? "clamp(2.8rem, 5vw, 4.2rem)" : "clamp(1.8rem, 8vw, 2.8rem)",
              fontWeight:400, color:FIREBRICK, lineHeight:1.08,
              marginBottom: isDesktop ? "0.6rem" : "0.35rem" }}>
              One day.<br/><em>One price.</em>
            </h2>
            <p style={{ fontFamily:"'Manrope', sans-serif",
              fontSize: isDesktop ? "1.05rem" : "0.78rem",
              color:FIREBRICK, opacity:0.8, marginBottom: isDesktop ? "1.8rem" : "1.2rem" }}>
              No surprises at the end of the night.
            </p>
            <Link to="/investment" style={{ display:"inline-block",
              background:FIREBRICK, color:BISQUE,
              padding: isDesktop ? "1.1rem 2.6rem" : "0.85rem 2rem",
              fontFamily:"'Manrope', sans-serif",
              fontSize: isDesktop ? "0.85rem" : "0.7rem", fontWeight:700,
              letterSpacing:"0.14em", textTransform:"uppercase",
              borderRadius:"999px", textDecoration:"none" }}>See What's Included</Link>
          </FadeIn>
        </div>
      </section>
    </Shell>
  );
}

export default function PortfolioPage({ onOpenQuestionnaire }) {
  return (
    <>
      <Nav onOpenQuestionnaire={onOpenQuestionnaire}/>
      <main>
        <PortfolioHero/>
        <PortfolioGallery/>
        <PricingCTA/>
      </main>
      <Footer onOpenQuestionnaire={onOpenQuestionnaire}/>
    </>
  );
}
