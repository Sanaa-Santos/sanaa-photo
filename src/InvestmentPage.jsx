import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BISQUE, FIREBRICK, SADDLE,
  Diamond, FadeIn, Shell, Nav, Footer, SEO,
} from "./Shared";

const HERO_URL = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781885239/iesha-steve-austin-engagement-investment-hero_m5hmm9.jpg";
const CATS_CREAM = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781811066/Cream-cats_nbnxvi.png";
const TESTIMONIAL_URL = "https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1782265187/corbin-zuleyma-austin-wedding-3_vjkaui.jpg";

const INCLUDED = [
  "Full-day coverage (no hour cap)",
  "Online gallery, high-res files, print rights",
  "Sneak peeks within the week",
  "Full edited gallery in 6 weeks max",
  "Complimentary engagement shoot",
  "Help with your photo timeline",
];

const FAQS = [
  { q: `What counts as "the whole day"?`,
    a: "Whatever your day is. Getting ready through the exit — you set the start and stop, and there's no hour cap in between." },
  { q: "Do you travel?",
    a: "Yes — Hill Country and beyond. Travel for weddings outside the Austin area is quoted based on distance." },
  { q: "We're awkward on camera. Help?",
    a: "That's most people. My background is in directing models, so easy, natural-looking posing is second nature — I'll guide you through it." },
  { q: "How many photos and how fast?",
    a: "You'll get a sneak peek within the week, and your full edited gallery in 6 weeks max." },
  { q: "How do we book?",
    a: `Tap "Tell Us About Your Day" below and send over your date and details — I'll follow up to lock things in.` },
];

// ── HERO ──────────────────────────────────────────────────────────────────────
// Same structure as the homepage/portfolio Hero: full-viewport-height image
// inside a Shell, text overlaid directly on the image with a gradient for
// legibility, pinned to the bottom — under the fixed/transparent Nav.
function InvestmentHero() {
  return (
    <Shell>
      <section style={{ position:"relative", minHeight:"100svh", display:"flex", alignItems:"flex-end", overflow:"hidden" }}>
        <img src={HERO_URL} alt="Iesha & Steve"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center center", display:"block",
            transform:"scale(1.15)" }}/>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}/>
        <div style={{ position:"relative", zIndex:2, width:"100%", padding:"0 1.5rem 3.5rem" }}>
          <FadeIn>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:BISQUE, opacity:0.72, marginBottom:"0.5rem",
              display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <Diamond color={FIREBRICK} size={7}/>Investment
            </p>
            <h1 style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(2.6rem, 11vw, 5rem)",
              fontWeight:400, color:BISQUE, lineHeight:1.08, marginBottom:"0.75rem" }}>
              Simple pricing.<br/>One flat rate.
            </h1>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.95rem",
              color:BISQUE, opacity:0.85 }}>
              One flat rate for the full day. You set the start and stop time, and the price stays the same.
            </p>
          </FadeIn>
        </div>
      </section>
    </Shell>
  );
}

// ── PRICING CARD + FAQ ────────────────────────────────────────────────────────
// These two sit back-to-back on the same BISQUE background, so they share
// ONE continuous tile-pattern layer (single element) rather than two
// independent Shells — otherwise each Shell restarts its own tile grid at
// its own top edge, which is what was causing the visible seam on desktop.

// All FAQ questions start collapsed; clicking the +/- toggles that question only.
function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom:"1px solid rgba(100,64,40,0.18)" }}>
      <button onClick={onToggle} style={{
        width:"100%", background:"none", border:"none", cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"1.25rem 0", textAlign:"left" }}>
        <span style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.95rem",
          fontWeight:600, color:FIREBRICK }}>{q}</span>
        <span style={{ fontFamily:"'Manrope', sans-serif", fontSize:"1.2rem",
          color:FIREBRICK, flexShrink:0, marginLeft:"1rem", width:18, textAlign:"center" }}>
          {isOpen ? "–" : "+"}
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? 400 : 0,
        overflow:"hidden",
        transition:"max-height 0.35s ease",
      }}>
        <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.88rem",
          color:SADDLE, opacity:0.85, lineHeight:1.7, padding:"0 0 1.25rem" }}>
          {a}
        </p>
      </div>
    </div>
  );
}

