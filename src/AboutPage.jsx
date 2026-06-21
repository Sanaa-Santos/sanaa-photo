import {
  BISQUE, FIREBRICK, SADDLE,
  Diamond, FadeIn, Shell, Nav, Footer,
} from "./Shared";

const HERO_URL     = "https://res.cloudinary.com/drqtl7xy8/image/upload/v1782018773/sanaa-santos-sansan-stills-austin-wedding-photographer-about-hero_j286mj.jpg";
const POLAROID_URL = "https://res.cloudinary.com/drqtl7xy8/image/upload/v1782018772/sanaa-santos-sansan-stills-austin-wedding-photographer-about-polaroid_jlnjxz.png";
const CTA_URL      = "https://res.cloudinary.com/drqtl7xy8/image/upload/v1782018772/sanaa-santos-sansan-stills-austin-wedding-photographer-about-ready_upq1j8.jpg";

const BIO_PARAGRAPHS = [
  "I picked up a camera thinking it'd be a hobby, and it became my life. A lover of beauty, fashion, and storytelling. I started in fashion photography, where I learned how to see people — how each person is different and deserves their own light.",
  "I moved to Austin, TX from Orlando, FL five years ago and was instantly inspired by this city. By how the community shows up for small businesses, how there's real love here. That's when I realized I wanted to tell stories with my camera. I wanted to give people space to be expressive and celebrate love. That's when I became a wedding photographer.",
];

const FACTS = [
  { label: "Based in Austin", body: "My dream weddings are in the Hill Country." },
  { label: "Six years in", body: "Shooting weddings since 2020. Fashion shoots before that." },
  { label: "Fuji shooter", body: "Switched from Canon because it fits how we see and we love the colors." },
  { label: "Local first", body: "We support Austin makers every chance we get." },
];

// ── HERO ──────────────────────────────────────────────────────────────────────
// Same structure as the other heroes: full-viewport image inside a Shell,
// text overlaid on the image with a gradient for legibility, pinned to the
// bottom under the fixed/transparent Nav.
function AboutHero() {
  return (
    <Shell>
      <section style={{ position:"relative", minHeight:"100svh", display:"flex", alignItems:"flex-end", overflow:"hidden" }}>
        <img src={HERO_URL} alt="Sanaa Santos"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center top", display:"block",
            transform:"scale(1.15)" }}/>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}/>
        <div style={{ position:"relative", zIndex:2, width:"100%", padding:"0 1.5rem 3.5rem" }}>
          <FadeIn>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:BISQUE, opacity:0.72, marginBottom:"0.5rem",
              display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <Diamond color={FIREBRICK} size={7}/>About
            </p>
            <h1 style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(2.6rem, 11vw, 5rem)",
              fontWeight:400, color:BISQUE, lineHeight:1.08 }}>
              Hi, I'm Sanaa.
            </h1>
          </FadeIn>
        </div>
      </section>
    </Shell>
  );
}

// ── BIO + POLAROIDS + QUOTE + FACTS ──────────────────────────────────────────
// All on the same BISQUE background, so they share one Shell/pattern layer
// rather than separate instances (avoids the tile seam).
function BioAndFacts() {
  return (
    <Shell>
      <div style={{ padding:"3rem 1.5rem 3.5rem" }}>
        <FadeIn>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            {BIO_PARAGRAPHS.map((p, i) => (
              <p key={i} style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.92rem",
                color:SADDLE, opacity:0.88, lineHeight:1.78 }}>
                {p}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ margin:"2.75rem 0 2.5rem", display:"flex", justifyContent:"center" }}>
            <img src={POLAROID_URL} alt="Sanaa — fashion shoots and Austin, before weddings"
              style={{ width:"100%", maxWidth:420, height:"auto", display:"block" }}/>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <blockquote style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
            fontSize:"1.2rem", color:FIREBRICK, lineHeight:1.55, marginBottom:"2.75rem" }}>
            My first job was photographing models. Weddings turned out to be where that training matters most.
          </blockquote>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.7rem" }}>
          {FACTS.map((fact, i) => (
            <FadeIn key={fact.label} delay={i * 0.06}>
              <div style={{ border:`1.5px solid ${FIREBRICK}`, borderRadius:8,
                padding:"1.1rem 1rem", height:"100%", boxSizing:"border-box" }}>
                <p style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
                  fontSize:"1.02rem", fontWeight:400, color:FIREBRICK,
                  lineHeight:1.25, marginBottom:"0.5rem" }}>
                  {fact.label}
                </p>
                <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.78rem",
                  color:SADDLE, opacity:0.85, lineHeight:1.5 }}>
                  {fact.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Shell>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
// Image background with text overlaid directly on it, same family as the
// Experience/Home CTA sections.
function ReadyCTA({ onOpenQuestionnaire }) {
  return (
    <Shell>
      <section style={{ position:"relative", overflow:"hidden", aspectRatio:"3/4" }}>
        <img src={CTA_URL} alt=""
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center center", display:"block" }}/>
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }}/>
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
          justifyContent:"flex-end", padding:"0 1.5rem 3rem" }}>
          <FadeIn>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:BISQUE, opacity:0.8, marginBottom:"0.5rem",
              display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <Diamond color={FIREBRICK} size={7}/>Ready When You Are
            </p>
            <h2 style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(2rem, 8.5vw, 3rem)",
              fontWeight:400, color:BISQUE, lineHeight:1.12, marginBottom:"1.5rem" }}>
              Think we'd be a good fit?
            </h2>
            <button onClick={onOpenQuestionnaire} style={{
              background:FIREBRICK, border:"none", color:BISQUE,
              padding:"1rem 2rem", width:"100%",
              fontFamily:"'Manrope', sans-serif", fontSize:"0.72rem", fontWeight:700,
              letterSpacing:"0.16em", textTransform:"uppercase",
              borderRadius:"999px", cursor:"pointer" }}>Tell Us About Your Day</button>
          </FadeIn>
        </div>
      </section>
    </Shell>
  );
}

export default function AboutPage({ onOpenQuestionnaire }) {
  return (
    <>
      <Nav onOpenQuestionnaire={onOpenQuestionnaire}/>
      <main>
        <AboutHero/>
        <BioAndFacts/>
        <ReadyCTA onOpenQuestionnaire={onOpenQuestionnaire}/>
      </main>
      <Footer onOpenQuestionnaire={onOpenQuestionnaire}/>
    </>
  );
}
