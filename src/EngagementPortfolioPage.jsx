import { Link } from "react-router-dom";
import {
  BISQUE, FIREBRICK, MAX_W, DESKTOP_BREAKPOINT,
  useIsDesktop, Diamond, FadeIn, Shell, Nav, Footer, SEO,
} from "./Shared";

// TODO: swap in a real engagement-session hero image once one is chosen.
// Reusing the wedding portfolio hero/pricing images as placeholders for now.
const HERO_URL  = "https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575803/livra-austin-tx-engagement-shoot-6_13_kgshuw.jpg";
const PRICE_URL = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781882012/jake-farzana-austin-wedding-portfolio-flat-rate_vpyisz.jpg";

// Engagement portfolio gallery. Populate this with the Cloudinary (or other)
// image URLs for engagement sessions — same shape as WeddingPortfolioPage's
// PHOTOS array. Each <img> renders at its natural aspect ratio (no fixed
// ratio/crop), so the masonry effect comes from the photos themselves: a
// two-column grid where each column flows independently.
const PHOTOS = [
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575801/livra-austin-tx-engagement-shoot-1_ml2d3u.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575801/livra-austin-tx-engagement-shoot-3_moiedj.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575801/livra-austin-tx-engagement-shoot-2_ed4ufs.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575801/livra-austin-tx-engagement-shoot-4_usefp4.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575801/livra-austin-tx-engagement-shoot-6_1_nwkgvu.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575802/livra-austin-tx-engagement-shoot-5_qq0e8i.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575802/livra-austin-tx-engagement-shoot-6_3_btrojh.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575802/livra-austin-tx-engagement-shoot-6_2_ygwnuo.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575802/livra-austin-tx-engagement-shoot-6_6_shdz37.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575802/livra-austin-tx-engagement-shoot-6_5_dotytb.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575803/livra-austin-tx-engagement-shoot-6_11_rpxbic.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575803/livra-austin-tx-engagement-shoot-6_12_d9hafv.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575803/livra-austin-tx-engagement-shoot-6_14_fcxzyz.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575803/livra-austin-tx-engagement-shoot-6_16_sam81f.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575803/livra-austin-tx-engagement-shoot-6_15_rc6nff.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575805/mcnay-museum-san-antonio-tx-engagement-shoot_8_lbiwcf.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575804/mcnay-museum-san-antonio-tx-engagement-shoot_5_z61t0u.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575804/mcnay-museum-san-antonio-tx-engagement-shoot_1_uszdnh.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790576236/SANR1894_1_g0hlqd.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575804/mcnay-museum-san-antonio-tx-engagement-shoot_6_upir0g.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575804/mcnay-museum-san-antonio-tx-engagement-shoot_2_shfs50.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575803/livra-austin-tx-engagement-shoot-6_9_qx24re.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575803/livra-austin-tx-engagement-shoot-6_10_xex7ro.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575804/mcnay-museum-san-antonio-tx-engagement-shoot_3_mz9uqf.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575804/mcnay-museum-san-antonio-tx-engagement-shoot_4_z0nkao.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575804/mcnay-museum-san-antonio-tx-engagement-shoot_7_ywpiyl.jpg",
"https://res.cloudinary.com/drqtl7xy8/image/upload/v1790575805/mcnay-museum-san-antonio-tx-engagement-shoot_9_uw3cyh.jpg"
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
// Same structure as the wedding portfolio's hero/gallery: a Shell-wrapped,
// 100svh-tall image with header copy overlaid directly on it, sitting under
// the fixed/transparent Nav so it reads as full-bleed at the top of the page.
function EngagementPortfolioHero() {
  return (
    <Shell>
      <section style={{ position:"relative", minHeight:"100svh", display:"flex", alignItems:"flex-end" }}>
        <img src={HERO_URL} alt=""
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
              <Diamond color={FIREBRICK} size={7}/>Engagement Portfolio
            </p>
            <h1 style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(2.6rem, 11vw, 5rem)",
              fontWeight:400, color:BISQUE, lineHeight:1.08, marginBottom:"0.75rem" }}>
              The <em>lead-up</em>
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

function EngagementPortfolioGallery() {
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
// Same section as the wedding portfolio page, reused here for consistency.
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

export default function EngagementPortfolioPage({ onOpenQuestionnaire }) {
  return (
    <>
      <SEO
        title="Engagement Photo Portfolio | Sansan Stills Austin"
        description="Real Austin and Texas Hill Country engagement sessions, shot candid and documentary-style. Browse galleries delivered to real couples by Sansan Stills."
        path="/engagement-portfolio"
        image="https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1788841024/jasonsangelportfoliobannernew_sfk0ps.jpg"
      />
      <Nav onOpenQuestionnaire={onOpenQuestionnaire}/>
      <main>
        <EngagementPortfolioHero/>
        <EngagementPortfolioGallery/>
        <PricingCTA/>
      </main>
      <Footer onOpenQuestionnaire={onOpenQuestionnaire}/>
    </>
  );
}
