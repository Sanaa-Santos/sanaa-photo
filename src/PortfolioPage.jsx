import {
  BISQUE, FIREBRICK, SADDLE, MAX_W, DESKTOP_BREAKPOINT,
  useIsDesktop, Diamond, FadeIn, Shell, Nav, Footer,
} from "./Shared";

const PRICE_URL = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781810036/courtney-megan-austin-wedding-flat-rate-section_gjawmj.jpg";

// Placeholder photo set — Kas hasn't picked final portfolio images yet.
// Each entry just needs a distinct aspect ratio so the masonry effect
// (matching mathilde-rietsch.com/portfolio/mariage) is visible even with
// placeholders: a two-column grid where each column flows independently,
// rather than a single row-locked grid.
const PLACEHOLDER_PHOTOS = [
  { id:"SANR1183", ratio:"3/4" },
  { id:"SANR1337", ratio:"4/3" },
  { id:"SANR1590", ratio:"1/1" },
  { id:"JF-COVER", ratio:"4/5" },
  { id:"JAKE-FARZANA-513", ratio:"3/4" },
  { id:"DSCF0006", ratio:"4/3" },
  { id:"DSCF9180", ratio:"3/4" },
  { id:"SANR2041", ratio:"1/1" },
  { id:"SANR2208", ratio:"4/5" },
  { id:"SANR2390", ratio:"3/4" },
];

function PlaceholderFrame({ ratio, id }) {
  return (
    <div style={{ aspectRatio:ratio,
      background:"rgba(247,221,194,0.55)",
      border:"1px dashed rgba(100,64,40,0.22)",
      borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center",
      overflow:"hidden" }}>
      <span style={{ fontFamily:"'Manrope', sans-serif",
        fontSize:"0.6rem", letterSpacing:"0.15em",
        textTransform:"uppercase", color:SADDLE, opacity:0.4 }}>Photo — {id}</span>
    </div>
  );
}

// ── HEADER ────────────────────────────────────────────────────────────────────
// Functions like the homepage Hero: sits at the very top of the page, under
// the fixed/transparent Nav (so it bleeds to the top edge on the live site,
// matching the homepage — the mockup's extra top padding was just an artifact
// of the static Canva mockup, not the intended live behavior).
function PortfolioHeader() {
  return (
    <Shell>
      <div style={{ position:"relative", paddingTop:"7rem" }}>
        <div style={{ padding:"0 1.5rem 2.5rem" }}>
          <FadeIn>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:FIREBRICK, opacity:0.72, marginBottom:"0.5rem",
              display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <Diamond color={FIREBRICK} size={7}/>Portfolio
            </p>
            <h1 style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(2.4rem, 10vw, 4.2rem)",
              fontWeight:400, color:FIREBRICK, lineHeight:1.08, marginBottom:"0.75rem" }}>
              The <em>work</em>
            </h1>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.95rem",
              color:SADDLE, opacity:0.75 }}>
              Every photo below was delivered to a real couple.
            </p>
          </FadeIn>
        </div>
      </div>
    </Shell>
  );
}

// ── GALLERY ───────────────────────────────────────────────────────────────────
// Two independent columns (masonry), matching mathilde-rietsch.com/portfolio/mariage:
// photos are distributed alternately into two columns so each column's height
// flows independently — taller/shorter photos don't force row-locked gaps like
// a strict CSS grid would. On desktop this sits in the same MAX_W-equivalent
// column treatment as the rest of the site; the two photo columns themselves
// get a bit more breathing room on wider screens.
function Gallery() {
  const isDesktop = useIsDesktop();
  const left = PLACEHOLDER_PHOTOS.filter((_,i) => i % 2 === 0);
  const right = PLACEHOLDER_PHOTOS.filter((_,i) => i % 2 === 1);

  return (
    <Shell innerStyle={isDesktop ? { maxWidth: MAX_W * 1.4 } : {}}>
      <div style={{ padding:"0 1.5rem 3rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:isDesktop ? 16 : 10 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:isDesktop ? 16 : 10 }}>
            {left.map((photo,i) => (
              <FadeIn key={photo.id} delay={i*0.05}>
                <PlaceholderFrame ratio={photo.ratio} id={photo.id}/>
              </FadeIn>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:isDesktop ? 16 : 10 }}>
            {right.map((photo,i) => (
              <FadeIn key={photo.id} delay={i*0.05 + 0.05}>
                <PlaceholderFrame ratio={photo.ratio} id={photo.id}/>
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
            <a href="#" style={{ display:"inline-block",
              background:FIREBRICK, color:BISQUE,
              padding: isDesktop ? "1.1rem 2.6rem" : "0.85rem 2rem",
              fontFamily:"'Manrope', sans-serif",
              fontSize: isDesktop ? "0.85rem" : "0.7rem", fontWeight:700,
              letterSpacing:"0.14em", textTransform:"uppercase",
              borderRadius:"999px", textDecoration:"none" }}>See What's Included</a>
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
        <PortfolioHeader/>
        <Gallery/>
        <PricingCTA/>
      </main>
      <Footer onOpenQuestionnaire={onOpenQuestionnaire}/>
    </>
  );
}