function PricingAndFaq({ onOpenQuestionnaire }) {
  // null = all FAQ answers collapsed by default (per Kas: no answer shown until clicked)
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Shell>
      <div style={{ padding:"2.5rem 1.5rem 3rem" }}>
        <FadeIn>
          <div style={{ border:`1.5px solid ${FIREBRICK}`, borderRadius:8,
            overflow:"hidden" }}>

            {/* Top — solid firebrick, khaki/bisque text */}
            <div style={{ background:FIREBRICK, padding:"2rem 1.5rem", textAlign:"center" }}>
              <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
                letterSpacing:"0.22em", textTransform:"uppercase",
                color:BISQUE, opacity:0.85, marginBottom:"0.75rem" }}>
                Full Wedding Day
              </p>
              <p style={{ fontFamily:"'Libre Baskerville', serif",
                fontSize:"clamp(2.6rem, 11vw, 3.6rem)",
                fontWeight:400, color:BISQUE, lineHeight:1, margin:0 }}>
                $3,300
              </p>
            </div>

            {/* Bottom — bisque, with the cat pattern masked in firebrick at 12% opacity */}
            <div style={{ position:"relative", background:BISQUE, padding:"2rem 1.5rem" }}>
              <div style={{ position:"absolute", inset:0, zIndex:0,
                backgroundColor:FIREBRICK,
                WebkitMaskImage:`url(${CATS_CREAM})`, maskImage:`url(${CATS_CREAM})`,
                WebkitMaskRepeat:"repeat", maskRepeat:"repeat",
                WebkitMaskSize:"clamp(180px,24vw,320px)", maskSize:"clamp(180px,24vw,320px)",
                opacity:0.12, pointerEvents:"none" }}/>

              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem",
                  marginBottom:"2rem" }}>
                  {INCLUDED.map(item => (
                    <div key={item} style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
                      <Diamond color={FIREBRICK} size={7}/>
                      <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.85rem",
                        color:SADDLE, margin:0, lineHeight:1.3 }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <button onClick={onOpenQuestionnaire} style={{
                  background:FIREBRICK, border:"none", color:BISQUE,
                  padding:"1rem 2rem", width:"100%",
                  fontFamily:"'Manrope', sans-serif", fontSize:"0.72rem", fontWeight:700,
                  letterSpacing:"0.16em", textTransform:"uppercase",
                  borderRadius:"999px", cursor:"pointer" }}>Tell Us About Your Day</button>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ marginTop:"2.5rem" }}>
            <div style={{ overflow:"hidden", aspectRatio:"4/3", marginBottom:"2rem" }}>
              <img src={TESTIMONIAL_URL} alt="Corbin & Zuleyma"
                style={{ width:"100%", height:"100%", objectFit:"cover",
                  objectPosition:"center center", display:"block" }}/>
            </div>
            <blockquote style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(1.15rem, 5vw, 1.6rem)",
              fontWeight:400, color:FIREBRICK, lineHeight:1.5, marginBottom:"1rem" }}>
              "We enjoyed our experience working with Sanaa! She was always on top of check-ins and updates. Given some of our more unusual requests and wedding scheduling she found great images of not just us but displaying us & everyone else within the context of the entire day. We consistently receive compliments on our photos."
            </blockquote>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
              letterSpacing:"0.18em", textTransform:"uppercase",
              color:SADDLE, opacity:0.55, display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <Diamond color={SADDLE} size={6}/>Corbin & Zuleyma
            </p>
          </div>
        </FadeIn>

        <div style={{ marginTop:"3rem" }}>
          <FadeIn>
            <h2 style={{ fontFamily:"'Libre Baskerville', serif",
              fontSize:"clamp(1.9rem, 8vw, 2.6rem)",
              fontWeight:400, color:FIREBRICK, lineHeight:1.12, marginBottom:"0.5rem" }}>
              Fair <em>questions</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div style={{ marginTop:"1rem" }}>
              {FAQS.map((faq, i) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}/>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </Shell>
  );
}

export default function InvestmentPage({ onOpenQuestionnaire }) {
  return (
    <>
      <SEO
        title="Wedding Photography Pricing | Sansan Stills Austin"
        description="One flat rate for full-day Austin, TX wedding photography — no hour cap, no overtime charges. See what's included and get answers to common questions."
        path="/investment"
        image="https://res.cloudinary.com/drqtl7xy8/image/upload/f_auto,q_auto/v1781885239/iesha-steve-austin-engagement-investment-hero_m5hmm9.jpg"
      />
      <Nav onOpenQuestionnaire={onOpenQuestionnaire}/>
      <main>
        <InvestmentHero/>
        <PricingAndFaq onOpenQuestionnaire={onOpenQuestionnaire}/>
      </main>
      <Footer onOpenQuestionnaire={onOpenQuestionnaire}/>
    </>
  );
}
