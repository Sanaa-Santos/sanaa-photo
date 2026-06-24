import {
  BISQUE, FIREBRICK, SADDLE,
  Diamond, FadeIn, Shell, Nav, Footer,
} from "./Shared";

const HERO_URL  = "https://res.cloudinary.com/drqtl7xy8/image/upload/v1782005550/nicole-jonathan-austin-engagement_asqpgj.jpg";
const CTA_URL   = "https://res.cloudinary.com/drqtl7xy8/image/upload/v1782013854/diana-ahmed-san-antonio-engagement-photography_nngyem.jpg";
const TESTIMONIAL_URL = "https://res.cloudinary.com/drqtl7xy8/image/upload/v1782265970/nicole-jonathan-austin-6th-street-shoot-2_zieyre.jpg";

const STEPS = [
  { n: "1", title: "Fill out the questionnaire",
    body: "It's quick, fun, and it tells us who you two are — not just your date and venue." },
  { n: "2", title: "We hop on a call",
    body: "Fifteen-twenty minutes. We make sure we click, you ask us anything. No pitch, no pressure." },
  { n: "3", title: "You book, you relax",
    body: "Signed agreement and retainer locks your date. Scratch photography off your list." },
  { n: "4", title: "The wedding day",
    body: "We shoot the day as it happens and stay until you tell us to stop. We'll party as long as you do." },
  { n: "5", title: "Sneak peeks within the week",
    body: "A first set of edited favorites while the day is still fresh — something to post and relive." },
  { n: "6", title: "The full gallery",
    body: "Every photo edited and flattering, high-res, with print rights. Done in 6 weeks, max." },
];

// ── HERO ──────────────────────────────────────────────────────────────────────
// Same structure as the Investment/Home hero: full-viewport image inside a
// Shell, text overlaid on the image with a gradient for legibility, pinned
// to the bottom under the fixed/transparent Nav.
function ExperienceHero() {
  return (
    <Shell>
      <section style={{ position:"relative", minHeight:"100svh", display:"flex", alignItems:"flex-end", overflow:"hidden" }}>
        <img src={HERO_URL} alt="Nicole & Jonathan"
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
              <Diamond color={FIREBRICK} size={7}/>The Experience
            </p>
            <h1 style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(2.6rem, 11vw, 5rem)",
              fontWeight:400, color:BISQUE, lineHeight:1.08, marginBottom:"0.75rem" }}>
              Laid back is<br/>the plan.
            </h1>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.95rem",
              color:BISQUE, opacity:0.85 }}>
              You shouldn't have to manage your photographer. Here's exactly how it goes, from first message to final gallery — no surprises anywhere.
            </p>
          </FadeIn>
        </div>
      </section>
    </Shell>
  );
}

// ── STEPS ─────────────────────────────────────────────────────────────────────
function StepRow({ step, delay }) {
  return (
    <FadeIn delay={delay}>
      <div style={{ display:"flex", gap:"1.25rem", alignItems:"flex-start" }}>
        <span style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
          fontSize:"clamp(2.4rem, 9vw, 3.2rem)", fontWeight:400,
          color:FIREBRICK, opacity:0.32, lineHeight:1, flexShrink:0,
          width:"2ch", textAlign:"center" }}>
          {step.n}
        </span>
        <div style={{ paddingTop:"0.4rem" }}>
          <h3 style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
            fontSize:"1.25rem", fontWeight:400, color:FIREBRICK,
            lineHeight:1.3, marginBottom:"0.4rem" }}>
            {step.title}
          </h3>
          <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.88rem",
            color:SADDLE, opacity:0.85, lineHeight:1.7 }}>
            {step.body}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

// ── STEPS + TESTIMONIAL ───────────────────────────────────────────────────────
// Both sit on the same BISQUE background, so they share one Shell/pattern
// layer rather than two separate instances (avoids the tile seam).
function StepsAndTestimonial() {
  return (
    <Shell>
      <div style={{ padding:"3rem 1.5rem 3.5rem" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"2.4rem" }}>
          {STEPS.map((step, i) => (
            <StepRow key={step.n} step={step} delay={i * 0.06}/>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <div style={{ marginTop:"3rem" }}>
            <div style={{ overflow:"hidden", aspectRatio:"4/3", marginBottom:"2rem" }}>
              <img src={TESTIMONIAL_URL} alt="Nicole & Jonathan"
                style={{ width:"100%", height:"100%", objectFit:"cover",
                  objectPosition:"center 85%", display:"block" }}/>
            </div>
            <blockquote style={{ fontFamily:"'Libre Baskerville', serif", fontStyle:"italic",
              fontSize:"clamp(1.15rem, 5vw, 1.6rem)",
              fontWeight:400, color:FIREBRICK, lineHeight:1.5, marginBottom:"1rem" }}>
              "From the start, this wife-and-husband photography team made us feel comfortable and understood. They didn't just take photos, they told our love story. The way they worked together was seamless and intuitive, capturing multiple angles and emotions we didn't even realize were happening in real time. Every glance, every laugh, every quiet, in-between moment was documented with so much care and artistry. Their talent, professionalism, and heart are unmatched. If you're looking for photographers in the Austin metro area who go beyond posed shots and capture the true essence of your relationship, this is the team. We are beyond grateful and will treasure these photos forever. I will be coming back for more shoots!"
            </blockquote>
            <p style={{ fontFamily:"'Manrope', sans-serif", fontSize:"0.62rem",
              letterSpacing:"0.18em", textTransform:"uppercase",
              color:SADDLE, opacity:0.55, display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <Diamond color={SADDLE} size={6}/>Nicole & Jonathan
            </p>
          </div>
        </FadeIn>
      </div>
    </Shell>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
// Image background with text overlaid directly on it, same family as the
// homepage PricingCTA section.
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
              Sound like your kind of day?
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

export default function ExperiencePage({ onOpenQuestionnaire }) {
  return (
    <>
      <Nav onOpenQuestionnaire={onOpenQuestionnaire}/>
      <main>
        <ExperienceHero/>
        <StepsAndTestimonial/>
        <ReadyCTA onOpenQuestionnaire={onOpenQuestionnaire}/>
      </main>
      <Footer onOpenQuestionnaire={onOpenQuestionnaire}/>
    </>
  );
}
